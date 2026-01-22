'use client';

import { useEffect, useMemo, useState } from 'react';

type SequenceItem = string | number;

type TypeAnimationProps = {
  sequence: SequenceItem[];
  speed?: number;
  repeat?: number;
  wrapper?: keyof JSX.IntrinsicElements;
  className?: string;
};

type Step = {
  text: string;
  pauseMs: number;
};

const DEFAULT_PAUSE = 2000;

export const TypeAnimation = ({
  sequence,
  speed = 50,
  repeat = Infinity,
  wrapper = 'span',
  className,
}: TypeAnimationProps) => {
  const steps = useMemo<Step[]>(() => {
    const parsed: Step[] = [];
    for (let i = 0; i < sequence.length; i += 1) {
      const item = sequence[i];
      if (typeof item === 'string') {
        const pause =
          typeof sequence[i + 1] === 'number'
            ? (sequence[i + 1] as number)
            : DEFAULT_PAUSE;
        parsed.push({ text: item, pauseMs: pause });
      }
    }
    return parsed.length ? parsed : [{ text: '', pauseMs: DEFAULT_PAUSE }];
  }, [sequence]);

  const [stepIndex, setStepIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loops, setLoops] = useState(0);

  useEffect(() => {
    if (repeat !== Infinity && loops >= repeat) return;

    const current = steps[stepIndex];
    if (!current) return;

    let timeoutId: number | undefined;

    if (!isDeleting) {
      if (visibleCount < current.text.length) {
        timeoutId = window.setTimeout(
          () => setVisibleCount((count) => count + 1),
          Math.max(16, speed)
        );
      } else {
        timeoutId = window.setTimeout(() => {
          setIsDeleting(true);
        }, current.pauseMs);
      }
    } else {
      if (visibleCount > 0) {
        timeoutId = window.setTimeout(
          () => setVisibleCount((count) => count - 1),
          Math.max(16, speed / 1.5)
        );
      } else {
        setIsDeleting(false);
        const nextIndex = (stepIndex + 1) % steps.length;
        setStepIndex(nextIndex);
        if (nextIndex === 0) {
          setLoops((count) => count + 1);
        }
      }
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [steps, stepIndex, visibleCount, isDeleting, speed, repeat, loops]);

  const WrapperTag = wrapper;
  const currentText = steps[stepIndex]?.text.slice(0, visibleCount) ?? '';

  return <WrapperTag className={className}>{currentText}</WrapperTag>;
};

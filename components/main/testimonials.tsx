'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoStarSharp } from 'react-icons/io5';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechVentures Inc',
    content:
      'Exceptional developer with deep expertise in full-stack development. Delivered our e-commerce platform ahead of schedule with outstanding quality.',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'CloudScale Solutions',
    content:
      'Brilliant problem solver who transformed our infrastructure. His cloud architecture expertise saved us 40% in operational costs.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Lead Designer',
    company: 'Creative Studios',
    content:
      'A rare combination of technical prowess and design sensibility. Our Shopify store conversion rates increased by 65%.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Founder',
    company: 'StartupHub',
    content:
      'Built our MVP in record time. His AI/ML integration expertise helped us secure Series A funding. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'VP of Engineering',
    company: 'DataFlow Systems',
    content:
      'Outstanding work on our data pipeline architecture. The TypeScript implementation was flawless and the performance improvements exceeded all expectations.',
    rating: 5,
  },
  {
    name: 'James Anderson',
    role: 'CEO',
    company: 'E-commerce Plus',
    content:
      'Transformed our Shopify Plus store with custom app development. Sales increased by 85% in the first quarter. Absolute professional!',
    rating: 5,
  },
  {
    name: 'Maria Garcia',
    role: 'Head of Product',
    company: 'Innovate Labs',
    content:
      'Incredible expertise in Next.js and React. Built our entire SaaS platform from scratch with clean, maintainable code. A true full-stack expert.',
    rating: 5,
  },
  {
    name: 'Robert Kim',
    role: 'CTO',
    company: 'FinTech Solutions',
    content:
      'His Node.js and AWS skills are top-notch. Migrated our entire infrastructure to cloud with zero downtime. Exceptional communication throughout.',
    rating: 5,
  },
  {
    name: 'Jennifer Lee',
    role: 'Director',
    company: 'MediaTech Group',
    content:
      'Delivered a complex WordPress headless CMS solution that exceeded requirements. The API integration was seamless and well-documented.',
    rating: 5,
  },
  {
    name: 'Alex Martinez',
    role: 'Founder',
    company: 'AI Innovations',
    content:
      'Expert in OpenAI integration and ML pipelines. Built our chatbot system with Python and FastAPI. Performance and reliability have been outstanding.',
    rating: 5,
  },
  {
    name: 'Sophia Williams',
    role: 'COO',
    company: 'Global Retail',
    content:
      'Exceptional work on our multi-tenant SaaS platform. His Vue.js and PostgreSQL expertise helped us scale to 10,000+ users effortlessly.',
    rating: 5,
  },
  {
    name: 'Daniel Brown',
    role: 'Tech Lead',
    company: 'CloudFirst Inc',
    content:
      'Masterful implementation of Docker and Kubernetes. Our DevOps pipeline is now robust, automated, and incredibly efficient. Highly skilled professional.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const rowRefs = useRef<HTMLDivElement[]>([]);

  const rows = useMemo(() => {
    const perRow = Math.ceil(testimonials.length / 2);
    return [testimonials.slice(0, perRow), testimonials.slice(perRow)];
  }, []);

  // Robust horizontalLoop helper (adapted from a GSAP community helper)
  // Supports responsive widths, seamless looping, speed, paddingRight and reversed rows.
  function horizontalLoop(items: any, config?: any) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat ?? -1,
        paused: config.paused ?? false,
        defaults: { ease: 'none' },
        onReverseComplete: () => {
          tl.totalTime(tl.rawTime() + tl.duration() * 100);
        },
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: any[] = [],
      widths: number[] = [],
      xPercents: number[] = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: any) => v
          : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;

    gsap.set(items, {
      xPercent: (i: number, el: HTMLElement) => {
        let w = (widths[i] = parseFloat(
          String(gsap.getProperty(el, 'width', 'px'))
        ));
        xPercents[i] = snap(
          (parseFloat(String(gsap.getProperty(el, 'x', 'px'))) / w) * 100 +
            Number(gsap.getProperty(el, 'xPercent'))
        );
        return xPercents[i];
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        Number(gsap.getProperty(items[length - 1], 'scaleX')) +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = item.offsetLeft + curX - startX;
      distanceToLoop =
        distanceToStart + widths[i] * Number(gsap.getProperty(item, 'scaleX'));
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add('label' + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index: number, vars?: any) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars?: any) => toIndex(curIndex + 1, vars);
    tl.previous = (vars?: any) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars?: any) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      if (tl.vars && typeof tl.vars.onReverseComplete === 'function') {
        (tl.vars.onReverseComplete as () => void)();
      }
      tl.reverse();
    }
    return tl;
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const listeners: Array<() => void> = [];
    const tweens = rowRefs.current.map((row, index) => {
      if (!row) return null;
      const items = Array.from(
        row.querySelectorAll<HTMLElement>('[data-testimonial-card]')
      );
      if (!items.length) return null;
      const tween = horizontalLoop(items, {
        speed: 0.55,
        reversed: index % 2 === 1,
      });

      ScrollTrigger.create({
        trigger: row,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 1000);
          const scale = Math.max(0.6, Math.min(1.4, 1 + velocity * 0.6));
          tween.timeScale(scale);
        },
      });

      // Pause on pointer enter / resume on leave for better UX
      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();
      row.addEventListener('pointerenter', onEnter);
      row.addEventListener('pointerleave', onLeave);
      row.addEventListener('focusin', onEnter);
      row.addEventListener('focusout', onLeave);
      listeners.push(() => {
        row.removeEventListener('pointerenter', onEnter);
        row.removeEventListener('pointerleave', onLeave);
        row.removeEventListener('focusin', onEnter);
        row.removeEventListener('focusout', onLeave);
      });

      return tween;
    });

    return () => {
      tweens.forEach((tween) => tween?.kill());
      listeners.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full overflow-hidden py-12 md:py-20">
      <div className="w-full px-4 md:px-0">
        <div className="mb-8 text-start md:mb-16 md:text-center">
          <h2 className="section-title mb-3 md:mb-4 md:text-center">
            <span className="section-title-gradient">Client Testimonials</span>
          </h2>
          <p className="section-lead md:text-center">
            Multi-directional stories from leaders who scaled with me
          </p>
        </div>

        <div className="testimonial-mask relative space-y-8">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-linear-to-r from-black via-black/70 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-linear-to-l from-black via-black/70 to-transparent" />
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="testimonial-row relative"
              tabIndex={0}
              role="region"
              aria-label={`Testimonials row ${rowIndex + 1}`}
            >
              <div
                ref={(el) => {
                  if (!el) return;
                  rowRefs.current[rowIndex] = el;
                }}
                className="flex w-max gap-6"
              >
                {[...row, ...row, ...row].map((testimonial, index) => (
                  <GlowingEffect
                    key={`${testimonial.name}-${index}`}
                    spread={25}
                    glow={true}
                    proximity={100}
                    className="w-80 shrink-0"
                  >
                    <div
                      data-testimonial-card
                      className="testimonial-card rounded-2xl bg-linear-to-br from-purple-500/10 to-cyan-500/10 p-6 backdrop-blur-md"
                    >
                      <div className="mb-4 flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <IoStarSharp
                            key={`${testimonial.name}-star-${i}`}
                            className="h-5 w-5 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="mb-6 text-base leading-relaxed text-white">
                        &ldquo;{testimonial.content}&rdquo;
                      </p>
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-muted text-sm">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </GlowingEffect>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

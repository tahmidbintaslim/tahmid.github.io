'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  IoBugOutline,
  IoChatboxOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircle,
  IoFlashOutline,
  IoHelpCircleOutline,
  IoSend,
  IoClose,
} from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';

interface FeedbackWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type FeedbackType = 'feedback' | 'bug' | 'feature' | 'other';

const feedbackTypes: {
  value: FeedbackType;
  label: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    value: 'feedback',
    label: 'General Feedback',
    icon: <IoChatboxOutline className="h-4 w-4" />,
    color: 'purple',
  },
  {
    value: 'bug',
    label: 'Report Bug',
    icon: <IoBugOutline className="h-4 w-4" />,
    color: 'red',
  },
  {
    value: 'feature',
    label: 'Feature Request',
    icon: <IoFlashOutline className="h-4 w-4" />,
    color: 'cyan',
  },
  {
    value: 'other',
    label: 'Other',
    icon: <IoHelpCircleOutline className="h-4 w-4" />,
    color: 'gray',
  },
];

const feedbackTypeStyles: Record<FeedbackType, string> = {
  feedback: 'bg-purple-500/20 border-purple-500/50 text-purple-300',
  bug: 'bg-red-500/20 border-red-500/50 text-red-300',
  feature: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300',
  other: 'bg-panel border-subtle text-muted',
};

type FormState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: {
    [key: string]: string[] | undefined;
  };
};

const initialState: FormState = {
  status: 'idle',
  message: '',
};

export default function FeedbackWidget({
  isOpen,
  setIsOpen,
}: FeedbackWidgetProps) {
  const CloseIcon = IoClose; // Local alias
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feedback');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [state, setState] = useState<FormState>(initialState);
  const [pending, setPending] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const SubmitButton = () => {
    return (
      <button
        type="submit"
        disabled={pending || message.trim().length < 10}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-green-500 to-emerald-500 px-4 py-3 font-semibold text-white transition-opacity duration-200 ease-out hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
            Sending...
          </>
        ) : (
          <>
            <IoSend className="h-5 w-5" />
            Send Feedback
          </>
        )}
      </button>
    );
  };

  useEffect(() => {
    if (state.status === 'success') {
      setMessage('');
      setEmail('');
      setFeedbackType('feedback');
      setShowSuccess(true);
      formRef.current?.reset();
      setTimeout(() => {
        setIsOpen(false);
        setShowSuccess(false);
      }, 2000);
    }
  }, [state, setIsOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPage(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf', { cache: 'no-store' });
        const data = await response.json();
        if (response.ok && data?.token) {
          setCsrfToken(data.token);
        }
      } catch {
        // Silent failure; will retry on submit if needed.
      }
    };

    fetchCsrfToken();
  }, []);

  // open/close controlled by parent via props (hero aside)

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      setShowSuccess(false);
    },
    [setIsOpen]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      setShowSuccess(false);
    },
    [setIsOpen]
  );

  const resetForm = useCallback(() => {
    setMessage('');
    setEmail('');
    setFeedbackType('feedback');
    setShowSuccess(false);
    setState(initialState);
    formRef.current?.reset();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (lastFocusedRef.current) {
        lastFocusedRef.current.focus();
        lastFocusedRef.current = null;
      }
      return;
    }

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = () => {
      const selector =
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
      return Array.from(dialog.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => !el.hasAttribute('disabled')
      );
    };

    const focusable = getFocusable();
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        setShowSuccess(false);
        return;
      }

      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (pending) return;
      if (message.trim().length < 10) return;

      setPending(true);
      setState({ status: 'idle', message: '' });

      let token = csrfToken;
      if (!token) {
        try {
          const response = await fetch('/api/csrf', { cache: 'no-store' });
          const data = await response.json();
          if (response.ok && data?.token) {
            token = data.token;
            setCsrfToken(data.token);
          }
        } catch {
          token = null;
        }
      }

      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': token ?? '',
          },
          body: JSON.stringify({
            type: feedbackType,
            message,
            email: email || undefined,
            page,
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || data?.success === false) {
          if (data?.details && Array.isArray(data.details)) {
            const fieldErrors: FormState['fieldErrors'] = {};
            for (const detail of data.details) {
              if (!detail?.field || !detail?.message) continue;
              const key = detail.field as keyof FormState['fieldErrors'];
              if (!fieldErrors[key]) fieldErrors[key] = [];
              fieldErrors[key]?.push(detail.message);
            }

            setState({
              status: 'error',
              message: data?.error || 'Validation failed.',
              fieldErrors,
            });
          } else {
            setState({
              status: 'error',
              message: data?.error || 'Failed to submit feedback.',
            });
          }
          return;
        }

        setState({
          status: 'success',
          message: data?.message || 'Thank you for your feedback!',
        });
      } catch {
        setState({
          status: 'error',
          message: 'Failed to submit feedback. Please try again later.',
        });
      } finally {
        setPending(false);
      }
    },
    [pending, message, csrfToken, feedbackType, email, page]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="contrast-dark from-space-900/98 to-space-850/98 fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-green-500/20 bg-linear-to-b shadow-2xl backdrop-blur-xl md:top-16 md:bottom-0 md:w-105"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-widget-title"
            aria-describedby="feedback-widget-subtitle"
            id="feedback-widget-dialog"
            ref={dialogRef}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-green-500/20 bg-linear-to-r from-green-500/10 to-transparent p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-green-500/30 bg-green-500/20 p-2">
                  <IoChatbubbleEllipsesOutline className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h2
                    id="feedback-widget-title"
                    className="text-lg font-bold text-green-400"
                  >
                    Feedback
                  </h2>
                  <p
                    id="feedback-widget-subtitle"
                    className="text-muted text-xs"
                  >
                    Share your thoughts
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-xl p-2 transition-colors duration-200 ease-out hover:bg-white/10"
                aria-label="Close feedback panel"
                type="button"
                autoFocus
              >
                <CloseIcon className="text-muted h-6 w-6 transition-colors duration-200 ease-out hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
              {showSuccess ? (
                <div
                  className="flex h-full flex-col items-center justify-center p-8 text-start"
                  role="status"
                  aria-live="polite"
                >
                  <IoCheckmarkCircle className="mb-4 h-20 w-20 text-green-400" />
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Thank You!
                  </h3>
                  <p className="text-muted">{state.message}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  className="space-y-4"
                >
                  {/* Feedback Type Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-ink">
                      What type of feedback?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFeedbackType(type.value)}
                          className={`flex items-center gap-2 rounded-xl border p-3 transition-colors duration-200 ease-out ${
                            feedbackType === type.value
                              ? feedbackTypeStyles[type.value]
                              : 'border-white/10 bg-white/5 text-muted hover:bg-white/10'
                          }`}
                        >
                          {type.icon}
                          <span className="text-sm">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hidden input for feedbackType and page */}
                  <input type="hidden" name="type" value={feedbackType} />
                  <input type="hidden" name="page" value={page} />

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="feedback-message"
                      className="mb-2 block text-sm font-medium text-ink"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="feedback-message"
                      name="message" // Added name prop
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me what you think, report an issue, or suggest a feature..."
                      rows={5}
                      maxLength={1000}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 focus:outline-none"
                      required
                    />
                    <div className="text-muted mt-1 flex justify-between text-xs">
                      <span>{message.length}/1000 characters</span>
                      <span>Min: 10 characters</span>
                    </div>
                    {state.fieldErrors?.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {state.fieldErrors.message.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Email Input (Optional) */}
                  <div>
                    <label
                      htmlFor="feedback-email"
                      className="mb-2 block text-sm font-medium text-ink"
                    >
                      Email (optional)
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      name="email" // Added name prop
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com (for follow-up)"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 focus:outline-none"
                    />
                    {state.fieldErrors?.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {state.fieldErrors.email.join(', ')}
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {state.status === 'error' && (
                    <div
                      className="rounded-xl border border-red-500/30 bg-red-500/20 p-3 text-sm text-red-300"
                      role="alert"
                    >
                      {state.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <SubmitButton />

                  {/* Reset Link */}
                  {(message || email || feedbackType !== 'feedback') && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-muted w-full text-start text-sm transition-colors duration-200 ease-out hover:text-ink"
                    >
                      Clear form
                    </button>
                  )}
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="bg-space-950/90 sticky bottom-0 z-10 border-t border-green-500/20 p-4 backdrop-blur-xl">
              <button
                onClick={handleClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-linear-to-r from-green-500/10 to-emerald-500/10 py-3 font-medium text-green-300 transition-colors duration-200 ease-out hover:bg-green-500/20"
                type="button"
              >
                <CloseIcon className="h-5 w-5" />
                Close Panel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

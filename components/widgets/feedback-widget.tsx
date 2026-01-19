'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import {
  IoBugOutline,
  IoChatboxOutline,
  IoChatbubbleEllipsesOutline,
  IoCheckmarkCircle,
  IoClose,
  IoFlashOutline,
  IoHelpCircleOutline,
  IoSend,
} from 'react-icons/io5';

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

export default function FeedbackWidget({
  isOpen,
  setIsOpen,
}: FeedbackWidgetProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feedback');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/csrf');
        const { token } = await response.json();
        setCsrfToken(token);
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    },
    [isOpen, setIsOpen]
  );

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (message.trim().length < 10) {
        setError('Please provide at least 10 characters');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify({
            type: feedbackType,
            message: message.trim(),
            email: email.trim() || undefined,
            page: window.location.pathname,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSuccess(true);
          setMessage('');
          setEmail('');
          setTimeout(() => {
            setSuccess(false);
            setIsOpen(false);
          }, 2000);
        } else {
          setError(data.error || 'Failed to submit feedback');
        }
      } catch (err) {
        console.error('Feedback error:', err);
        setError('Failed to submit. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [feedbackType, message, email, csrfToken, setIsOpen]
  );

  const resetForm = useCallback(() => {
    setMessage('');
    setEmail('');
    setError(null);
    setSuccess(false);
  }, []);

  return (
    <>
      {/* Desktop Floating Button */}
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={handleToggle}
        className="group fixed top-60 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-linear-to-br from-green-500/20 to-emerald-500/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-green-400/50 hover:shadow-green-500/20 md:flex"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open feedback widget"
      >
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 0.3 },
            scale: { duration: 2, repeat: Infinity, repeatDelay: 3 },
          }}
        >
          <IoChatbubbleEllipsesOutline className="h-7 w-7 text-green-400 group-hover:text-green-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-0 right-0 z-60 flex h-full w-full flex-col border-l border-green-500/20 bg-linear-to-b from-[#0a0a1a]/98 to-[#0d0d20]/98 shadow-2xl backdrop-blur-xl md:top-16 md:z-50 md:h-[calc(100vh-65px)] md:w-105"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-green-500/20 bg-linear-to-r from-green-500/10 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-green-500/30 bg-green-500/20 p-2">
                    <IoChatbubbleEllipsesOutline className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-green-400">
                      Feedback
                    </h2>
                    <p className="text-xs text-gray-400">Share your thoughts</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="rounded-lg p-2 transition-colors hover:bg-white/10"
                  aria-label="Close feedback panel"
                >
                  <IoClose className="h-6 w-6 text-gray-400 hover:text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
                {success ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex h-full flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: 'spring',
                        damping: 10,
                        stiffness: 200,
                      }}
                    >
                      <IoCheckmarkCircle className="mb-4 h-20 w-20 text-green-400" />
                    </motion.div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      Thank You!
                    </h3>
                    <p className="text-gray-400">
                      Your feedback has been submitted successfully.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Feedback Type Selection */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        What type of feedback?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {feedbackTypes.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setFeedbackType(type.value)}
                            className={`flex items-center gap-2 rounded-lg border p-3 transition-all ${
                              feedbackType === type.value
                                ? `bg-${type.color}-500/20 border-${type.color}-500/50 text-${type.color}-300`
                                : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            {type.icon}
                            <span className="text-sm">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label
                        htmlFor="feedback-message"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="feedback-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me what you think, report an issue, or suggest a feature..."
                        rows={5}
                        maxLength={1000}
                        className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 focus:outline-none"
                        required
                      />
                      <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>{message.length}/1000 characters</span>
                        <span>Min: 10 characters</span>
                      </div>
                    </div>

                    {/* Email Input (Optional) */}
                    <div>
                      <label
                        htmlFor="feedback-email"
                        className="mb-2 block text-sm font-medium text-gray-300"
                      >
                        Email (optional)
                      </label>
                      <input
                        id="feedback-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com (for follow-up)"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 transition-all focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 focus:outline-none"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-red-500/30 bg-red-500/20 p-3 text-sm text-red-300"
                      >
                        {error}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading || message.trim().length < 10}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-green-500 to-emerald-500 px-4 py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <IoSend className="h-5 w-5" />
                          Send Feedback
                        </>
                      )}
                    </button>

                    {/* Reset Link */}
                    {(message || email) && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="w-full text-center text-sm text-gray-500 transition-colors hover:text-gray-300"
                      >
                        Clear form
                      </button>
                    )}
                  </form>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-green-500/20 p-4">
                <button
                  onClick={handleClose}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-linear-to-r from-green-500/10 to-emerald-500/10 py-3 font-medium text-green-300 transition-all hover:bg-green-500/20"
                >
                  <IoClose className="h-5 w-5" />
                  Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

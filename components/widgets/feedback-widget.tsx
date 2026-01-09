"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { IoBugOutline, IoChatboxOutline, IoChatbubbleEllipsesOutline, IoCheckmarkCircle, IoClose, IoFlashOutline, IoHelpCircleOutline, IoSend } from "react-icons/io5";

interface FeedbackWidgetProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

type FeedbackType = "feedback" | "bug" | "feature" | "other";

const feedbackTypes: { value: FeedbackType; label: string; icon: React.ReactNode; color: string }[] = [
    { value: "feedback", label: "General Feedback", icon: <IoChatboxOutline className="w-4 h-4" />, color: "purple" },
    { value: "bug", label: "Report Bug", icon: <IoBugOutline className="w-4 h-4" />, color: "red" },
    { value: "feature", label: "Feature Request", icon: <IoFlashOutline className="w-4 h-4" />, color: "cyan" },
    { value: "other", label: "Other", icon: <IoHelpCircleOutline className="w-4 h-4" />, color: "gray" },
];

export default function FeedbackWidget({ isOpen, setIsOpen }: FeedbackWidgetProps) {
    const [feedbackType, setFeedbackType] = useState<FeedbackType>("feedback");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleToggle = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    }, [isOpen, setIsOpen]);

    const handleClose = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
    }, [setIsOpen]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
    }, [setIsOpen]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim().length < 10) {
            setError("Please provide at least 10 characters");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                setMessage("");
                setEmail("");
                setTimeout(() => {
                    setSuccess(false);
                    setIsOpen(false);
                }, 2000);
            } else {
                setError(data.error || "Failed to submit feedback");
            }
        } catch (err) {
            console.error("Feedback error:", err);
            setError("Failed to submit. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [feedbackType, message, email, setIsOpen]);

    const resetForm = useCallback(() => {
        setMessage("");
        setEmail("");
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
                className="hidden md:flex fixed right-6 bottom-36 z-40 h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-md shadow-lg hover:border-green-400/50 hover:shadow-green-500/20 transition-all duration-300 group"
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
                        scale: { duration: 2, repeat: Infinity, repeatDelay: 3 }
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
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="fixed right-0 top-0 md:top-[65px] h-full md:h-[calc(100vh-65px)] w-full sm:w-[400px] md:w-[420px] bg-gradient-to-b from-[#0a0a1a]/98 to-[#0d0d20]/98 backdrop-blur-xl border-l border-green-500/20 z-50 flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-gradient-to-r from-green-500/10 to-transparent">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-green-500/20 border border-green-500/30">
                                        <IoChatbubbleEllipsesOutline className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-green-400">Feedback</h2>
                                        <p className="text-xs text-gray-400">Share your thoughts</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    aria-label="Close feedback panel"
                                >
                                    <IoClose className="w-6 h-6 text-gray-400 hover:text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                                {success ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="flex flex-col items-center justify-center h-full text-center p-8"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 10, stiffness: 200 }}
                                        >
                                            <IoCheckmarkCircle className="w-20 h-20 text-green-400 mb-4" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                                        <p className="text-gray-400">Your feedback has been submitted successfully.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Feedback Type Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                What type of feedback?
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {feedbackTypes.map((type) => (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => setFeedbackType(type.value)}
                                                        className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${feedbackType === type.value
                                                                ? `bg-${type.color}-500/20 border-${type.color}-500/50 text-${type.color}-300`
                                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
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
                                            <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-300 mb-2">
                                                Your Message *
                                            </label>
                                            <textarea
                                                id="feedback-message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Tell me what you think, report an issue, or suggest a feature..."
                                                rows={5}
                                                maxLength={1000}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 resize-none transition-all"
                                                required
                                            />
                                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                <span>{message.length}/1000 characters</span>
                                                <span>Min: 10 characters</span>
                                            </div>
                                        </div>

                                        {/* Email Input (Optional) */}
                                        <div>
                                            <label htmlFor="feedback-email" className="block text-sm font-medium text-gray-300 mb-2">
                                                Email (optional)
                                            </label>
                                            <input
                                                id="feedback-email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com (for follow-up)"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/30 transition-all"
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                                            >
                                                {error}
                                            </motion.div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={loading || message.trim().length < 10}
                                            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <IoSend className="w-5 h-5" />
                                                    Send Feedback
                                                </>
                                            )}
                                        </button>

                                        {/* Reset Link */}
                                        {(message || email) && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors"
                                            >
                                                Clear form
                                            </button>
                                        )}
                                    </form>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-green-500/20">
                                <button
                                    onClick={handleClose}
                                    className="w-full py-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-green-300 font-medium hover:bg-green-500/20 transition-all"
                                >
                                    <IoClose className="w-5 h-5" />
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

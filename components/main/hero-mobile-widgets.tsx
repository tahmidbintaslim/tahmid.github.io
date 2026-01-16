"use client";

import { motion } from "framer-motion";
import { IoChatbubbleEllipsesOutline, IoLocationSharp, IoNewspaperOutline } from "react-icons/io5";

interface HeroMobileWidgetsProps {
    onLocationClick: () => void;
    onNewsClick: () => void;
    onFeedbackClick: () => void;
}

export default function HeroMobileWidgets({ onLocationClick, onNewsClick, onFeedbackClick }: HeroMobileWidgetsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="md:hidden fixed top-5 left-4 right-4 z-40 flex gap-2"
        >
            {/* Location Widget Button */}
            <button
                onClick={onLocationClick}
                className="flex flex-1 items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-md border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 touch-manipulation group"
                aria-label="Open location widget"
                title="Location"
            >
                <div className="p-1 rounded-md bg-purple-500/20 border border-purple-500/30">
                    <IoLocationSharp className="h-3.5 w-3.5 text-purple-400 group-hover:text-purple-300" />
                </div>
            </button>

            {/* News Widget Button */}
            <button
                onClick={onNewsClick}
                className="flex flex-1 items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 touch-manipulation group"
                aria-label="Open news widget"
                title="Tech News"
            >
                <div className="p-1 rounded-md bg-cyan-500/20 border border-cyan-500/30">
                    <IoNewspaperOutline className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300" />
                </div>
            </button>

            {/* Feedback Widget Button */}
            <button
                onClick={onFeedbackClick}
                className="flex flex-1 items-center justify-center px-2 py-2 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 hover:border-green-400/50 transition-all duration-300 touch-manipulation group"
                aria-label="Open feedback widget"
                title="Feedback"
            >
                <div className="p-1 rounded-md bg-green-500/20 border border-green-500/30">
                    <IoChatbubbleEllipsesOutline className="h-3.5 w-3.5 text-green-400 group-hover:text-green-300" />
                </div>
            </button>
        </motion.div>
    );
}

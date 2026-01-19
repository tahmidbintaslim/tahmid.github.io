'use client';

import { motion } from 'framer-motion';
import {
  IoChatbubbleEllipsesOutline,
  IoLocationSharp,
  IoNewspaperOutline,
} from 'react-icons/io5';

interface HeroMobileWidgetsProps {
  onLocationClick: () => void;
  onNewsClick: () => void;
  onFeedbackClick: () => void;
}

export default function HeroMobileWidgets({
  onLocationClick,
  onNewsClick,
  onFeedbackClick,
}: HeroMobileWidgetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed top-5 right-4 left-4 z-40 flex gap-2 md:hidden"
    >
      {/* Location Widget Button */}
      <button
        onClick={onLocationClick}
        className="group flex flex-1 touch-manipulation items-center justify-center rounded-lg border border-purple-500/30 bg-linear-to-r from-purple-600/20 to-cyan-600/20 px-2 py-2 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50"
        aria-label="Open location widget"
        title="Location"
      >
        <div className="rounded-md border border-purple-500/30 bg-purple-500/20 p-1">
          <IoLocationSharp className="h-3.5 w-3.5 text-purple-400 group-hover:text-purple-300" />
        </div>
      </button>

      {/* News Widget Button */}
      <button
        onClick={onNewsClick}
        className="group flex flex-1 touch-manipulation items-center justify-center rounded-lg border border-cyan-500/30 bg-linear-to-r from-cyan-600/20 to-blue-600/20 px-2 py-2 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50"
        aria-label="Open news widget"
        title="Tech News"
      >
        <div className="rounded-md border border-cyan-500/30 bg-cyan-500/20 p-1">
          <IoNewspaperOutline className="h-3.5 w-3.5 text-cyan-400 group-hover:text-cyan-300" />
        </div>
      </button>

      {/* Feedback Widget Button */}
      <button
        onClick={onFeedbackClick}
        className="group flex flex-1 touch-manipulation items-center justify-center rounded-lg border border-green-500/30 bg-linear-to-r from-green-600/20 to-emerald-600/20 px-2 py-2 backdrop-blur-md transition-all duration-300 hover:border-green-400/50"
        aria-label="Open feedback widget"
        title="Feedback"
      >
        <div className="rounded-md border border-green-500/30 bg-green-500/20 p-1">
          <IoChatbubbleEllipsesOutline className="h-3.5 w-3.5 text-green-400 group-hover:text-green-300" />
        </div>
      </button>
    </motion.div>
  );
}

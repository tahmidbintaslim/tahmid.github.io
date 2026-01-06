"use client";

import { useState, useEffect } from "react";
import { IoLocationSharp, IoTimeOutline, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface LocationData {
  city: string;
  country: string;
  timezone: string;
  localTime: string;
}

export default function LocationWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocationData() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const localTime = new Intl.DateTimeFormat("en-US", {
          timeZone: data.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());

        setLocationData({
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          timezone: data.timezone || "UTC",
          localTime,
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch location:", error);
        setLocationData({
          city: "Unknown",
          country: "Worldwide",
          timezone: "UTC",
          localTime: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        });
        setLoading(false);
      }
    }

    fetchLocationData();

    const interval = setInterval(() => {
      setLocationData((prevData) => {
        if (!prevData) return prevData;
        const localTime = new Intl.DateTimeFormat("en-US", {
          timeZone: prevData.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        return { ...prevData, localTime };
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-32 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Toggle location widget"
      >
        <IoLocationSharp className="h-5 w-5 text-purple-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 bg-[#030014]/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="sticky top-0 bg-[#030014]/80 backdrop-blur-xl border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Visitor Info
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                    aria-label="Close"
                  >
                    <IoClose className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                  </div>
                ) : locationData ? (
                  <>
                    <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="rounded-lg bg-purple-500/20 p-2">
                          <IoLocationSharp className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Your Location</p>
                          <p className="text-lg font-semibold text-white">
                            {locationData.city}
                          </p>
                          <p className="text-sm text-gray-300">{locationData.country}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-white/10 p-4">
                      <div className="flex items-start space-x-3">
                        <div className="rounded-lg bg-cyan-500/20 p-2">
                          <IoTimeOutline className="h-5 w-5 text-cyan-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-400">Your Local Time</p>
                          <p className="text-2xl font-bold text-white">
                            {locationData.localTime}
                          </p>
                          <p className="text-xs text-gray-400">{locationData.timezone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Welcome to my portfolio! 👋 <br />
                        You&apos;re viewing from{" "}
                        <span className="text-purple-400 font-semibold">
                          {locationData.city}
                        </span>
                        . Thanks for stopping by!
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-8">
                    Unable to detect location
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

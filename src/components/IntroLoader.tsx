"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Ripple } from "@/components/ui/ripple"

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(onComplete, 600) // Small delay after 100%
          return 100
        }
        return prev + 2
      })
    }, 35) // Takes about 1.7 seconds to reach 100%

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999] overflow-hidden select-none">
      {/* Ripple background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Ripple mainCircleSize={210} numCircles={8} className="text-neutral-400" mainCircleOpacity={0.5} />
      </div>

      {/* Main Loader Content */}
      <div className="z-10 flex flex-col items-center space-y-8 max-w-lg w-full px-4 justify-center">
        {/* Clean Text */}
        <motion.h1
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 text-center text-5xl font-bold tracking-tighter whitespace-pre-wrap text-neutral-900 font-sans"
        >
          dxwntichakn
        </motion.h1>

        {/* Progress Bar & Text */}
        <div className="w-48 space-y-3 flex flex-col items-center">
          <div className="h-[2px] w-full bg-neutral-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neutral-800" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
            Initializing System {progress}%
          </span>
        </div>
      </div>
    </div>
  )
}

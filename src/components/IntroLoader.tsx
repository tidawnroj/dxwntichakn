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
    <motion.div 
      className="fixed top-0 left-0 w-full h-screen z-[9999] bg-background flex flex-col items-center justify-center select-none"
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Foreground Content */}
      <motion.div 
        className="z-10 flex flex-col items-center space-y-8 max-w-lg w-full px-4 justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Ripple background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <Ripple mainCircleSize={210} numCircles={8} className="text-neutral-400 dark:text-neutral-800" mainCircleOpacity={0.5} />
        </div>

        {/* Clean Text */}
        <motion.h1
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center text-5xl font-bold tracking-tighter whitespace-pre-wrap text-foreground font-sans"
        >
          dxwntichakn
        </motion.h1>

        {/* Progress Bar & Text */}
        <div className="w-48 space-y-3 flex flex-col items-center">
          <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-foreground" 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
            Initializing System {progress}%
          </span>
        </div>
      </motion.div>

      {/* Pinned Curved Bottom SVG */}
      <svg 
        className="absolute top-full left-0 w-full h-[15vh] fill-background pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path d="M 0 0 L 100 0 Q 50 100 0 0 Z" />
      </svg>
    </motion.div>
  )
}

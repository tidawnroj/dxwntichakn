"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
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

  // 3 vertical noren panels for staggered exit
  const panelVariants: Variants = {
    initial: {
      y: "0%"
    },
    exit: (i: number) => ({
      y: "-100vh",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.1
      }
    })
  }

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] overflow-hidden select-none pointer-events-none flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }} // Dummy exit to keep wrapper in DOM
      transition={{ duration: 1.0 }} // Matches total animation time (0.2s delay + 0.8s duration)
    >
      {/* Staggered Noren Backdrop Panels */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`loader-panel-${i}`}
            custom={i}
            variants={panelVariants}
            initial="initial"
            exit="exit"
            className="h-full flex-1 bg-background relative border-r border-border/10 last:border-r-0 pointer-events-auto"
          >
            {/* Glowing blue leading borders */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#3b82f6] shadow-[0_0_8px_#3b82f6,0_0_15px_#3b82f6]" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#3b82f6] shadow-[0_0_8px_#3b82f6,0_0_15px_#3b82f6]" />
            {/* Individual curved bottom for each panel */}
            <svg 
              className="absolute top-full left-0 w-full h-[15vh] fill-background pointer-events-none" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              <path d="M 0 0 L 100 0 Q 50 100 0 0 Z" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Foreground Content */}
      <motion.div 
        className="z-10 flex flex-col items-center space-y-8 max-w-lg w-full px-4 justify-center pointer-events-auto"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
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
    </motion.div>
  )
}

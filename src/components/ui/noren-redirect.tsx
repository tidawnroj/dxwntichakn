"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, Variants } from "framer-motion"

interface NorenRedirectProps {
  active: boolean
  to: string
}

export function NorenRedirect({ active, to }: NorenRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    if (active) {
      // Trigger navigation when the panels cover the screen and fade to white (duration 0.65s + max delay 0.16s)
      const timer = setTimeout(() => {
        router.push(to)
      }, 850)
      return () => clearTimeout(timer)
    }
  }, [active, to, router])

  const panelVariants: Variants = {
    initial: {
      y: "-100%",
      borderRightColor: "#3b82f6",
      boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
    },
    animate: (i: number) => ({
      y: active ? ["-100%", "0%", "0%"] : "-100%",
      borderRightColor: active ? ["#3b82f6", "#3b82f6", "#ffffff"] : "#3b82f6",
      boxShadow: active 
        ? [
            "0 0 15px rgba(59, 130, 246, 0.3)",
            "0 0 15px rgba(59, 130, 246, 0.3)",
            "0 0 0px rgba(59, 130, 246, 0)"
          ]
        : "0 0 15px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.65,
        times: [0, 0.7, 1.0],
        ease: [0.76, 0, 0.24, 1],
        delay: i * 0.08
      }
    })
  }

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-auto z-[99999] flex">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`redirect-panel-${i}`}
          custom={i}
          variants={panelVariants}
          initial="initial"
          animate="animate"
          className="h-full flex-1 bg-white border-r last:border-r-0"
        />
      ))}
    </div>
  )
}

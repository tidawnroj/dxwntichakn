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
      // Trigger navigation when the panels cover the screen (duration 0.5s + max delay 0.16s)
      const timer = setTimeout(() => {
        router.push(to)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [active, to, router])

  const panelVariants: Variants = {
    initial: {
      y: "-100%"
    },
    animate: (i: number) => ({
      y: active ? "0%" : "-100%",
      transition: {
        duration: 0.5,
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
          className="h-full flex-1 bg-background border-r border-border/10 last:border-r-0"
        />
      ))}
    </div>
  )
}

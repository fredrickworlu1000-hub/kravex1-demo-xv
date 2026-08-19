"use client"

import { motion } from "motion/react"
import { MousePointerClick, Play } from "lucide-react"

export function StepIntro({ onRun }: { onRun: () => void }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground"
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-gold" />
        </span>
        Live lead simulation
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-4xl font-normal leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl"
      >
        See what happens the moment a new lead clicks{" "}
        <span className="relative whitespace-nowrap text-gold">
          “I’m Interested”
          <MousePointerClick
            className="ml-1 inline size-6 align-baseline sm:size-8"
            aria-hidden="true"
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Kravex AI engages instantly, qualifies naturally, scores the lead, and
        books the viewing — all before your coffee gets cold. Watch a realistic Miami buyer scenario play out, start to finish.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10"
      >
        <button
          type="button"
          onClick={onRun}
          className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-all gold-glow hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Play className="size-5 fill-current" aria-hidden="true" />
          Run Demo
        </button>
        <p className="mt-4 text-xs text-muted-foreground">
          3–5 minute interactive walkthrough
        </p>
      </motion.div>
    </div>
  )
}

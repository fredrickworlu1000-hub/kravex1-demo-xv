"use client"

import { motion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { KravexLogo } from "./logo"

export function StepOutro({ onRestart }: { onRestart: () => void }) {
  const line1 = "Your leads are already coming in."
  const line2 = "Kravex makes sure they don’t go cold."

  return (
    <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <KravexLogo className="[&_span:last-child]:text-lg" />
      </motion.div>

      <h1 className="mt-10 font-serif text-3xl leading-[1.15] tracking-tight text-balance sm:text-5xl md:text-6xl">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="block"
        >
          {line1}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-1 block text-gold"
        >
          {line2}
        </motion.span>
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <button
          type="button"
          onClick={onRestart}
          className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-gold/40 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="size-4 transition-transform group-hover:-rotate-45" aria-hidden="true" />
          Replay the demo
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          This was a simulated buyer journey. Kravex AI runs this automatically
          for every lead, day and night.
        </p>
      </motion.div>
    </div>
  )
}

"use client"

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react"
import { motion } from "motion/react"
import { STEPS } from "@/lib/demo-data"

type Props = {
  step: number
  total: number
  onBack: () => void
  onNext: () => void
  onRestart: () => void
  nextLabel?: string
  nextDisabled?: boolean
  highlightNext?: boolean
}

export function DemoControls({
  step,
  total,
  onBack,
  onNext,
  onRestart,
  nextLabel = "Next",
  nextDisabled = false,
  highlightNext = false,
}: Props) {
  const isLast = step === total - 1

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center justify-between gap-3 rounded-2xl border border-border bg-surface/80 px-3 py-2.5 backdrop-blur-xl sm:px-4">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0}
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Previous step"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step + 1} aria-label={`Step ${step + 1} of ${total}: ${STEPS[step]}`}>
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className="relative h-1.5 overflow-hidden rounded-full bg-border transition-all duration-300"
              style={{ width: i === step ? 24 : 8 }}
            >
              {i <= step && (
                <motion.span
                  layout
                  className="absolute inset-0 rounded-full bg-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Restart demo"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Restart</span>
          </button>

          {!isLast && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              className={`group flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 ${
                highlightNext
                  ? "bg-gold text-primary-foreground gold-glow"
                  : "bg-elevated text-foreground hover:bg-secondary"
              }`}
            >
              {nextLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

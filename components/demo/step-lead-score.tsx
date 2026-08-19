"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Flame, Zap } from "lucide-react"
import { LEAD, LEAD_SCORE } from "@/lib/demo-data"

function ScoreRing({ score }: { score: number }) {
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(reduce ? score : 0)
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const pct = score / 100

  useEffect(() => {
    if (reduce) return
    let raf: number
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * score))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score, reduce])

  return (
    <div className="relative flex size-44 items-center justify-center">
      <svg className="size-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="8" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-serif text-5xl tabular-nums text-foreground">{display}</span>
        <span className="text-xs text-muted-foreground">out of 100</span>
      </div>
    </div>
  )
}

export function StepLeadScore() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6">
      <header className="mb-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Step 02 · Instant scoring
        </p>
        <h1 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
          Kravex scored this lead in real time
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-[auto_1fr]">
        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4 rounded-2xl border border-gold/25 bg-gold-soft p-6"
        >
          <ScoreRing score={LEAD_SCORE.score} />
          <div className="flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-primary-foreground">
            <Flame className="size-4 fill-current" aria-hidden="true" />
            {LEAD_SCORE.band} Lead
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">{LEAD.name}</p>
            <p className="text-xs text-muted-foreground">{LEAD.listing}</p>
          </div>
        </motion.div>

        {/* Signals + summary */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-2.5"
          >
            {LEAD_SCORE.signals.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      s.weight === "High" ? "text-gold" : "text-muted-foreground"
                    }`}
                  >
                    {s.weight}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium leading-snug">{s.detail}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-border bg-surface/50 p-5"
          >
            <h2 className="text-sm font-semibold">AI Summary</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {LEAD_SCORE.summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-gold/25 bg-gold-soft p-5"
          >
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gold">
              <Zap className="size-4 fill-current" aria-hidden="true" />
              Recommended action
            </h2>
            <p className="mt-2 text-sm font-semibold text-foreground">
              {LEAD_SCORE.action.title}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {LEAD_SCORE.action.detail}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

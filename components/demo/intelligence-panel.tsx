"use client"

import { AnimatePresence, motion } from "motion/react"
import { Check, Sparkles } from "lucide-react"
import { INTEL_FIELDS, type IntelKey } from "@/lib/demo-data"

export function IntelligencePanel({
  extracted,
}: {
  extracted: Set<IntelKey>
}) {
  const done = extracted.size
  const total = INTEL_FIELDS.length

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-gold" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight">
            Lead Intelligence
          </h2>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {done}/{total} extracted
        </span>
      </div>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: `${(done / total) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {INTEL_FIELDS.map((field) => {
          const isExtracted = extracted.has(field.key)
          return (
            <li
              key={field.key}
              className={`rounded-xl border p-3 transition-colors duration-500 ${
                isExtracted
                  ? "border-gold/25 bg-gold-soft"
                  : "border-border bg-elevated/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {field.label}
                </span>
                <span
                  className={`flex size-4 items-center justify-center rounded-full transition-all ${
                    isExtracted
                      ? "bg-gold text-primary-foreground"
                      : "border border-border"
                  }`}
                  aria-hidden="true"
                >
                  {isExtracted && <Check className="size-2.5" strokeWidth={3} />}
                </span>
              </div>
              <div className="mt-1.5 min-h-[1.25rem]">
                <AnimatePresence mode="wait">
                  {isExtracted ? (
                    <motion.p
                      key="value"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-sm font-medium leading-snug text-foreground"
                    >
                      {field.value}
                    </motion.p>
                  ) : (
                    <motion.div
                      key="pending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1"
                    >
                      <span className="h-1 w-16 animate-pulse rounded-full bg-border" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ul>

      <p className="mt-auto pt-4 text-[11px] leading-relaxed text-muted-foreground">
        Details are captured live from the conversation — no forms, no manual
        data entry.
      </p>
    </div>
  )
}

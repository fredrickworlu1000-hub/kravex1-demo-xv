"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CONVERSATION, LEAD, type IntelKey } from "@/lib/demo-data"
import { IntelligencePanel } from "./intelligence-panel"

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  )
}

export function StepConversation({
  onComplete,
}: {
  onComplete: (done: boolean) => void
}) {
  const reduce = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [typingSender, setTypingSender] = useState<"ai" | "lead">("ai")
  const [extracted, setExtracted] = useState<Set<IntelKey>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  const complete = visibleCount >= CONVERSATION.length

  // Playback engine.
  useEffect(() => {
    if (complete) {
      onComplete(true)
      return
    }
    const next = CONVERSATION[visibleCount]
    setTypingSender(next.sender)
    setTyping(true)

    const typingTime = reduce ? 250 : next.sender === "ai" ? 950 : 750
    const readTime = reduce ? 150 : Math.min(next.text.length * 16, 1500)

    const timer = setTimeout(() => {
      setTyping(false)
      setVisibleCount((c) => c + 1)
      if (next.extracts) {
        setExtracted((prev) => {
          const nextSet = new Set(prev)
          next.extracts?.forEach((k) => nextSet.add(k))
          return nextSet
        })
      }
    }, typingTime + readTime)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleCount])

  // Autoscroll transcript.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" })
  }, [visibleCount, typing, reduce])

  const shown = CONVERSATION.slice(0, visibleCount)

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6">
      <header className="mb-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Step 01 · The conversation
        </p>
        <h1 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
          A new lead just came in
        </h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Chat */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/50">
          {/* Lead header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-gold-soft text-sm font-semibold text-gold">
              {LEAD.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{LEAD.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {LEAD.location} · {LEAD.source}
              </p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Responding
            </span>
          </div>

          {/* Transcript */}
          <div
            ref={scrollRef}
            className="flex h-[46vh] min-h-[320px] flex-col gap-3 overflow-y-auto px-4 py-4 sm:h-[52vh]"
          >
            <AnimatePresence initial={false}>
              {shown.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${m.sender === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.sender === "ai"
                        ? "rounded-tl-sm bg-elevated text-foreground"
                        : "rounded-tr-sm bg-gold text-primary-foreground"
                    }`}
                  >
                    {m.sender === "ai" && (
                      <span className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-gold">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                          <path d="M12 6.5 17.5 12 12 17.5 6.5 12 12 6.5Z" fill="currentColor" />
                        </svg>
                        Kravex AI
                      </span>
                    )}
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && !complete && (
              <div className={`flex ${typingSender === "ai" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2.5 ${
                    typingSender === "ai"
                      ? "rounded-tl-sm bg-elevated"
                      : "rounded-tr-sm bg-gold/30"
                  }`}
                >
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Composer (decorative, shows AI is in control) */}
          <div className="border-t border-border px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-3 py-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-gold" />
              {complete
                ? "Conversation complete — intelligence ready"
                : "Kravex AI is handling this conversation automatically…"}
            </div>
          </div>
        </div>

        {/* Intelligence */}
        <div className="min-h-[300px]">
          <IntelligencePanel extracted={extracted} />
        </div>
      </div>

      {complete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-sm text-muted-foreground"
        >
          Every detail captured. Next: see how Kravex scores this lead. →
        </motion.p>
      )}
    </div>
  )
}

"use client"

import { AnimatePresence, motion } from "motion/react"
import { Calendar, Check, Clock, MapPin } from "lucide-react"
import { LEAD, VIEWING_SLOTS, type ViewingSlot } from "@/lib/demo-data"

export function StepScheduling({
  selected,
  onSelect,
}: {
  selected: ViewingSlot | null
  onSelect: (slot: ViewingSlot) => void
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 sm:px-6">
      <header className="mb-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Step 03 · Book the viewing
        </p>
        <h1 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
          {selected ? "Viewing confirmed" : "Pick a viewing time for Sarah"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {selected
            ? "Sarah gets an instant confirmation — you get a booked tour."
            : "Kravex offered these slots to Sarah automatically. Choose one to confirm."}
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div
            key="slots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="grid gap-3 sm:grid-cols-3"
          >
            {VIEWING_SLOTS.map((slot, i) => (
              <motion.button
                key={slot.id}
                type="button"
                onClick={() => onSelect(slot)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col items-start gap-1 rounded-2xl border border-border bg-surface/50 p-4 text-left transition-all hover:border-gold/40 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" aria-hidden="true" />
                  {slot.day}, {slot.date}
                </span>
                <span className="font-serif text-2xl text-foreground">{slot.time}</span>
                <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" />
                  {slot.note}
                </span>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-2xl border border-gold/25 bg-surface/50"
          >
            <div className="flex flex-col items-center gap-3 border-b border-border bg-gold-soft px-6 py-8 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                className="flex size-14 items-center justify-center rounded-full bg-gold text-primary-foreground"
              >
                <Check className="size-7" strokeWidth={3} aria-hidden="true" />
              </motion.span>
              <div>
                <p className="font-serif text-2xl">You&apos;re booked</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Private viewing scheduled with {LEAD.name}
                </p>
              </div>
            </div>

            <dl className="grid gap-px bg-border sm:grid-cols-3">
              <div className="bg-surface/50 p-4">
                <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Calendar className="size-3.5" aria-hidden="true" /> Date
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {selected.day}, {selected.date}
                </dd>
              </div>
              <div className="bg-surface/50 p-4">
                <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" /> Time
                </dt>
                <dd className="mt-1 text-sm font-semibold">{selected.time}</dd>
              </div>
              <div className="bg-surface/50 p-4">
                <dt className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden="true" /> Tour
                </dt>
                <dd className="mt-1 text-sm font-semibold">{selected.note}</dd>
              </div>
            </dl>

            <div className="px-4 py-3 text-center text-xs text-muted-foreground">
              In production, this instantly sends Sarah a confirmation + calendar invite and adds it to your dashboard.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

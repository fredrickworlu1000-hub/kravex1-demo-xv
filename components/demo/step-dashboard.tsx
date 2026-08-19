"use client"

import { motion } from "motion/react"
import { Bell, CalendarClock, Flame, Snowflake, Sun } from "lucide-react"
import {
  APPOINTMENTS,
  DASHBOARD_LEADS,
  FOLLOW_UPS,
  type DashboardLead,
  type ViewingSlot,
} from "@/lib/demo-data"

const BAND_STYLE: Record<
  DashboardLead["band"],
  { text: string; dot: string; icon: typeof Flame }
> = {
  HOT: { text: "text-hot", dot: "bg-hot", icon: Flame },
  WARM: { text: "text-warm", dot: "bg-warm", icon: Sun },
  COLD: { text: "text-cold", dot: "bg-cold", icon: Snowflake },
}

function LeadRow({ lead, index }: { lead: DashboardLead; index: number }) {
  const style = BAND_STYLE[lead.band]
  const Icon = style.icon
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-center gap-3 rounded-xl border border-border bg-elevated/40 p-3"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold">
        {lead.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{lead.name}</p>
          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
            <Icon className="size-3" aria-hidden="true" />
            {lead.band}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground">{lead.summary}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground/80">
          {lead.budget} · {lead.location} · {lead.meta}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className={`font-serif text-xl tabular-nums ${style.text}`}>{lead.score}</p>
        <p className="text-[10px] text-muted-foreground">score</p>
      </div>
    </motion.li>
  )
}

export function StepDashboard({ bookedSlot }: { bookedSlot: ViewingSlot | null }) {
  const bands: DashboardLead["band"][] = ["HOT", "WARM", "COLD"]
  const appointmentTime = bookedSlot
    ? `${bookedSlot.day.slice(0, 3)} · ${bookedSlot.time}`
    : APPOINTMENTS[0].time
  const leads = DASHBOARD_LEADS.map((lead) =>
    lead.name === "Sarah Mitchell" && bookedSlot
      ? { ...lead, meta: `Viewing booked · ${bookedSlot.day.slice(0, 3)} ${bookedSlot.time}` }
      : lead,
  )
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pt-6 sm:px-6">
      <header className="mb-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          Step 04 · Your command center
        </p>
        <h1 className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">
          Every lead, sorted and ready
        </h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Pipeline */}
        <div className="rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Lead pipeline</h2>
            <span className="text-xs text-muted-foreground">
              {DASHBOARD_LEADS.length} active
            </span>
          </div>
          <div className="flex flex-col gap-5">
            {bands.map((band) => {
              const bandLeads = leads.filter((l) => l.band === band)
              const style = BAND_STYLE[band]
              return (
                <div key={band}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`size-2 rounded-full ${style.dot}`} aria-hidden="true" />
                    <span className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>
                      {band}
                    </span>
                    <span className="text-xs text-muted-foreground">({bandLeads.length})</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {bandLeads.map((lead, i) => (
                      <LeadRow key={lead.name} lead={lead} index={i} />
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Side rail */}
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CalendarClock className="size-4 text-gold" aria-hidden="true" />
              Upcoming appointments
            </h2>
            <ul className="flex flex-col gap-2.5">
              {APPOINTMENTS.map((a, index) => (
                <li key={a.who} className="rounded-xl border border-border bg-elevated/40 p-3">
                  <p className="text-xs font-medium text-gold">{index === 0 ? appointmentTime : a.time}</p>
                  <p className="mt-0.5 text-sm font-semibold">{a.who}</p>
                  <p className="text-xs text-muted-foreground">{a.what}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Bell className="size-4 text-gold" aria-hidden="true" />
              Follow-ups queued
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOLLOW_UPS.map((f) => (
                <li key={f.who} className="flex items-start justify-between gap-2 rounded-xl border border-border bg-elevated/40 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{f.who}</p>
                    <p className="truncate text-xs text-muted-foreground">{f.what}</p>
                  </div>
                  <span className="shrink-0 whitespace-nowrap text-[11px] text-gold">{f.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

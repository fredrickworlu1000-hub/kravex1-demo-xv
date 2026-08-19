"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { KravexLogo } from "@/components/demo/logo"
import { DemoControls } from "@/components/demo/demo-controls"
import { StepIntro } from "@/components/demo/step-intro"
import { StepConversation } from "@/components/demo/step-conversation"
import { StepLeadScore } from "@/components/demo/step-lead-score"
import { StepScheduling } from "@/components/demo/step-scheduling"
import { StepDashboard } from "@/components/demo/step-dashboard"
import { StepOutro } from "@/components/demo/step-outro"
import { STEPS, type ViewingSlot } from "@/lib/demo-data"

const TOTAL = STEPS.length

const NEXT_LABELS = ["Run Demo", "See the score", "Book viewing", "Open dashboard", "Finish", ""]

export default function Page() {
  const [step, setStep] = useState(0)
  const [convoDone, setConvoDone] = useState(false)
  const [slot, setSlot] = useState<ViewingSlot | null>(null)

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL - 1)), [])
  const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 0)), [])
  const restart = useCallback(() => {
    setStep(0)
    setConvoDone(false)
    setSlot(null)
  }, [])

  const scheduleBlocked = step === 3 && !slot
  const highlightNext =
    (step === 1 && convoDone) || (step === 3 && !!slot) || step === 2 || step === 4

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Ambient cinematic backdrop */}
      <div className="pointer-events-none fixed inset-0 grain opacity-60" aria-hidden="true" />
      <div
        className="pointer-events-none fixed left-1/2 top-0 h-[60vh] w-[120vw] -translate-x-1/2 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.83 0.12 82 / 0.14), transparent 60%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-4 py-4 sm:px-6">
        <KravexLogo />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">Real-estate lead intelligence</span>
          <span className="rounded-full border border-border px-2.5 py-1 tabular-nums">
            {step + 1} / {TOTAL}
          </span>
        </div>
      </header>

      {/* Step stage */}
      <main className="relative z-10 pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <StepIntro onRun={goNext} />}
            {step === 1 && <StepConversation onComplete={setConvoDone} />}
            {step === 2 && <StepLeadScore />}
            {step === 3 && <StepScheduling selected={slot} onSelect={setSlot} />}
            {step === 4 && <StepDashboard />}
            {step === 5 && <StepOutro onRestart={restart} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {step > 0 && (
        <DemoControls
          step={step}
          total={TOTAL}
          onBack={goBack}
          onNext={goNext}
          onRestart={restart}
          nextLabel={NEXT_LABELS[step]}
          nextDisabled={scheduleBlocked}
          highlightNext={highlightNext}
        />
      )}
    </div>
  )
}

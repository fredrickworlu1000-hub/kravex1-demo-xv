export type Sender = "ai" | "lead"

export type IntelKey =
  | "intent"
  | "budget"
  | "location"
  | "timeline"
  | "preferences"

export type ChatMessage = {
  id: number
  sender: Sender
  text: string
  /** Which intelligence field(s) this message unlocks once shown. */
  extracts?: IntelKey[]
}

export type IntelField = {
  key: IntelKey
  label: string
  value: string
}

export const LEAD = {
  name: "Sarah Mitchell",
  initials: "SM",
  location: "Miami, FL",
  source: "Zillow — clicked “I’m Interested”",
  listing: "Waterfront 2BR · Edgewater",
}

/**
 * The scripted conversation. Message timing is handled in the component,
 * but the extraction mapping lives here so the intelligence panel stays
 * in sync with the transcript.
 */
export const CONVERSATION: ChatMessage[] = [
  {
    id: 1,
    sender: "ai",
    text: "Hi Sarah, thanks for reaching out about the Edgewater waterfront condo. I’m the listing assistant — happy to help. Are you looking to buy, or just exploring the area for now?",
  },
  {
    id: 2,
    sender: "lead",
    text: "Definitely looking to buy. We’re relocating and want something we can move into, not an investment flip.",
    extracts: ["intent"],
  },
  {
    id: 3,
    sender: "ai",
    text: "Perfect — a primary home makes this easy to narrow down. Do you have a budget range in mind so I only send you places that actually fit?",
  },
  {
    id: 4,
    sender: "lead",
    text: "We’re pre-approved up to about 1.5. Ideally I’d love to stay closer to 1.2–1.4 if the finishes are right.",
    extracts: ["budget"],
  },
  {
    id: 5,
    sender: "ai",
    text: "Got it. And are you set on Edgewater, or would you consider nearby neighborhoods like Brickell or Miami Shores?",
  },
  {
    id: 6,
    sender: "lead",
    text: "Edgewater or Brickell for sure — I want to be walkable to the bay and close to downtown for work.",
    extracts: ["location"],
  },
  {
    id: 7,
    sender: "ai",
    text: "Makes sense. What’s your timeline looking like? Are you hoping to be settled by a certain date?",
  },
  {
    id: 8,
    sender: "lead",
    text: "Pretty soon — my lease is up in about two months so we’d like to close within 60 days if we find the right place.",
    extracts: ["timeline"],
  },
  {
    id: 9,
    sender: "ai",
    text: "That’s a clear runway. Last thing — anything that’s a must-have? Layout, view, building amenities?",
  },
  {
    id: 10,
    sender: "lead",
    text: "At least 2 bedrooms, a real water view, and a building with a gym and covered parking. A home office nook would be a bonus.",
    extracts: ["preferences"],
  },
  {
    id: 11,
    sender: "ai",
    text: "This is exactly the kind of home I can match you with, Sarah. I have two Edgewater units and one in Brickell that fit — I’ll line up private viewings so you can see them back to back.",
  },
]

export const INTEL_FIELDS: IntelField[] = [
  {
    key: "intent",
    label: "Intent",
    value: "Buying — primary residence, relocating",
  },
  {
    key: "budget",
    label: "Budget",
    value: "$1.2M – $1.5M · pre-approved",
  },
  {
    key: "location",
    label: "Location",
    value: "Edgewater / Brickell, Miami",
  },
  {
    key: "timeline",
    label: "Timeline",
    value: "Close within 60 days · lease ending",
  },
  {
    key: "preferences",
    label: "Preferences",
    value: "2BR+ · water view · gym · covered parking",
  },
]

export const LEAD_SCORE = {
  score: 92,
  band: "HOT" as const,
  signals: [
    { label: "Financing", detail: "Pre-approved to $1.5M", weight: "High" },
    { label: "Urgency", detail: "60-day close, lease ending", weight: "High" },
    { label: "Fit", detail: "Budget matches 3 live listings", weight: "High" },
    { label: "Engagement", detail: "Replied within 40 seconds", weight: "Medium" },
  ],
  summary:
    "Sarah is a relocation buyer with confirmed financing up to $1.5M and a hard 60-day timeline driven by an ending lease. Her criteria — a 2BR+ waterfront condo in Edgewater or Brickell with a gym and covered parking — matches three active listings in inventory. Intent is high and immediate.",
  action: {
    title: "Book private viewings within 24 hours",
    detail:
      "Bundle the two Edgewater units and the Brickell condo into one back-to-back tour block. Move now — pre-approved 60-day buyers convert fastest in the first 48 hours.",
  },
}

export type ViewingSlot = {
  id: string
  day: string
  date: string
  time: string
  note: string
}

export const VIEWING_SLOTS: ViewingSlot[] = [
  {
    id: "slot-1",
    day: "Thursday",
    date: "Jun 12",
    time: "10:30 AM",
    note: "3 listings · back-to-back",
  },
  {
    id: "slot-2",
    day: "Friday",
    date: "Jun 13",
    time: "2:00 PM",
    note: "3 listings · back-to-back",
  },
  {
    id: "slot-3",
    day: "Saturday",
    date: "Jun 14",
    time: "11:00 AM",
    note: "3 listings · weekend tour",
  },
]

export type DashboardLead = {
  name: string
  initials: string
  band: "HOT" | "WARM" | "COLD"
  score: number
  summary: string
  budget: string
  location: string
  meta: string
}

export const DASHBOARD_LEADS: DashboardLead[] = [
  {
    name: "Sarah Mitchell",
    initials: "SM",
    band: "HOT",
    score: 92,
    summary: "Pre-approved relocation buyer, 60-day close.",
    budget: "$1.2M–$1.5M",
    location: "Edgewater / Brickell",
    meta: "Viewing booked · Thu 10:30 AM",
  },
  {
    name: "David Chen",
    initials: "DC",
    band: "HOT",
    score: 88,
    summary: "Cash buyer, wants waterfront, touring this week.",
    budget: "$2.0M–$2.6M",
    location: "Coconut Grove",
    meta: "Awaiting your call",
  },
  {
    name: "Priya Nair",
    initials: "PN",
    band: "WARM",
    score: 67,
    summary: "Exploring, needs to sell current home first.",
    budget: "$800K–$1.0M",
    location: "Miami Shores",
    meta: "Follow-up in 3 days",
  },
  {
    name: "Marcus Reid",
    initials: "MR",
    band: "WARM",
    score: 61,
    summary: "Interested but timeline is 4–6 months out.",
    budget: "$1.0M–$1.3M",
    location: "Brickell",
    meta: "Nurture sequence active",
  },
  {
    name: "Elena Duarte",
    initials: "ED",
    band: "COLD",
    score: 34,
    summary: "Early browsing, no budget or timeline yet.",
    budget: "Unknown",
    location: "Undecided",
    meta: "Auto-nurture · monthly",
  },
]

export const APPOINTMENTS = [
  { time: "Thu · 10:30 AM", who: "Sarah Mitchell", what: "3-listing tour · Edgewater + Brickell" },
  { time: "Fri · 4:00 PM", who: "David Chen", what: "Waterfront viewing · Coconut Grove" },
]

export const FOLLOW_UPS = [
  { who: "Priya Nair", what: "Send comps for Miami Shores", when: "In 3 days" },
  { who: "Marcus Reid", what: "Check on home-sale progress", when: "Next week" },
]

export const STEPS = [
  "Intro",
  "Conversation",
  "Lead Score",
  "Schedule",
  "Dashboard",
  "Close",
] as const

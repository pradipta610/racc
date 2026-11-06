/* Content for /study-in-australia/v3. Structure adapted from a single-program enrolment page:
   hero + form, intake badge, about, USPs, who it's for, method, timeline, what's included, costs, intakes, reviews. */

export const V3_LINKS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why RACC" },
  { id: "for-you", label: "Who it's for" },
  { id: "timeline", label: "Timeline" },
  { id: "intakes", label: "Intakes" },
  { id: "plan-form", label: "Free plan" },
];

/* Globe: where students fly from (matches languages the team speaks) → Melbourne */
export const MELBOURNE = { name: "Melbourne", lat: -37.81, lng: 144.96 };
export const ORIGINS = [
  { name: "Jakarta", lat: -6.2, lng: 106.85 },
  { name: "Manila", lat: 14.6, lng: 120.98 },
  { name: "Kuala Lumpur", lat: 3.14, lng: 101.69 },
  { name: "Shanghai", lat: 31.23, lng: 121.47 },
  { name: "Hong Kong", lat: 22.32, lng: 114.17 },
  { name: "Colombo", lat: 6.93, lng: 79.86 },
  { name: "New Delhi", lat: 28.61, lng: 77.21 },
  { name: "Amritsar", lat: 31.63, lng: 74.87 },
  { name: "Ho Chi Minh City", lat: 10.82, lng: 106.63 },
  { name: "Kathmandu", lat: 27.72, lng: 85.32 },
];

/* Form options */
export const COUNTRIES = ["Indonesia", "India", "Philippines", "China", "Hong Kong", "Malaysia", "Sri Lanka", "Nepal", "Vietnam", "Already in Australia", "Other"];
export const LEVELS = ["High school", "Certificate / Diploma", "Bachelor degree", "Master degree or higher"];
export const FIELDS = ["Not sure yet", "Business & Management", "IT & Data", "Nursing & Health", "Engineering", "Accounting & Finance", "Early Childhood", "Cookery & Hospitality", "Construction & Trades", "Design & Creative"];

/* Intakes: main intakes in February and July. Apply-by = 4 months before the intake month. */
export type Intake = { label: string; start: Date; applyBy: Date };
export function upcomingIntakes(from: Date, count = 3): Intake[] {
  const out: Intake[] = [];
  for (let add = 0; out.length < count && add < 36; add++) {
    const d = new Date(from.getFullYear(), from.getMonth() + add, 1);
    const m = d.getMonth();
    if (m !== 1 && m !== 6) continue;
    const applyBy = new Date(d.getFullYear(), m - 4, 1);
    out.push({ label: `${m === 1 ? "February" : "July"} ${d.getFullYear()}`, start: d, applyBy });
  }
  return out;
}
export function intakeStatus(i: Intake, now: Date): { tag: string; tone: "late" | "soon" | "open" } {
  const days = Math.ceil((i.applyBy.getTime() - now.getTime()) / 86400000);
  if (days < 0) return { tag: "Tight timeline, ask us", tone: "late" };
  if (days <= 75) return { tag: `Apply within ${days} days`, tone: "soon" };
  return { tag: "Open, plenty of time", tone: "open" };
}
export const fmtMonth = (d: Date) => d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });

/* Why RACC (USPs) */
export const USPS = [
  { k: "01", title: "Education + visa, one roof", sub: "Course advice and registered migration agents in the same team. No hand-offs." },
  { k: "02", title: "Free course applications", sub: "We apply to institutions for you at no cost. Visa fees are quoted upfront." },
  { k: "03", title: "Advice in your language", sub: "English, Bahasa, Mandarin, Cantonese, Tagalog, Hindi, Punjabi and more." },
  { k: "04", title: "20+ years of cases", sub: "Two decades of student files, so unusual situations aren't new to us." },
];

/* Who it's for */
export const PERSONAS = [
  { id: "school", tab: "School leavers", img: "/education/life-friends.jpg", title: "Just finished high school", line: "You want a degree abroad but don't know if you qualify yet.", plan: ["English & entry check", "Foundation or diploma pathway", "Bachelor with credit"] },
  { id: "diploma", tab: "Diploma holders", img: "/education/life-class.jpg", title: "You already have a diploma", line: "You want a bachelor without starting from zero.", plan: ["Credit transfer review", "Shortened bachelor", "Post-study work planning"] },
  { id: "grad", tab: "Graduates", img: "/education/life-graduate.jpg", title: "You have a bachelor", line: "You want a master that actually moves your career.", plan: ["Course & university match", "Scholarship check", "Graduate visa 485 strategy"] },
  { id: "career", tab: "Career changers", img: "/education/life-study.jpg", title: "Working, but ready for a change", line: "You want to retrain in a field with real demand.", plan: ["Skills & interest review", "Practical VET or uni course", "Long-term visa options"] },
  { id: "onshore", tab: "Already here", img: "/education/city-melbourne.jpg", title: "Already in Australia", line: "Your visa or course needs a rethink.", plan: ["Visa condition check", "Course or provider change", "Visa 500 extension"] },
];

/* Method */
export const METHOD = [
  { title: "One advisor, start to finish", sub: "The person who plans your course also sees your visa through. You never re-explain your story." },
  { title: "Plan first, apply second", sub: "We map the whole route, including after graduation, before a single application goes in." },
];

/* Timeline: typical weeks from first chat to first class */
export const TIMELINE = [
  { wk: "Week 1", title: "Free consultation", sub: "Goals, grades, budget, English." },
  { wk: "Week 1–2", title: "Your pathway & shortlist", sub: "3–5 courses that fit, with costs." },
  { wk: "Week 2–6", title: "Applications & offer", sub: "We lodge, chase and compare offers." },
  { wk: "Week 6–8", title: "Accept & CoE", sub: "Deposit, OSHC, Confirmation of Enrolment." },
  { wk: "Week 8–12", title: "Student visa 500", sub: "Genuine Student answers, documents, lodgement." },
  { wk: "Week 12–16", title: "Pre-departure", sub: "Flights, housing, arrival checklist." },
  { wk: "Day 1", title: "First class in Australia", sub: "And we're still a call away." },
];

/* 12 things we take off your plate (mirrors the reference's 12-subject list) */
export const TWELVE = [
  "Course and career matching",
  "University, TAFE and college shortlist",
  "Entry and English requirement checks",
  "Credit transfer and RPL review",
  "Scholarship search",
  "Application lodgement and follow-up",
  "Offer comparison and acceptance",
  "OSHC health cover setup",
  "Genuine Student statement guidance",
  "Student visa 500 lodgement",
  "Pre-departure and arrival guide",
  "Graduate visa 485 and next-step planning",
];

/* What working with us costs */
export const FEES = [
  { title: "Course applications", price: "Free", note: "Applications to universities, TAFEs and colleges.", accent: true },
  { title: "Student visa 500", price: "Fixed fee", note: "Quoted in your first chat, before you commit to anything." },
  { title: "Ongoing support", price: "Included", note: "Questions during your studies don't cost extra." },
];

export const V3_FAQS = [
  { q: "Is the consultation really free?", a: "Yes. The first consultation is free with no obligation to continue." },
  { q: "What happens after I send the form?", a: "You'll be taken to WhatsApp with your details filled in. An advisor replies, usually within one business day." },
  { q: "Can you help if I've been refused a visa before?", a: "Yes. Our registered migration agents review refusals and tell you honestly what can change." },
  { q: "Do you only work with expensive universities?", a: "No. We work with universities, TAFEs and private colleges and match on goal and budget." },
];

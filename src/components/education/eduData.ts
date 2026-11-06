import {
  GraduationCap, School, BookOpen, Plane, Briefcase, House, FileCheck, Compass, Award,
  MessageCircle, Languages, MapPin, Stamp, Building2, Laptop, HeartPulse, Calculator, Baby,
  ChefHat, HardHat, Palette, HandHeart, Presentation, ChartColumn, Wrench, Coffee, Ship, Sun,
  Trees, Waves, Mountain, IdCard, FileText, Wallet, ShieldCheck, Stethoscope,
  type LucideIcon,
} from "lucide-react";

export const CONSULTATION_URL = "https://www.racc.net.au/migration-agent-education-agent";
export const WHATSAPP_URL = "https://wa.me/61420746705";

export const NAV_LINKS = [
  { id: "pathway", label: "Pathway" },
  { id: "courses", label: "Courses" },
  { id: "cities", label: "Cities" },
  { id: "costs", label: "Costs" },
  { id: "apply", label: "How to apply" },
  { id: "services", label: "Our services" },
  { id: "faq", label: "FAQ" },
];

/* Pathway picker */
export type Step = { icon: LucideIcon; label: string; time: string };
export type Route = { id: string; icon: LucideIcon; chip: string; steps: Step[] };

export const ROUTES: Route[] = [
  {
    id: "school", icon: School, chip: "I finished high school",
    steps: [
      { icon: Languages, label: "English test", time: "IELTS / PTE" },
      { icon: BookOpen, label: "Foundation or Diploma", time: "~1 yr" },
      { icon: GraduationCap, label: "Bachelor degree", time: "2–3 yrs" },
      { icon: Briefcase, label: "Graduate visa 485", time: "Work rights" },
      { icon: House, label: "Long-term options", time: "Skilled / sponsor" },
    ],
  },
  {
    id: "diploma", icon: FileCheck, chip: "I have a diploma",
    steps: [
      { icon: Stamp, label: "Credit transfer check", time: "Save time" },
      { icon: GraduationCap, label: "Bachelor (shortened)", time: "1.5–2 yrs" },
      { icon: Briefcase, label: "Graduate visa 485", time: "Work rights" },
      { icon: House, label: "Long-term options", time: "Skilled / sponsor" },
    ],
  },
  {
    id: "bachelor", icon: GraduationCap, chip: "I have a bachelor",
    steps: [
      { icon: Award, label: "Master degree", time: "1.5–2 yrs" },
      { icon: Briefcase, label: "Graduate visa 485", time: "Work rights" },
      { icon: Building2, label: "Industry experience", time: "In Australia" },
      { icon: House, label: "Long-term options", time: "Skilled / sponsor" },
    ],
  },
  {
    id: "onshore", icon: MapPin, chip: "I'm already in Australia",
    steps: [
      { icon: Compass, label: "Review your visa & course", time: "Free check" },
      { icon: BookOpen, label: "Change course or provider", time: "If needed" },
      { icon: Stamp, label: "Extend student visa 500", time: "Onshore" },
      { icon: Briefcase, label: "Graduate visa 485", time: "Work rights" },
    ],
  },
];

/* Courses */
export type Level = "Cert" | "Dip" | "Bach" | "Master";
export const LEVEL_NAMES: Record<Level, string> = {
  Cert: "Certificate", Dip: "Diploma", Bach: "Bachelor", Master: "Master",
};

export const FIELDS: { icon: LucideIcon; name: string; careers: string; levels: Level[] }[] = [
  { icon: Presentation, name: "Business & Management", careers: "Manager · Marketing · HR", levels: ["Cert", "Dip", "Bach", "Master"] },
  { icon: Laptop, name: "IT & Computer Science", careers: "Developer · Cyber · Network", levels: ["Cert", "Dip", "Bach", "Master"] },
  { icon: HeartPulse, name: "Nursing", careers: "Enrolled or Registered Nurse", levels: ["Dip", "Bach", "Master"] },
  { icon: Stethoscope, name: "Health & Aged Care", careers: "Aged care · Disability support", levels: ["Cert", "Dip", "Bach"] },
  { icon: Wrench, name: "Engineering", careers: "Civil · Mechanical · Electrical", levels: ["Dip", "Bach", "Master"] },
  { icon: Calculator, name: "Accounting & Finance", careers: "Accountant · Analyst · Auditor", levels: ["Dip", "Bach", "Master"] },
  { icon: Baby, name: "Early Childhood", careers: "Educator · Centre leader", levels: ["Cert", "Dip", "Bach"] },
  { icon: ChefHat, name: "Cookery & Hospitality", careers: "Chef · Venue manager", levels: ["Cert", "Dip"] },
  { icon: HardHat, name: "Construction & Trades", careers: "Carpenter · Electrician · Builder", levels: ["Cert", "Dip"] },
  { icon: Palette, name: "Design & Creative", careers: "Graphic · Interior · UX", levels: ["Cert", "Dip", "Bach", "Master"] },
  { icon: HandHeart, name: "Community & Social Work", careers: "Case worker · Social worker", levels: ["Cert", "Dip", "Bach", "Master"] },
  { icon: ChartColumn, name: "Data & Analytics", careers: "Data analyst · BI · AI", levels: ["Bach", "Master"] },
];

export const COURSE_FILTERS = [
  { id: "all", label: "All" },
  { id: "vet", label: "TAFE & colleges" },
  { id: "uni", label: "University" },
] as const;

export const LEVELS = [
  { label: "Certificate III / IV", time: "6–12 mo", h: 34 },
  { label: "Diploma", time: "1–2 yrs", h: 50 },
  { label: "Bachelor", time: "3 yrs", h: 70 },
  { label: "Master", time: "1.5–2 yrs", h: 86 },
  { label: "PhD", time: "3–4 yrs", h: 100 },
];

/* Cities */
export const CITIES: { icon: LucideIcon; name: string; img: string; state: string; vibe: string; tags: string[]; tint: string }[] = [
  { icon: Coffee, name: "Melbourne", img: "/education/city-melbourne.jpg", state: "VIC", vibe: "Australia's student city", tags: ["Most course choice", "Arts & food"], tint: "#1C3A8A" },
  { icon: Ship, name: "Sydney", img: "/education/city-sydney.jpg", state: "NSW", vibe: "Big city, global careers", tags: ["Finance & tech", "Harbour life"], tint: "#2E6DB4" },
  { icon: Sun, name: "Brisbane", img: "/education/city-brisbane.jpg", state: "QLD", vibe: "Sunny and relaxed", tags: ["Lower rent", "Outdoor living"], tint: "#5BA3D9" },
  { icon: Trees, name: "Adelaide", img: "/education/city-adelaide.jpg", state: "SA", vibe: "Calm, affordable, friendly", tags: ["Regional benefits", "Lower costs"], tint: "#2E6DB4" },
  { icon: Waves, name: "Perth", img: "/education/city-perth.jpg", state: "WA", vibe: "Beaches and booming industry", tags: ["Regional benefits", "Mining & engineering"], tint: "#1C3A8A" },
  { icon: Mountain, name: "Regional areas", img: "/education/city-regional.jpg", state: "Hobart, Gold Coast & more", vibe: "Smaller classes, tight community", tags: ["Extra post-study work time", "Lower costs"], tint: "#D4A800" },
];

/* Costs (AUD per year, approximate) */
export const COST_MAX = 55000;
export const COSTS = [
  { label: "TAFE & college course", min: 8000, max: 22000 },
  { label: "Bachelor degree", min: 25000, max: 45000 },
  { label: "Master degree", min: 28000, max: 50000 },
];
export const COST_EXTRAS: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: House, label: "Living costs", value: "~A$30k / yr" },
  { icon: ShieldCheck, label: "Health cover (OSHC)", value: "~A$600 / yr" },
  { icon: Stamp, label: "Student visa fee", value: "A$2,000+" },
  { icon: Briefcase, label: "Work while studying", value: "48 hrs / fortnight" },
];

/* Intakes */
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MAIN_INTAKES = [1, 6]; // Feb, Jul
export const MINOR_INTAKES = [2, 9, 10]; // Mar, Oct, Nov (some providers)

/* Requirements */
export const DOCS: { icon: LucideIcon; label: string }[] = [
  { icon: IdCard, label: "Valid passport" },
  { icon: FileText, label: "Transcripts & certificates" },
  { icon: Languages, label: "English test result" },
  { icon: FileCheck, label: "Offer letter → CoE" },
  { icon: MessageCircle, label: "Genuine Student answers" },
  { icon: Wallet, label: "Proof of funds" },
  { icon: ShieldCheck, label: "OSHC health cover" },
  { icon: Stethoscope, label: "Health & character checks" },
];

/* Services & process */
export const SERVICES: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Compass, title: "Pathway planning", sub: "One route, mapped to your goal" },
  { icon: School, title: "Course & uni match", sub: "Shortlist that fits budget and career" },
  { icon: FileCheck, title: "Applications & offers", sub: "We lodge, you track" },
  { icon: Stamp, title: "Student visa 500", sub: "Genuine Student statement included" },
  { icon: Plane, title: "Pre-departure", sub: "OSHC, arrival and first-week checklist" },
  { icon: Briefcase, title: "After graduation", sub: "485 and next-visa strategy" },
];

export const PROCESS = [
  { icon: MessageCircle, title: "Chat with us" },
  { icon: Compass, title: "Get your pathway" },
  { icon: FileCheck, title: "We apply for you" },
  { icon: Plane, title: "Fly & study" },
];

/* FAQ */
export const FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  { q: "Can I work while I study?", a: "Yes. Student visa holders can work up to 48 hours per fortnight during study periods, and unlimited hours during scheduled breaks." },
  { q: "Do I need IELTS?", a: "Most courses need an English test. IELTS, PTE and TOEFL are all accepted, and some students are exempt. We check which score your course needs." },
  { q: "Can my partner or kids come with me?", a: "Usually yes. Family members can be added to your student visa as dependants, with extra funds shown." },
  { q: "How long does the student visa take?", a: "It varies by country and case. Apply early to be safe.", link: { href: "/tools/visa-processing-times", label: "Check current processing times" } },
  { q: "Can I change my course after I arrive?", a: "Often yes, but it can affect your visa. Talk to us before you switch." },
  { q: "Is the first consultation free?", a: "Yes. Your first chat with our team is free and has no obligation." },
];

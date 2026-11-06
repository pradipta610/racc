/* Content for /study-in-australia/v2. Cost figures are rough planning ranges in AUD per year. */

export const V2_LINKS = [
  { id: "plan", label: "Build your plan" },
  { id: "journey", label: "The journey" },
  { id: "cities", label: "Cities" },
  { id: "myths", label: "Myths" },
  { id: "faq", label: "FAQ" },
];

export const QUESTIONS_A = [
  "TAFE or university?",
  "Is my IELTS score enough?",
  "Which city should I pick?",
  "How much will it really cost?",
  "Can I work while I study?",
  "Will my diploma count?",
];
export const QUESTIONS_B = [
  "What happens after I graduate?",
  "When should I apply?",
  "Can my partner come too?",
  "Is this course worth it?",
  "What if my visa gets refused?",
  "Where do I even start?",
];

/* Plan builder */
export type StartId = "school" | "diploma" | "bachelor" | "onshore";
export type InterestId = "business" | "it" | "health" | "engineering" | "hospitality" | "education" | "creative";
export type CityId = "melbourne" | "sydney" | "brisbane" | "adelaide" | "perth" | "regional";

export const STARTS: { id: StartId; label: string; emoji: string }[] = [
  { id: "school", label: "Finished high school", emoji: "🎒" },
  { id: "diploma", label: "Have a diploma", emoji: "📜" },
  { id: "bachelor", label: "Have a bachelor", emoji: "🎓" },
  { id: "onshore", label: "Already in Australia", emoji: "📍" },
];

export const INTERESTS: { id: InterestId; label: string; emoji: string }[] = [
  { id: "business", label: "Business", emoji: "💼" },
  { id: "it", label: "IT & Data", emoji: "💻" },
  { id: "health", label: "Nursing & Health", emoji: "🩺" },
  { id: "engineering", label: "Engineering", emoji: "🛠️" },
  { id: "hospitality", label: "Cookery & Hospitality", emoji: "👨‍🍳" },
  { id: "education", label: "Early Childhood", emoji: "🧸" },
  { id: "creative", label: "Design & Creative", emoji: "🎨" },
];

export const CITY_OPTIONS: { id: CityId; label: string; img: string; living: [number, number] }[] = [
  { id: "melbourne", label: "Melbourne", img: "/education/city-melbourne.jpg", living: [28000, 35000] },
  { id: "sydney", label: "Sydney", img: "/education/city-sydney.jpg", living: [30000, 38000] },
  { id: "brisbane", label: "Brisbane", img: "/education/city-brisbane.jpg", living: [26000, 32000] },
  { id: "adelaide", label: "Adelaide", img: "/education/city-adelaide.jpg", living: [24000, 30000] },
  { id: "perth", label: "Perth", img: "/education/city-perth.jpg", living: [26000, 32000] },
  { id: "regional", label: "Regional", img: "/education/city-regional.jpg", living: [22000, 28000] },
];

type Track = { steps: string[]; years: string; tuition: [number, number]; after: string };

const VET: [number, number] = [8000, 22000];
const BACH: [number, number] = [25000, 45000];
const MAST: [number, number] = [28000, 50000];

export function buildPlan(start: StartId, interest: InterestId): Track {
  const vetOnly = interest === "hospitality";
  if (start === "school") {
    return vetOnly
      ? { steps: ["English check", "Certificate IV", "Diploma", "Work & next steps"], years: "~2 years", tuition: VET, after: "Ask us which post-study options fit your course" }
      : { steps: ["English check", "Diploma pathway", "Bachelor (with credit)", "Graduate visa 485"], years: "~3 years", tuition: BACH, after: "Graduate visa 485 for many bachelor graduates" };
  }
  if (start === "diploma") {
    return vetOnly
      ? { steps: ["Credit check", "Advanced Diploma", "Work & next steps"], years: "~1 year", tuition: VET, after: "Ask us which post-study options fit your course" }
      : { steps: ["Credit check", "Bachelor (shortened)", "Graduate visa 485"], years: "1.5–2 years", tuition: BACH, after: "Graduate visa 485 for many bachelor graduates" };
  }
  if (start === "bachelor") {
    return { steps: ["Course match", "Master degree", "Graduate visa 485"], years: "1.5–2 years", tuition: MAST, after: "Graduate visa 485 for many master graduates" };
  }
  return { steps: ["Visa & course review", "Change or continue", "Extend visa 500", "Graduate visa 485"], years: "Depends on your case", tuition: vetOnly ? VET : BACH, after: "We check your current visa conditions first" };
}

/** Next Feb or Jul intake that is at least 4 months away. */
export function nextIntake(from: Date): string {
  const months = ["Feb", "Jul"];
  for (let add = 0; add < 24; add++) {
    const d = new Date(from.getFullYear(), from.getMonth() + add, 1);
    const m = d.getMonth();
    if ((m === 1 || m === 6) && add >= 4) return `${months[m === 1 ? 0 : 1]} ${d.getFullYear()}`;
  }
  return "Next intake";
}

/* Journey */
export const JOURNEY = [
  { n: "01", title: "Plan", img: "/education/life-study.jpg", line: "Find a course that fits your goal, budget and English level.", we: ["Course shortlist", "Credit transfer check", "Your pathway map"] },
  { n: "02", title: "Apply", img: "/education/life-friends.jpg", line: "Offer letter, CoE and your student visa, in the right order.", we: ["Applications", "Genuine Student answers", "Visa 500 lodgement"] },
  { n: "03", title: "Arrive", img: "/education/city-sydney.jpg", line: "Land with a plan, not a panic.", we: ["OSHC & arrival checklist", "First-week guide", "Someone to call"] },
  { n: "04", title: "Study & work", img: "/education/life-class.jpg", line: "Learn, work part-time and build your network.", we: ["Visa condition reminders", "Course change advice", "Extension help"] },
  { n: "05", title: "Graduate", img: "/education/life-graduate.jpg", line: "Turn your degree into your next step.", we: ["Graduate visa 485", "Skilled & sponsored options", "Long-term strategy"] },
];

/* Cities carousel */
export const CITY_CARDS = [
  { name: "Melbourne", img: "/education/city-melbourne.jpg", vibe: "Coffee, culture and the most course choice", tag: "VIC" },
  { name: "Sydney", img: "/education/city-sydney.jpg", vibe: "Harbour life and global careers", tag: "NSW" },
  { name: "Brisbane", img: "/education/city-brisbane.jpg", vibe: "Sunshine and a slower pace", tag: "QLD" },
  { name: "Adelaide", img: "/education/city-adelaide.jpg", vibe: "Calm, affordable and regional benefits", tag: "SA" },
  { name: "Perth", img: "/education/city-perth.jpg", vibe: "Beaches, big industry, regional benefits", tag: "WA" },
  { name: "Regional", img: "/education/city-regional.jpg", vibe: "Small classes and extra post-study time", tag: "Hobart & more" },
];

/* Myths */
export const MYTHS = [
  { myth: "I need a perfect IELTS score.", fact: "Many providers offer an English course packaged before your main course." },
  { myth: "Only rich families can study abroad.", fact: "You can work up to 48 hours a fortnight, and some providers offer scholarships." },
  { myth: "University is the only real option.", fact: "A TAFE or college diploma can lead into a bachelor with credit." },
  { myth: "After graduating, I have to go home.", fact: "Many graduates can apply for a Graduate visa (485) and keep working here." },
];

/* FAQ */
export const V2_FAQS: { q: string; a: string; link?: { href: string; label: string } }[] = [
  { q: "Is the first chat really free?", a: "Yes. Your first consultation is free and there is no obligation to continue." },
  { q: "Do you only work with expensive universities?", a: "No. We work with universities, TAFEs and private colleges, and match on your goal and budget." },
  { q: "Can you help if I'm already in Australia?", a: "Yes. We help with course changes, visa extensions and planning after graduation." },
  { q: "How long does the student visa take?", a: "It varies by country and case, so apply early.", link: { href: "/tools/visa-processing-times", label: "Check current processing times" } },
  { q: "What languages do you speak?", a: "English, Bahasa, Mandarin, Cantonese, Tagalog, Malay, Sinhalese, Hindi, Punjabi and more." },
];

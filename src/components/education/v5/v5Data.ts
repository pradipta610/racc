/* Content for /study-in-australia/v5: education only. Awareness + trust first, then lead capture.
   Every proof point here is checkable (MARN on OMARA, office address, Google rating). */

import {
  GraduationCap, School, FileCheck, Stamp, Briefcase, Languages, BookOpen, Award, Compass, MapPin,
  type LucideIcon,
} from "lucide-react";

export const V5_LINKS = [
  { id: "start", label: "Start here" },
  { id: "believe", label: "What we believe" },
  { id: "credentials", label: "Credentials" },
  { id: "compare", label: "How we help" },
  { id: "office", label: "Visit us" },
  { id: "check", label: "Free profile check" },
];

export const OMARA_URL = "https://portal.mara.gov.au/search-the-register-of-migration-agents/";
export const MARNS = ["1572961", "1172003"];

/* "Start here" explainer for students who are completely new */
export const HOW: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: GraduationCap, title: "Choose your study level", sub: "Certificate, diploma, bachelor or master." },
  { icon: School, title: "Pick a course and school", sub: "University, TAFE or college, in a city you like." },
  { icon: FileCheck, title: "Apply and get an offer", sub: "The school sends an offer letter, then your CoE." },
  { icon: Stamp, title: "Get your student visa", sub: "It lets you study full-time and work part-time." },
  { icon: Briefcase, title: "Study, work and graduate", sub: "Many graduates can stay and work afterwards." },
];

export const STUDY_LEVELS = [
  { label: "Certificate", time: "6–12 months", w: 30 },
  { label: "Diploma", time: "1–2 years", w: 50 },
  { label: "Bachelor", time: "3 years", w: 75 },
  { label: "Master", time: "1.5–2 years", w: 60 },
];

export type V5Route = { id: string; icon: LucideIcon; chip: string; steps: { icon: LucideIcon; label: string; time: string }[] };
export const V5_ROUTES: V5Route[] = [
  {
    id: "school", icon: School, chip: "I finished high school",
    steps: [
      { icon: Languages, label: "English test", time: "IELTS / PTE" },
      { icon: BookOpen, label: "Foundation or diploma", time: "~1 year" },
      { icon: GraduationCap, label: "Bachelor degree", time: "2–3 years" },
      { icon: Briefcase, label: "Graduate & work", time: "Visa 485" },
    ],
  },
  {
    id: "diploma", icon: FileCheck, chip: "I have a diploma",
    steps: [
      { icon: Stamp, label: "Credit transfer check", time: "Saves time" },
      { icon: GraduationCap, label: "Shortened bachelor", time: "1.5–2 years" },
      { icon: Briefcase, label: "Graduate & work", time: "Visa 485" },
    ],
  },
  {
    id: "bachelor", icon: GraduationCap, chip: "I have a bachelor",
    steps: [
      { icon: Compass, label: "Course match", time: "Free" },
      { icon: Award, label: "Master degree", time: "1.5–2 years" },
      { icon: Briefcase, label: "Graduate & work", time: "Visa 485" },
    ],
  },
  {
    id: "onshore", icon: MapPin, chip: "I'm already in Australia",
    steps: [
      { icon: Compass, label: "Review your course", time: "Free check" },
      { icon: BookOpen, label: "Change course or school", time: "If needed" },
      { icon: Stamp, label: "Extend your student visa", time: "Onshore" },
      { icon: Briefcase, label: "Graduate & work", time: "Visa 485" },
    ],
  },
];

export const GLOSSARY = [
  { term: "CoE", full: "Confirmation of Enrolment", def: "Proof from your school that you're enrolled. You need it to apply for your visa." },
  { term: "Visa 500", full: "Student visa", def: "Lets you study full-time in Australia and work part-time." },
  { term: "OSHC", full: "Overseas Student Health Cover", def: "Health insurance every international student must have." },
  { term: "GS", full: "Genuine Student", def: "Short answers that show you really plan to study." },
  { term: "TAFE", full: "Technical and Further Education", def: "Government colleges with practical, job-focused courses." },
  { term: "Visa 485", full: "Graduate visa", def: "Lets many graduates stay and work after they finish studying." },
];

/* Education-only footer links */
export const EDU_FOOTER_LINKS = [
  { label: "Pathway Courses", href: "https://www.racc.net.au/migration-and-study-options-popular-occupations-australia" },
  { label: "Diploma Courses", href: "https://www.racc.net.au/diploma-courses-melbourne" },
  { label: "Bachelor Courses", href: "https://www.racc.net.au/bachelor-courses-melbourne" },
  { label: "Master Courses", href: "https://www.racc.net.au/master-courses-melbourne" },
  { label: "PTE Training", href: "https://www.racc.net.au/pte-training-course" },
  { label: "Student Visa", href: "https://www.racc.net.au/student-visa" },
];

export const OFFICE = {
  line1: "343 Little Collins St, Level 7",
  line2: "Melbourne VIC 3000",
  hours: "Mon–Fri, 9am–6pm",
  phone: "+61 420 746 705",
  phoneHref: "tel:+61420746705",
  email: "info@racc.net.au",
  map: "https://www.google.com/maps?q=343+Little+Collins+St,+Melbourne+VIC+3000&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=343+Little+Collins+St+Melbourne+VIC+3000",
};

/* Greetings in the languages the team speaks */
export const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Halo", lang: "Bahasa Indonesia" },
  { word: "你好", lang: "Mandarin" },
  { word: "早晨", lang: "Cantonese" },
  { word: "Kumusta", lang: "Tagalog" },
  { word: "Apa khabar", lang: "Malay" },
  { word: "ආයුබෝවන්", lang: "Sinhalese" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
];

export const BELIEFS = [
  { n: "01", title: "Honest before hopeful.", sub: "If a plan won't work, we'll tell you, and show you one that will." },
  { n: "02", title: "One team, one story.", sub: "Course advice and visa advice in the same office. You never repeat yourself." },
  { n: "03", title: "Your language, your pace.", sub: "Ask everything, in the language you think in. No question is too small." },
];

export const COMPARE = [
  { topic: "Choosing a course", alone: "Comparing hundreds of websites", racc: "A shortlist that fits your goal and budget" },
  { topic: "Applications", alone: "Different forms for every school", racc: "We apply for you, at no cost" },
  { topic: "Student visa", alone: "Guessing what counts as evidence", racc: "Prepared by our registered agents" },
  { topic: "After you graduate", alone: "Figuring it out at the last minute", racc: "Planned from day one" },
  { topic: "When something changes", alone: "Searching forums at midnight", racc: "A person who already knows your file" },
];

/* Lead wizard */
export const NEEDS = ["Studying in Australia", "A student visa", "Both", "Not sure yet"];
export const WHERE = ["Indonesia", "India", "Philippines", "China / Hong Kong", "Malaysia", "Sri Lanka", "Nepal", "Already in Australia", "Other"];
export const EDU = ["High school", "Diploma", "Bachelor", "Master or higher"];

export const V5_FAQS = [
  { q: "Are you really registered?", a: "Yes. The agents who prepare student visas hold MARNs 1572961 and 1172003. You can check both on the government's OMARA register." },
  { q: "Do students pay for course applications?", a: "No. Course applications to universities, TAFEs and colleges are free. Student visa fees are quoted upfront before you commit." },
  { q: "What happens after the profile check?", a: "Our team looks at your details and contacts you on WhatsApp with honest options, including if now isn't the right time." },
  { q: "Can I meet you in person?", a: "Yes. Our office is at 343 Little Collins St in Melbourne's CBD. We also meet online if you're overseas." },
];

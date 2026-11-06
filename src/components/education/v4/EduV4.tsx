"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, MessageCircle, Star, Check, FileCheck, Stamp, Languages, CalendarCheck, Plane, Sparkles, X as XIcon,
  Compass, GraduationCap, ShieldCheck, Clock, HeartHandshake, MapPin, Wallet, UserRound, LifeBuoy,
} from "lucide-react";
import LOGO from "@/lib/logo";
import { CONSULTATION_URL, WHATSAPP_URL } from "../eduData";

const serif = "var(--font-playfair), 'Playfair Display', serif";
const WA_MSG = `${WHATSAPP_URL}?text=${encodeURIComponent("Hi RACC, I'd like a free consultation about studying in Australia.")}`;

const STEPS = [
  { icon: CalendarCheck, title: "Free consultation", sub: "Tell us your goal. We suggest the right course." },
  { icon: FileCheck, title: "We apply for you", sub: "Application, offer letter and student visa." },
  { icon: Plane, title: "You fly to Australia", sub: "Start your course. We're still here if you need us." },
];

/* "Doing it alone vs with RACC": grouped by stage so each row lands as a small "that's so true" moment */
const COMPARE: { stage: string; rows: { topic: string; alone: string; racc: string }[] }[] = [
  {
    stage: "Before you apply",
    rows: [
      { topic: "Choosing a course", alone: "Comparing hundreds of websites", racc: "A shortlist that fits your goal and budget" },
      { topic: "Entry requirements", alone: "Not sure if your grades or IELTS are enough", racc: "We check before you spend a cent" },
      { topic: "Choosing a city", alone: "Picking from nice photos", racc: "Honest pros, cons and living costs" },
      { topic: "Total cost", alone: "Surprise fees after you've paid", racc: "Every cost listed before you decide" },
    ],
  },
  {
    stage: "Applying",
    rows: [
      { topic: "Applications", alone: "A different form for every school", racc: "We apply for you, at no cost" },
      { topic: "Past study", alone: "Starting again from zero", racc: "We ask for credit so you finish sooner" },
      { topic: "Offer letters", alone: "Unsure which offer to accept", racc: "We compare offers with you" },
    ],
  },
  {
    stage: "Visa & departure",
    rows: [
      { topic: "Student visa", alone: "Guessing what counts as evidence", racc: "Prepared by our registered agents" },
      { topic: "Genuine Student answers", alone: "Copying templates from the internet", racc: "Your own story, written clearly" },
      { topic: "Health cover", alone: "Buying the wrong policy", racc: "Set up correctly with your enrolment" },
    ],
  },
  {
    stage: "Once you're in Australia",
    rows: [
      { topic: "When something changes", alone: "Searching forums at midnight", racc: "A person who already knows your file" },
      { topic: "After you graduate", alone: "Figuring it out at the last minute", racc: "Planned from day one" },
    ],
  },
];

function Compare() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const total = COMPARE.reduce((n, g) => n + g.rows.length, 0);
  return (
    <section className="v4-sec v4-sec-off v4-cmp-sec">
      <div className="v4-wrap">
        <h2 className="v4-h2 v4-h2-tight" style={{ fontFamily: serif }}>Doing it alone vs. doing it with us</h2>
        <p className="v4-sub">Plenty of students apply on their own. Tap the ones that sound like you.</p>

        <div className="v4-cmp-head" aria-hidden="true">
          <span />
          <span className="is-alone"><XIcon size={14} /> On your own</span>
          <span className="is-racc"><Check size={14} /> With RACC</span>
        </div>

        {COMPARE.map((g) => (
          <div key={g.stage} className="v4-cmp-group">
            <span className="v4-cmp-stage">{g.stage}</span>
            {g.rows.map((r) => {
              const on = picked.includes(r.topic);
              return (
                <button key={r.topic} type="button" className={`v4-cmp-row${on ? " is-picked" : ""}`} aria-pressed={on} onClick={() => toggle(r.topic)}>
                  <strong>{r.topic}</strong>
                  <span className="v4-cmp-alone"><XIcon size={16} /> {r.alone}</span>
                  <span className="v4-cmp-racc"><Check size={16} /> {r.racc}</span>
                  <span className="v4-cmp-tick" aria-hidden="true">{on ? <Check size={14} /> : null}</span>
                </button>
              );
            })}
          </div>
        ))}

        <div className={`v4-cmp-result${picked.length ? " is-on" : ""}`} aria-live="polite">
          {picked.length ? (
            <>
              <p><strong>You picked {picked.length} of {total}.</strong> That&apos;s exactly what the free consultation is for.</p>
              <Link href={CONSULTATION_URL} className="v4-btn v4-btn-main">Book free consultation <ArrowRight size={18} /></Link>
            </>
          ) : (
            <p>{total} things you don&apos;t have to figure out alone.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* The student's education journey, start to finish */
const JOURNEY = [
  { icon: Sparkles, title: "Dream", sub: "Decide what you want to study, and why." },
  { icon: Compass, title: "Explore", sub: "Compare courses, schools and cities." },
  { icon: FileCheck, title: "Apply", sub: "Send applications and receive offers." },
  { icon: Stamp, title: "Visa", sub: "Get your CoE, health cover and student visa." },
  { icon: Plane, title: "Arrive", sub: "Land, settle in and start classes." },
  { icon: GraduationCap, title: "Graduate", sub: "Finish your course and plan what's next." },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="v4-journey">
      <div className="v4-wrap">
        <span className="v4-kicker is-light">Your education journey</span>
        <h2 className="v4-h2 is-light" style={{ fontFamily: serif }}>Six stages from dream to graduation</h2>
        <p className="v4-sub is-light">Every international student goes through these. You don&apos;t have to do any of them alone.</p>
        <div ref={ref} className={`v4-jr${on ? " is-on" : ""}`}>
          <div className="v4-jr-line" aria-hidden="true"><span /></div>
          <ol>
            {JOURNEY.map(({ icon: Icon, title, sub }, i) => (
              <li key={title} style={{ transitionDelay: `${0.2 + i * 0.18}s` }}>
                <span className="v4-jr-dot"><Icon size={22} /></span>
                <em>Stage {i + 1}</em>
                <strong style={{ fontFamily: serif }}>{title}</strong>
                <p>{sub}</p>
              </li>
            ))}
          </ol>
          <div className="v4-jr-with"><Check size={16} /> RACC is with you at every stage</div>
        </div>
      </div>
    </section>
  );
}

/* What sets RACC apart from other agents */
const DIFFERENT = [
  { icon: ShieldCheck, title: "Education and visa under one roof", sub: "Not every education agent can prepare student visas. Our registered agents can (MARN 1572961 · 1172003).", big: true },
  { icon: Clock, title: "20+ years in Melbourne", sub: "We've watched courses and visa rules change, and we plan around it." },
  { icon: Languages, title: "Advice in 12+ languages", sub: "Bahasa, Mandarin, Cantonese, Tagalog, Hindi, Punjabi and more." },
  { icon: HeartHandshake, title: "Honest, even when it's \"not yet\"", sub: "If a plan won't work, we tell you, and show you one that will." },
  { icon: MapPin, title: "A real office in Melbourne CBD", sub: "Support doesn't stop when you land. Drop by any time." },
];

function Different() {
  return (
    <section className="v4-sec">
      <div className="v4-wrap">
        <span className="v4-kicker">What makes RACC different</span>
        <h2 className="v4-h2 v4-h2-tight" style={{ fontFamily: serif }}>Not just another education agent</h2>
        <p className="v4-sub">Plenty of agents can send an application. Here&apos;s what you won&apos;t find everywhere.</p>
        <div className="v4-diff">
          {DIFFERENT.map(({ icon: Icon, title, sub, big }) => (
            <div key={title} className={`v4-diff-card${big ? " is-big" : ""}`}>
              <span className="v4-diff-icon"><Icon size={big ? 28 : 22} /></span>
              <strong style={big ? { fontFamily: serif } : undefined}>{title}</strong>
              <p>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Why apply through RACC */
const WHY = [
  { icon: Wallet, title: "It costs you nothing", sub: "Course applications through us are free." },
  { icon: FileCheck, title: "Done right the first time", sub: "Complete documents, so schools don't send them back." },
  { icon: Stamp, title: "Visa-ready from day one", sub: "We pick courses with your student visa in mind." },
  { icon: UserRound, title: "One person, start to finish", sub: "The same advisor from your first chat to your first class." },
  { icon: LifeBuoy, title: "Still here after you land", sub: "Course changes, extensions, questions. Just message us." },
];

function WhyApply() {
  return (
    <section className="v4-sec v4-sec-off">
      <div className="v4-wrap v4-get-grid">
        <div className="v4-get-photo">
          <Image src="/education/life-graduate.jpg" alt="Graduates throwing their caps" fill sizes="(max-width: 900px) 100vw, 520px" />
          <div className="v4-get-badge"><strong style={{ fontFamily: serif }}>20+</strong><span>years helping students</span></div>
        </div>
        <div>
          <span className="v4-kicker">Why apply with us</span>
          <h2 className="v4-h2 is-left" style={{ fontFamily: serif }}>Five reasons students apply through RACC</h2>
          <ol className="v4-why">
            {WHY.map(({ icon: Icon, title, sub }, i) => (
              <li key={title}>
                <span className="v4-why-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="v4-why-icon"><Icon size={20} /></span>
                <div><strong>{title}</strong><p>{sub}</p></div>
              </li>
            ))}
          </ol>
          <Link href={CONSULTATION_URL} className="v4-btn v4-btn-main">Book free consultation <ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>
  );
}

function CTAButtons({ center = false }: { center?: boolean }) {
  return (
    <div className={`v4-ctas${center ? " is-center" : ""}`}>
      <Link href={CONSULTATION_URL} className="v4-btn v4-btn-main">Book free consultation <ArrowRight size={18} /></Link>
      <a href={WA_MSG} target="_blank" rel="noopener noreferrer" className="v4-btn v4-btn-wa"><MessageCircle size={18} /> Chat on WhatsApp</a>
    </div>
  );
}

export default function EduV4() {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const final = document.querySelector(".v4-final");
    const cmp = document.querySelector(".v4-cmp-sec");
    const onScroll = () => {
      // Show after the hero buttons scroll away. Hide while the comparison section (it has its own
      // sticky CTA) or the final CTA is on screen.
      const vh = window.innerHeight;
      const finalTop = final ? final.getBoundingClientRect().top : Infinity;
      const c = cmp?.getBoundingClientRect();
      const inCompare = c ? c.top < vh - 80 && c.bottom > 80 : false;
      setShowBar(window.scrollY > 520 && finalTop > vh - 40 && !inCompare);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <>
      {/* Minimal nav: logo + one action */}
      <header className="v4-nav">
        <div className="v4-wrap v4-nav-inner">
          <a href="#top" aria-label="RACC Australia"><Image src={LOGO} alt="RACC Australia" width={150} height={44} style={{ objectFit: "contain" }} priority /></a>
          <Link href={CONSULTATION_URL} className="v4-btn v4-btn-main v4-btn-sm">Free consultation</Link>
        </div>
      </header>

      <main id="top">
        {/* HERO: what, who, why, action in one view */}
        <section className="v4-hero">
          <div className="v4-wrap v4-hero-grid">
            <div className="v4-hero-copy">
              <span className="v4-pill"><Sparkles size={14} /> First consultation is free</span>
              <h1 style={{ fontFamily: serif }}>
                Want to study in Australia?<br /><em>We&apos;ll handle it.</em>
              </h1>
              <p className="v4-lead">Course, application and student visa. One team helps you from start to finish.</p>
              <CTAButtons />
              <div className="v4-proof">
                <div className="v4-proof-stars" aria-label="Rated 4.8 out of 5">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span><strong>4.8</strong> from 800+ Google reviews · 20+ years helping students</span>
              </div>
            </div>

            <div className="v4-hero-visual">
              <div className="v4-photo">
                <Image src="/education/hero-students.jpg" alt="Smiling international students sitting together" fill priority sizes="(max-width: 900px) 100vw, 560px" />
              </div>
              <div className="v4-float v4-float-a">
                <span className="v4-float-icon"><Check size={18} /></span>
                <div><strong>Course application</strong><span>We apply to the school for you</span></div>
              </div>
              <div className="v4-float v4-float-b">
                <span className="v4-float-icon is-yellow"><Stamp size={18} /></span>
                <div><strong>Student visa</strong><span>Handled by registered agents</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION JOURNEY */}
        <Journey />

        {/* 3 STEPS */}
        <section className="v4-sec">
          <div className="v4-wrap">
            <h2 className="v4-h2" style={{ fontFamily: serif }}>It&apos;s this simple</h2>
            <ol className="v4-steps">
              {STEPS.map(({ icon: Icon, title, sub }, i) => (
                <li key={title} className="v4-step">
                  <div className="v4-step-icon"><Icon size={28} /><span>{i + 1}</span></div>
                  <strong>{title}</strong>
                  <p>{sub}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ALONE VS WITH RACC */}
        <Compare />

        {/* WHAT MAKES RACC DIFFERENT */}
        <Different />

        {/* WHY APPLY WITH US */}
        <WhyApply />

        {/* FINAL CTA */}
        <section className="v4-final">
          <div className="v4-wrap v4-final-inner">
            <h2 style={{ fontFamily: serif }}>Your first step is a free chat.</h2>
            <p>No cost. No obligation. Just clear answers about studying in Australia.</p>
            <CTAButtons center />
            <span className="v4-final-small">Student visas by registered agents · MARN 1572961 · 1172003</span>
          </div>
        </section>
      </main>

      {/* Sticky action bar once the hero buttons scroll away */}
      <div className={`v4-bar${showBar ? " is-on" : ""}`} aria-hidden={!showBar}>
        <span className="v4-bar-text"><strong>Free consultation</strong> · no obligation</span>
        <Link href={CONSULTATION_URL} className="v4-btn v4-btn-main v4-btn-sm" tabIndex={showBar ? 0 : -1}>Book now <ArrowRight size={16} /></Link>
        <a href={WA_MSG} target="_blank" rel="noopener noreferrer" className="v4-btn v4-btn-wa v4-btn-sm v4-bar-wa" aria-label="Chat on WhatsApp" tabIndex={showBar ? 0 : -1}><MessageCircle size={18} /></a>
      </div>

      <style>{CSS}</style>
    </>
  );
}

const CSS = `
.v4-wrap { max-width: 1160px; margin: 0 auto; padding: 0 5%; }

/* Buttons */
.v4-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 16px 26px; border-radius: 12px; font-weight: 700; font-size: 16px; text-decoration: none; transition: transform .2s, box-shadow .2s, background .2s; white-space: nowrap; }
.v4-btn:focus-visible { outline: 3px solid var(--sky); outline-offset: 3px; }
.v4-btn-sm { padding: 11px 18px; font-size: 14px; }
.v4-btn-main { background: #eddb3c; color: var(--navy); box-shadow: 0 8px 20px rgba(212,168,0,.25); }
.v4-btn-main:hover { background: #e2cf35; transform: translateY(-2px); box-shadow: 0 14px 28px rgba(212,168,0,.35); }
.v4-btn-wa { background: #fff; color: var(--navy); border: 2px solid var(--border); }
.v4-btn-wa:hover { border-color: #25D366; color: #128C4A; }
.v4-btn-wa svg { color: #25D366; }
.v4-ctas { display: flex; flex-wrap: wrap; gap: 12px; }
.v4-ctas.is-center { justify-content: center; }

/* Nav */
.v4-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
.v4-nav-inner { height: 68px; display: flex; align-items: center; justify-content: space-between; }

/* Hero */
.v4-hero { background: linear-gradient(180deg, #fff 0%, var(--off) 100%); padding: 56px 0 80px; overflow: hidden; }
.v4-hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 56px; align-items: center; }
.v4-hero-copy > * { animation: v4Up .7s cubic-bezier(.2,.7,.2,1) both; }
.v4-hero-copy > *:nth-child(2) { animation-delay: .08s; }
.v4-hero-copy > *:nth-child(3) { animation-delay: .16s; }
.v4-hero-copy > *:nth-child(4) { animation-delay: .24s; }
.v4-hero-copy > *:nth-child(5) { animation-delay: .32s; }
@keyframes v4Up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
.v4-pill { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: var(--navy); background: rgba(245,197,24,.22); padding: 7px 14px; border-radius: 30px; }
.v4-hero h1 { font-size: clamp(38px, 5vw, 64px); line-height: 1.08; letter-spacing: -1px; color: var(--navy); margin: 18px 0 18px; }
.v4-hero h1 em { font-style: normal; color: var(--blue); position: relative; white-space: nowrap; }
.v4-hero h1 em::after { content: ""; position: absolute; left: 0; right: 0; bottom: 4px; height: 12px; background: var(--yellow); opacity: .5; z-index: -1; border-radius: 4px; transform-origin: left; animation: v4Mark .8s .6s cubic-bezier(.2,.7,.2,1) both; }
@keyframes v4Mark { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.v4-lead { font-size: 19px; line-height: 1.6; color: var(--tm); max-width: 480px; margin-bottom: 28px; }
.v4-proof { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 26px; font-size: 14px; color: var(--tm); }
.v4-proof-stars { display: flex; gap: 2px; color: var(--yellow); }
.v4-proof strong { color: var(--navy); }

.v4-hero-visual { position: relative; }
.v4-photo { position: relative; aspect-ratio: 4 / 4.4; border-radius: 32px 32px 32px 120px; overflow: hidden; box-shadow: 0 30px 60px rgba(15,30,69,.18); animation: v4Up .9s .1s cubic-bezier(.2,.7,.2,1) both; }
.v4-photo img { object-fit: cover; object-position: center 72%; }
.v4-float { position: absolute; display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 16px; padding: 12px 16px; box-shadow: 0 16px 36px rgba(15,30,69,.16); animation: v4Float 5s ease-in-out infinite, v4Up .8s cubic-bezier(.2,.7,.2,1) both; }
.v4-float strong { display: block; font-size: 14px; color: var(--td); }
.v4-float span:not(.v4-float-icon) { font-size: 12px; color: var(--tl); }
.v4-float-a { left: -28px; top: 18%; animation-delay: 0s, .5s; }
.v4-float-b { right: -20px; bottom: 12%; animation-delay: -2.5s, .8s; }
.v4-float-icon { width: 36px; height: 36px; border-radius: 50%; display: grid; place-items: center; background: #E6F7EE; color: #1F9D57; flex-shrink: 0; }
.v4-float-icon.is-yellow { background: var(--yellow); color: var(--navy); }
@keyframes v4Float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -8px; } }

/* Sections */
.v4-sec { padding: 96px 0; background: #fff; }
.v4-sec-off { background: var(--off); }
.v4-h2 { font-size: clamp(30px, 3.6vw, 44px); line-height: 1.15; color: var(--navy); text-align: center; margin-bottom: 52px; }
.v4-h2.is-left { text-align: left; margin-bottom: 28px; }

/* Steps */
.v4-steps { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; position: relative; }
.v4-steps::before { content: ""; position: absolute; top: 44px; left: 16%; right: 16%; border-top: 3px dashed var(--border); }
.v4-step { position: relative; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.v4-step-icon { position: relative; width: 88px; height: 88px; border-radius: 26px; background: var(--navy); color: #fff; display: grid; place-items: center; box-shadow: 0 14px 30px rgba(28,58,138,.22); margin-bottom: 8px; }
.v4-step:last-child .v4-step-icon { background: var(--yellow); color: var(--navy); }
.v4-step-icon span { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 50%; background: #fff; color: var(--navy); border: 2px solid var(--navy); font-size: 13px; font-weight: 800; display: grid; place-items: center; }
.v4-step strong { font-size: 20px; color: var(--td); }
.v4-step p { font-size: 16px; color: var(--tm); line-height: 1.55; max-width: 280px; }

.v4-kicker { display: block; text-align: center; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
.v4-kicker.is-light { color: var(--yellow); }
.v4-h2.is-light { color: #fff; margin-bottom: 12px; }
.v4-sub.is-light { color: rgba(255,255,255,.75); }

/* Journey */
.v4-journey { background: radial-gradient(ellipse at 50% 0%, #16357a, #0b1f4a 65%); color: #fff; padding: 96px 0; overflow: hidden; }
.v4-jr { position: relative; margin-top: 12px; }
.v4-jr-line { position: absolute; top: 31px; left: 8%; right: 8%; height: 3px; background: rgba(255,255,255,.12); border-radius: 3px; }
.v4-jr-line span { display: block; height: 100%; background: var(--yellow); border-radius: 3px; transform-origin: left; transform: scaleX(0); transition: transform 1.6s cubic-bezier(.2,.7,.2,1) .2s; }
.v4-jr.is-on .v4-jr-line span { transform: scaleX(1); }
.v4-jr ol { list-style: none; display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; position: relative; }
.v4-jr li { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.v4-jr.is-on li { opacity: 1; transform: none; }
.v4-jr-dot { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: #0b1f4a; border: 3px solid var(--yellow); color: var(--yellow); margin-bottom: 10px; box-shadow: 0 0 0 6px rgba(245,197,24,.12); }
.v4-jr li:last-child .v4-jr-dot { background: var(--yellow); color: var(--navy); }
.v4-jr em { font-style: normal; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.5); }
.v4-jr strong { font-size: 24px; }
.v4-jr p { font-size: 14px; color: rgba(255,255,255,.72); line-height: 1.5; max-width: 170px; }
.v4-jr-with { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 36px auto 0; width: fit-content; padding: 10px 18px; border-radius: 30px; background: rgba(245,197,24,.14); color: var(--yellow); font-size: 14px; font-weight: 700; }

/* Different */
.v4-diff { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(170px, auto); gap: 16px; }
.v4-diff-card { background: var(--off); border: 1px solid var(--border); border-radius: 22px; padding: 26px; display: flex; flex-direction: column; gap: 8px; transition: transform .2s, box-shadow .2s; }
.v4-diff-card:hover { transform: translateY(-3px); box-shadow: 0 16px 32px rgba(28,58,138,.1); }
.v4-diff-icon { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; background: #fff; color: var(--navy); margin-bottom: 8px; box-shadow: 0 6px 14px rgba(28,58,138,.08); }
.v4-diff-card strong { font-size: 18px; color: var(--td); line-height: 1.3; }
.v4-diff-card p { font-size: 15px; color: var(--tm); line-height: 1.55; }
.v4-diff-card.is-big { grid-row: span 2; background: var(--navy); border-color: var(--navy); justify-content: flex-end; }
.v4-diff-card.is-big .v4-diff-icon { width: 60px; height: 60px; background: var(--yellow); margin-bottom: auto; }
.v4-diff-card.is-big strong { font-size: 32px; color: #fff; line-height: 1.15; }
.v4-diff-card.is-big p { color: rgba(255,255,255,.75); font-size: 16px; }

/* Why apply */
.v4-why { list-style: none; display: flex; flex-direction: column; gap: 4px; margin-bottom: 28px; }
.v4-why li { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); }
.v4-why-n { font-size: 13px; font-weight: 800; color: var(--blue); width: 22px; }
.v4-why-icon { width: 42px; height: 42px; flex-shrink: 0; border-radius: 12px; display: grid; place-items: center; background: #fff; color: var(--navy); border: 1px solid var(--border); }
.v4-why strong { display: block; font-size: 16px; color: var(--td); }
.v4-why p { font-size: 14px; color: var(--tm); }
.v4-get-grid .v4-kicker { text-align: left; }

/* Compare */
.v4-h2-tight { margin-bottom: 12px; }
.v4-sub { text-align: center; font-size: 17px; color: var(--tm); margin-bottom: 40px; }
.v4-cmp-head, .v4-cmp-row { display: grid; grid-template-columns: 0.9fr 1.2fr 1.3fr 28px; gap: 16px; align-items: center; }
.v4-cmp-head { max-width: 1000px; margin: 0 auto 8px; padding: 0 22px; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
.v4-cmp-head span { display: inline-flex; align-items: center; gap: 6px; }
.v4-cmp-head .is-alone { color: #c25454; }
.v4-cmp-head .is-racc { color: #1F9D57; }
.v4-cmp-group { max-width: 1000px; margin: 0 auto 22px; display: flex; flex-direction: column; gap: 8px; }
.v4-cmp-stage { font-size: 13px; font-weight: 700; color: var(--blue); padding: 10px 22px 2px; }
.v4-cmp-row { width: 100%; text-align: left; font: inherit; padding: 18px 22px; border-radius: 16px; background: #fff; border: 1.5px solid var(--border); cursor: pointer; transition: border-color .2s, box-shadow .2s, transform .2s, background .2s; }
.v4-cmp-row:hover { border-color: var(--sky); transform: translateY(-2px); box-shadow: 0 12px 26px rgba(28,58,138,.08); }
.v4-cmp-row:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
.v4-cmp-row strong { font-size: 16px; color: var(--td); }
.v4-cmp-alone, .v4-cmp-racc { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; line-height: 1.45; }
.v4-cmp-alone { color: var(--tl); }
.v4-cmp-alone svg { color: #d06464; flex-shrink: 0; margin-top: 2px; }
.v4-cmp-racc { color: var(--td); font-weight: 600; }
.v4-cmp-racc svg { color: #fff; background: #1F9D57; border-radius: 50%; padding: 2px; flex-shrink: 0; margin-top: 1px; }
.v4-cmp-tick { width: 26px; height: 26px; border-radius: 8px; border: 2px solid var(--border); display: grid; place-items: center; color: var(--navy); transition: all .2s; }
.v4-cmp-row.is-picked { border-color: var(--yellow); background: #FFFBEA; }
.v4-cmp-row.is-picked .v4-cmp-alone { text-decoration: line-through; text-decoration-color: rgba(208,100,100,.6); }
.v4-cmp-row.is-picked .v4-cmp-tick { background: var(--yellow); border-color: var(--yellow); }
.v4-cmp-result { position: sticky; bottom: 18px; z-index: 5; max-width: 1000px; margin: 28px auto 0; display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; padding: 18px 22px; border-radius: 18px; background: var(--navy); color: rgba(255,255,255,.85); text-align: center; font-size: 16px; transition: box-shadow .3s; }
.v4-cmp-result.is-on { box-shadow: 0 18px 40px rgba(15,30,69,.3); }
.v4-cmp-result strong { color: var(--yellow); }

/* What you get */
.v4-get-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 64px; align-items: center; }
.v4-get-photo { position: relative; aspect-ratio: 1 / 1.05; border-radius: 28px; overflow: hidden; }
.v4-get-photo img { object-fit: cover; }
.v4-get-badge { position: absolute; left: 20px; bottom: 20px; background: var(--navy); color: #fff; border-radius: 18px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; }
.v4-get-badge strong { font-size: 40px; color: var(--yellow); line-height: 1; }
.v4-get-badge span { font-size: 14px; max-width: 90px; line-height: 1.3; }
.v4-gets { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.v4-get { display: flex; gap: 14px; align-items: flex-start; background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 20px; transition: transform .2s, box-shadow .2s; }
.v4-get:hover { transform: translateY(-3px); box-shadow: 0 14px 28px rgba(28,58,138,.1); }
.v4-get > span { width: 46px; height: 46px; flex-shrink: 0; border-radius: 13px; background: var(--light); color: var(--navy); display: grid; place-items: center; }
.v4-get strong { display: block; font-size: 17px; color: var(--td); margin-bottom: 4px; }
.v4-get p { font-size: 14px; color: var(--tm); line-height: 1.45; }

/* Final */
.v4-final { background: radial-gradient(ellipse at 50% 0%, var(--blue), var(--navy) 60%); padding: 104px 0 120px; color: #fff; text-align: center; }
.v4-final-inner { display: flex; flex-direction: column; align-items: center; }
.v4-final h2 { font-size: clamp(32px, 4.4vw, 54px); line-height: 1.12; margin-bottom: 14px; }
.v4-final p { font-size: 18px; color: rgba(255,255,255,.8); margin-bottom: 32px; max-width: 520px; }
.v4-final .v4-btn-wa { background: transparent; color: #fff; border-color: rgba(255,255,255,.4); }
.v4-final .v4-btn-wa:hover { border-color: #25D366; color: #fff; }
.v4-final-small { margin-top: 26px; font-size: 12px; color: rgba(255,255,255,.55); }

/* Sticky bar */
.v4-bar { position: fixed; left: 50%; bottom: 18px; z-index: 90; display: flex; align-items: center; gap: 14px; background: var(--navy); color: #fff; padding: 10px 10px 10px 22px; border-radius: 18px; box-shadow: 0 18px 40px rgba(15,30,69,.35); transform: translate(-50%, 140%); transition: transform .4s cubic-bezier(.2,.7,.2,1); }
.v4-bar.is-on { transform: translate(-50%, 0); }
.v4-bar-text { font-size: 14px; color: rgba(255,255,255,.8); white-space: nowrap; }
.v4-bar-text strong { color: #fff; }
.v4-bar-wa { padding: 11px 13px; background: #25D366; border: none; }
.v4-bar-wa svg { color: #fff; }
.v4-bar-wa:hover { background: #1fb457; }

@media (prefers-reduced-motion: reduce) {
  .v4-hero-copy > *, .v4-photo, .v4-float, .v4-hero h1 em::after { animation: none !important; }
}

@media (max-width: 900px) {
  .v4-hero { padding: 32px 0 64px; }
  .v4-hero-grid, .v4-get-grid { grid-template-columns: 1fr; gap: 40px; }
  .v4-hero-visual { max-width: 460px; margin: 0 auto; width: 100%; }
  .v4-float-a { left: -6px; }
  .v4-float-b { right: -6px; }
  .v4-get-photo { aspect-ratio: 16 / 10; }
  .v4-jr ol { grid-template-columns: repeat(3, 1fr); row-gap: 36px; }
  .v4-jr-line { display: none; }
  .v4-diff { grid-template-columns: repeat(2, 1fr); }
  .v4-diff-card.is-big { grid-column: 1 / 3; grid-row: auto; min-height: 240px; }
}

@media (max-width: 640px) {
  .v4-hero h1 em { white-space: normal; }
  .v4-lead { font-size: 17px; }
  .v4-ctas { flex-direction: column; }
  .v4-btn { width: 100%; }
  .v4-nav .v4-btn { width: auto; }
  .v4-sec { padding: 72px 0; }
  .v4-h2 { margin-bottom: 36px; }
  .v4-steps { grid-template-columns: 1fr; gap: 36px; }
  .v4-steps::before { display: none; }
  .v4-gets { grid-template-columns: 1fr; }
  .v4-cmp-head { display: none; }
  .v4-journey { padding: 72px 0; }
  .v4-jr ol { grid-template-columns: 1fr; gap: 0; max-width: 360px; margin: 0 auto; }
  .v4-jr li { display: grid; grid-template-columns: 56px 1fr; column-gap: 16px; text-align: left; align-items: center; padding: 10px 0; }
  .v4-jr-dot { width: 52px; height: 52px; grid-row: 1 / 4; margin: 0; }
  .v4-jr p { max-width: none; }
  .v4-diff { grid-template-columns: 1fr; }
  .v4-diff-card.is-big { grid-column: auto; }
  .v4-diff-card.is-big strong { font-size: 26px; }
  .v4-cmp-row { grid-template-columns: 1fr 28px; gap: 8px; padding: 16px; }
  .v4-cmp-row strong { grid-column: 1; grid-row: 1; }
  .v4-cmp-tick { grid-column: 2; grid-row: 1; }
  .v4-cmp-alone, .v4-cmp-racc { grid-column: 1 / 3; }
  .v4-cmp-stage { padding-left: 4px; }
  .v4-cmp-result { flex-direction: column; bottom: 12px; }
  .v4-float { padding: 10px 12px; }
  .v4-float strong { font-size: 13px; }
  .v4-bar { left: 12px; right: 12px; bottom: 12px; transform: translateY(140%); padding: 8px 8px 8px 16px; }
  .v4-bar.is-on { transform: none; }
  .v4-bar-text { flex: 1; font-size: 13px; white-space: normal; }
  .v4-bar .v4-btn { width: auto; }
}
`;

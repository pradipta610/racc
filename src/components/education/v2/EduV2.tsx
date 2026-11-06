"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, Plus, RotateCcw, Star, MessageCircle, ShieldCheck, Languages, RefreshCw } from "lucide-react";
import { CONSULTATION_URL, WHATSAPP_URL } from "../eduData";
import {
  QUESTIONS_A, QUESTIONS_B, STARTS, INTERESTS, CITY_OPTIONS, buildPlan, nextIntake, JOURNEY, CITY_CARDS, MYTHS, V2_FAQS,
  type StartId, type InterestId, type CityId,
} from "./v2Data";

const serif = "var(--font-playfair), 'Playfair Display', serif";
const k = (n: number) => `${Math.round(n / 1000)}k`;

/* Fades its children in once they scroll into view. State lives in React, so re-renders can't undo it. */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`v2-reveal${shown ? " is-in" : ""}${className ? ` ${className}` : ""}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* ---------------- Plan builder ---------------- */

function PlanBuilder() {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState<StartId | null>(null);
  const [interest, setInterest] = useState<InterestId | null>(null);
  const [city, setCity] = useState<CityId | null>(null);
  const [intake, setIntake] = useState("");

  useEffect(() => { setIntake(nextIntake(new Date())); }, []);

  const done = Boolean(start && interest && city);
  const plan = start && interest ? buildPlan(start, interest) : null;
  const cityOpt = CITY_OPTIONS.find((c) => c.id === city);
  const total = plan && cityOpt ? [plan.tuition[0] + cityOpt.living[0], plan.tuition[1] + cityOpt.living[1]] : null;

  const pick = <T,>(setter: (v: T) => void, v: T, next: number) => { setter(v); setStep(next); };
  const reset = () => { setStart(null); setInterest(null); setCity(null); setStep(0); };

  const waText = done && plan && cityOpt
    ? `Hi RACC, I built a study plan on your website: ${STARTS.find((s) => s.id === start)?.label}, interested in ${INTERESTS.find((i) => i.id === interest)?.label}, ${cityOpt.label}. Route: ${plan.steps.join(" → ")}. Can you check it with me?`
    : "";

  const steps = [
    { q: "Where are you now?", options: STARTS.map((s) => ({ ...s, on: start === s.id, act: () => pick(setStart, s.id, 1) })) },
    { q: "What do you want to study?", options: INTERESTS.map((s) => ({ ...s, on: interest === s.id, act: () => pick(setInterest, s.id, 2) })) },
    { q: "Where would you like to live?", options: CITY_OPTIONS.map((c) => ({ id: c.id, label: c.label, emoji: "", img: c.img, on: city === c.id, act: () => pick(setCity, c.id, 3) })) },
  ];
  const current = steps[Math.min(step, 2)];

  return (
    <div className="v2-plan">
      {/* Questions */}
      <div className="v2-plan-q">
        <div className="v2-plan-progress" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i} className={i < step || done ? "is-done" : i === step ? "is-on" : ""} />)}
        </div>

        {!done ? (
          <div key={step} className="v2-plan-step">
            <span className="v2-plan-count">Question {step + 1} of 3</span>
            <h3 style={{ fontFamily: serif }}>{current.q}</h3>
            <div className={`v2-opts${step === 2 ? " is-cities" : ""}`}>
              {current.options.map((o) => (
                <button key={o.id} onClick={o.act} className={`v2-opt${o.on ? " is-on" : ""}`} aria-pressed={o.on}>
                  {"img" in o && o.img ? (
                    <>
                      <Image src={o.img as string} alt="" fill sizes="200px" className="v2-opt-img" />
                      <span className="v2-opt-city">{o.label}</span>
                    </>
                  ) : (
                    <><span className="v2-opt-emoji" aria-hidden="true">{o.emoji}</span>{o.label}</>
                  )}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="v2-back" onClick={() => setStep(step - 1)}><ArrowLeft size={16} /> Back</button>
            )}
          </div>
        ) : (
          <div className="v2-plan-step v2-plan-done">
            <span className="v2-plan-count">Done</span>
            <h3 style={{ fontFamily: serif }}>Here&apos;s a starting point.</h3>
            <p>Every case is different. A quick chat turns this rough plan into one that fits your grades, budget and visa history.</p>
            <div className="v2-plan-ctas">
              <Link href={CONSULTATION_URL} className="v2-btn v2-btn-yellow">Check my plan with an advisor <ArrowRight size={16} /></Link>
              <a href={`${WHATSAPP_URL}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-line">
                <MessageCircle size={16} /> Send it on WhatsApp
              </a>
            </div>
            <button className="v2-back" onClick={reset}><RotateCcw size={15} /> Start again</button>
          </div>
        )}
      </div>

      {/* Live plan card */}
      <div className={`v2-card${done ? " is-done" : ""}`} aria-live="polite">
        <div className="v2-card-top">
          {cityOpt && <Image key={cityOpt.id} src={cityOpt.img} alt="" fill sizes="(max-width: 900px) 100vw, 480px" className="v2-card-img" />}
          <div className="v2-card-top-text">
            <span>Your study plan</span>
            <strong style={{ fontFamily: serif }}>{cityOpt ? cityOpt.label : "Australia"}</strong>
          </div>
        </div>
        <div className="v2-card-body">
          <Row label="Starting from" value={STARTS.find((s) => s.id === start)?.label} />
          <Row label="Field" value={INTERESTS.find((i) => i.id === interest)?.label} />
          <div className="v2-row">
            <span>Route</span>
            {plan ? (
              <div className="v2-route">
                {plan.steps.map((s, i) => (
                  <em key={s} style={{ animationDelay: `${i * 80}ms` }}>{s}{i < plan.steps.length - 1 && <ArrowRight size={12} />}</em>
                ))}
              </div>
            ) : <i className="v2-skel" />}
          </div>
          <div className="v2-card-grid">
            <Stat label="Study time" value={plan?.years} />
            <Stat label="Next intake" value={plan ? intake : undefined} />
            <Stat label="Rough cost / year" value={total ? `A$${k(total[0])}–${k(total[1])}` : undefined} wide />
          </div>
          {plan && <p className="v2-card-after"><Check size={14} /> {plan.after}</p>}
        </div>
        {done && <p className="v2-card-note">Tuition + living estimate. Real fees depend on provider.</p>}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="v2-row">
      <span>{label}</span>
      {value ? <strong className="v2-pop">{value}</strong> : <i className="v2-skel" />}
    </div>
  );
}

function Stat({ label, value, wide }: { label: string; value?: string; wide?: boolean }) {
  return (
    <div className={`v2-stat${wide ? " is-wide" : ""}`}>
      <span>{label}</span>
      {value ? <strong className="v2-pop">{value}</strong> : <i className="v2-skel" />}
    </div>
  );
}

/* ---------------- Journey (sticky photo + chapters) ---------------- */

function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="v2-journey">
      <div className="v2-j-sticky" aria-hidden="true">
        <div className="v2-j-frame">
          {JOURNEY.map((j, i) => (
            <Image key={j.n} src={j.img} alt="" fill sizes="(max-width: 900px) 0px, 560px" className={`v2-j-img${active === i ? " is-on" : ""}`} />
          ))}
          <div className="v2-j-badge"><span>{JOURNEY[active].n}</span>{JOURNEY[active].title}</div>
          <div className="v2-j-dots">
            {JOURNEY.map((j, i) => <i key={j.n} className={i <= active ? "is-on" : ""} />)}
          </div>
        </div>
      </div>
      <ol className="v2-j-list">
        {JOURNEY.map((j, i) => (
          <li key={j.n} data-i={i} ref={(el) => { refs.current[i] = el; }} className={`v2-j-ch${active === i ? " is-on" : ""}`}>
            <div className="v2-j-mobile-img"><Image src={j.img} alt="" fill sizes="100vw" /></div>
            <span className="v2-j-n">{j.n}</span>
            <h3 style={{ fontFamily: serif }}>{j.title}</h3>
            <p>{j.line}</p>
            <div className="v2-j-we">
              <span>We handle</span>
              <ul>{j.we.map((w) => <li key={w}><Check size={14} /> {w}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------------- Cities carousel ---------------- */

function Cities() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".v2-city");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 18), behavior: "smooth" });
  };
  return (
    <>
      <div className="v2-cities-head">
        <SectionHead kicker="Pick your city" title="Six very different ways to live" align="left" />
        <div className="v2-arrows">
          <button onClick={() => scroll(-1)} aria-label="Previous city"><ArrowLeft size={20} /></button>
          <button onClick={() => scroll(1)} aria-label="Next city"><ArrowRight size={20} /></button>
        </div>
      </div>
      <div className="v2-cities" ref={track}>
        {CITY_CARDS.map((c) => (
          <article key={c.name} className="v2-city">
            <Image src={c.img} alt={`${c.name}, Australia`} fill sizes="(max-width: 700px) 80vw, 340px" />
            <span className="v2-city-tag">{c.tag}</span>
            <div className="v2-city-text">
              <strong style={{ fontFamily: serif }}>{c.name}</strong>
              <p>{c.vibe}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

/* ---------------- Myths (flip cards) ---------------- */

function Myths() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const toggle = (i: number) => setFlipped((f) => (f.includes(i) ? f.filter((x) => x !== i) : [...f, i]));
  return (
    <div className="v2-myths">
      {MYTHS.map((m, i) => {
        const on = flipped.includes(i);
        return (
          <Reveal key={m.myth} delay={i * 80}>
          <button className={`v2-myth${on ? " is-flipped" : ""}`} onClick={() => toggle(i)} aria-pressed={on}>
            <span className="v2-myth-inner">
              <span className="v2-myth-face v2-myth-front">
                <em>Myth</em>
                <strong style={{ fontFamily: serif }}>&ldquo;{m.myth}&rdquo;</strong>
                <span className="v2-myth-hint"><RefreshCw size={14} /> Tap to see the reality</span>
              </span>
              <span className="v2-myth-face v2-myth-back">
                <em>Reality</em>
                <strong>{m.fact}</strong>
              </span>
            </span>
          </button>
          </Reveal>
        );
      })}
    </div>
  );
}

function SectionHead({ kicker, title, dark, align = "center" }: { kicker: string; title: string; dark?: boolean; align?: "center" | "left" }) {
  return (
    <Reveal className={`v2-head${align === "left" ? " is-left" : ""}`}>
      <span className="v2-kicker" style={dark ? { color: "var(--yellow)" } : undefined}>{kicker}</span>
      <h2 style={{ fontFamily: serif, color: dark ? "#fff" : "var(--navy)" }}>{title}</h2>
    </Reveal>
  );
}

/* ---------------- Page ---------------- */

export default function EduV2() {
  return (
    <>
      {/* HERO */}
      <section className="v2-hero">
        <Image src="/education/hero-students.jpg" alt="" fill priority sizes="100vw" className="v2-hero-img" />
        <div className="v2-hero-shade" aria-hidden="true" />
        <div className="v2-wrap v2-hero-inner">
          <span className="v2-hero-kicker"><span /> Study in Australia</span>
          <h1 style={{ fontFamily: serif }}>
            Your future in Australia,<br /><em>without the guesswork.</em>
          </h1>
          <p>Build a rough study plan in 30 seconds. Then check it with people who have done this for 20 years.</p>
          <div className="v2-hero-ctas">
            <a href="#plan" className="v2-btn v2-btn-yellow v2-btn-lg">Build my plan <ArrowRight size={18} /></a>
            <a href="#journey" className="v2-btn v2-btn-glass v2-btn-lg">See how it works</a>
          </div>
          <ul className="v2-hero-trust">
            <li><Star size={16} fill="currentColor" /> 4.8 from 800+ Google reviews</li>
            <li><ShieldCheck size={16} /> Registered migration agents</li>
            <li><Languages size={16} /> 12+ languages</li>
          </ul>
        </div>
      </section>

      {/* SOUND FAMILIAR */}
      <section className="v2-familiar">
        <SectionHead kicker="Sound familiar?" title="Every student asks these." />
        <div className="v2-marquee" aria-hidden="true">
          <div className="v2-marquee-row">{[...QUESTIONS_A, ...QUESTIONS_A].map((q, i) => <span key={i}>{q}</span>)}</div>
          <div className="v2-marquee-row is-rev">{[...QUESTIONS_B, ...QUESTIONS_B].map((q, i) => <span key={i}>{q}</span>)}</div>
        </div>
        <ul className="v2-sr-only">{[...QUESTIONS_A, ...QUESTIONS_B].map((q) => <li key={q}>{q}</li>)}</ul>
        <Reveal><p className="v2-familiar-line">You don&apos;t have to answer them alone. <a href="#plan">Start with three easy ones ↓</a></p></Reveal>
      </section>

      {/* PLAN BUILDER */}
      <section id="plan" className="v2-sec v2-sec-navy">
        <div className="v2-wrap">
          <SectionHead kicker="30-second plan" title="Three questions. One clear starting point." dark />
          <PlanBuilder />
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="v2-sec">
        <div className="v2-wrap">
          <SectionHead kicker="The journey" title="From first question to graduation day" />
          <Journey />
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" className="v2-sec v2-sec-off">
        <div className="v2-wrap"><Cities /></div>
      </section>

      {/* MYTHS */}
      <section id="myths" className="v2-sec">
        <div className="v2-wrap">
          <SectionHead kicker="Myth vs reality" title="Things students wrongly believe" />
          <Myths />
        </div>
      </section>

      {/* NUMBERS */}
      <section className="v2-numbers">
        <div className="v2-wrap v2-numbers-grid">
          {[
            { v: "20+", l: "years guiding students" },
            { v: "4.8★", l: "average Google rating" },
            { v: "800+", l: "Google reviews" },
            { v: "12+", l: "languages spoken" },
          ].map((n, i) => (
            <Reveal key={n.l} delay={i * 80}><strong style={{ fontFamily: serif }}>{n.v}</strong><span>{n.l}</span></Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="v2-sec v2-sec-off">
        <div className="v2-wrap">
          <SectionHead kicker="Before you ask" title="Quick answers" />
          <div className="v2-faq">
            {V2_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Plus size={20} /></summary>
                <p>{f.a}{f.link && <> <Link href={f.link.href}>{f.link.label} →</Link></>}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="v2-final">
        <Image src="/education/life-graduate.jpg" alt="" fill sizes="100vw" className="v2-final-img" />
        <div className="v2-final-shade" aria-hidden="true" />
        <Reveal className="v2-wrap v2-final-inner">
          <h2 style={{ fontFamily: serif }}>Your route is probably<br /><em>simpler than you think.</em></h2>
          <p>Bring your questions. We&apos;ll bring 20 years of answers.</p>
          <div className="v2-hero-ctas">
            <Link href={CONSULTATION_URL} className="v2-btn v2-btn-yellow v2-btn-lg">Book a free chat <ArrowRight size={18} /></Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v2-btn v2-btn-glass v2-btn-lg"><MessageCircle size={18} /> WhatsApp us</a>
          </div>
          <span className="v2-final-small">Free first chat · No obligation · Melbourne-based, helping worldwide</span>
        </Reveal>
      </section>

      <style>{CSS}</style>
    </>
  );
}

const CSS = `
.v2-wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
#plan, #journey, #cities, #myths, #faq { scroll-margin-top: 72px; }
.v2-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.v2-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.v2-reveal.is-in { opacity: 1; transform: none; }

/* Buttons */
.v2-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; padding: 13px 22px; font-weight: 700; font-size: 15px; text-decoration: none; transition: all .2s; cursor: pointer; border: none; font-family: inherit; }
.v2-btn-lg { padding: 16px 28px; font-size: 16px; }
.v2-btn-yellow { background: #eddb3c; color: var(--navy); }
.v2-btn-yellow:hover { background: #e2cf35; transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,.2); }
.v2-btn-glass { background: rgba(255,255,255,.12); color: #fff; border: 1.5px solid rgba(255,255,255,.35); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.v2-btn-glass:hover { background: rgba(255,255,255,.22); }
.v2-btn-line { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.35); }
.v2-btn-line:hover { border-color: #fff; }
.v2-btn:focus-visible, .v2-opt:focus-visible, .v2-myth:focus-visible, .v2-arrows button:focus-visible, .v2-faq summary:focus-visible { outline: 3px solid var(--sky); outline-offset: 3px; }

/* Hero */
.v2-hero { position: relative; min-height: min(calc(100vh - 72px), 780px); display: flex; align-items: flex-end; overflow: hidden; color: #fff; }
.v2-hero-img { object-fit: cover; object-position: center 70%; animation: v2Zoom 14s ease-out both; }
@keyframes v2Zoom { from { transform: scale(1.12); } to { transform: scale(1); } }
.v2-hero-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,31,74,.25) 0%, rgba(11,31,74,.55) 45%, rgba(11,31,74,.95) 100%), linear-gradient(90deg, rgba(11,31,74,.6), transparent 70%); }
.v2-hero-inner { position: relative; z-index: 2; width: 100%; padding-top: 120px; padding-bottom: 64px; }
.v2-hero-kicker { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--yellow); margin-bottom: 18px; }
.v2-hero-kicker span { width: 32px; height: 2px; background: var(--yellow); }
.v2-hero h1 { font-size: clamp(38px, 6.4vw, 76px); line-height: 1.04; letter-spacing: -1px; margin-bottom: 20px; max-width: 900px; animation: floatUp .8s ease both; }
.v2-hero h1 em { color: var(--yellow); font-style: italic; }
.v2-hero-inner > p { font-size: clamp(16px, 1.6vw, 19px); color: rgba(255,255,255,.82); max-width: 540px; line-height: 1.6; margin-bottom: 30px; animation: floatUp .8s .15s ease both; }
.v2-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; animation: floatUp .8s .3s ease both; }
.v2-hero-trust { list-style: none; display: flex; flex-wrap: wrap; gap: 10px 26px; margin-top: 40px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.18); font-size: 14px; color: rgba(255,255,255,.85); animation: floatUp .8s .45s ease both; }
.v2-hero-trust li { display: flex; align-items: center; gap: 8px; }
.v2-hero-trust svg { color: var(--yellow); }

/* Sections */
.v2-sec { padding: 104px 0; background: #fff; }
.v2-sec-off { background: var(--off); }
.v2-sec-navy { background: radial-gradient(circle at 10% 0%, rgba(91,163,217,.22), transparent 40%), linear-gradient(160deg, #0B1F4A, var(--navy)); color: #fff; }
.v2-head { text-align: center; margin-bottom: 52px; }
.v2-head.is-left { text-align: left; margin-bottom: 0; }
.v2-kicker { display: block; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
.v2-head h2 { font-size: clamp(30px, 4vw, 46px); line-height: 1.12; letter-spacing: -.5px; }

/* Sound familiar */
.v2-familiar { padding: 96px 0 88px; background: var(--off); overflow: hidden; }
.v2-familiar .v2-head { margin-bottom: 40px; }
.v2-marquee { display: flex; flex-direction: column; gap: 14px; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.v2-marquee-row { display: flex; gap: 14px; width: max-content; animation: v2Marq 40s linear infinite; }
.v2-marquee-row.is-rev { animation-direction: reverse; animation-duration: 46s; }
.v2-marquee-row span { white-space: nowrap; padding: 16px 26px; border-radius: 40px; background: #fff; border: 1px solid var(--border); font-size: 18px; font-weight: 500; color: var(--tm); box-shadow: 0 4px 14px rgba(28,58,138,.05); }
.v2-marquee-row span:nth-child(3n) { background: var(--navy); color: #fff; border-color: var(--navy); }
.v2-marquee-row span:nth-child(5n) { background: var(--yellow); color: var(--navy); border-color: var(--yellow); }
@keyframes v2Marq { to { transform: translateX(-50%); } }
.v2-familiar-line { text-align: center; margin-top: 44px; font-size: 18px; color: var(--td); font-weight: 500; padding: 0 5%; }
.v2-familiar-line a { color: var(--blue); font-weight: 700; text-decoration: none; white-space: nowrap; }
.v2-familiar-line a:hover { text-decoration: underline; }

/* Plan builder */
.v2-plan { display: grid; grid-template-columns: 1.15fr 1fr; gap: 32px; align-items: start; }
.v2-plan-q { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); border-radius: 24px; padding: 32px; min-height: 520px; }
.v2-plan-progress { display: flex; gap: 6px; margin-bottom: 28px; }
.v2-plan-progress span { flex: 1; height: 4px; border-radius: 4px; background: rgba(255,255,255,.15); transition: background .3s; }
.v2-plan-progress .is-on { background: rgba(245,197,24,.5); }
.v2-plan-progress .is-done { background: var(--yellow); }
.v2-plan-step { animation: v2In .4s ease both; }
@keyframes v2In { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
.v2-plan-count { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.55); }
.v2-plan-step h3 { font-size: 30px; margin: 8px 0 24px; }
.v2-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.v2-opt { display: flex; align-items: center; gap: 12px; text-align: left; padding: 16px 18px; border-radius: 14px; border: 1.5px solid rgba(255,255,255,.15); background: rgba(255,255,255,.05); color: #fff; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: all .2s; position: relative; overflow: hidden; }
.v2-opt:hover { border-color: var(--yellow); background: rgba(255,255,255,.1); transform: translateY(-2px); }
.v2-opt.is-on { border-color: var(--yellow); background: rgba(245,197,24,.15); }
.v2-opt-emoji { font-size: 22px; width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.1); flex-shrink: 0; }
.v2-opts.is-cities { grid-template-columns: repeat(3, 1fr); }
.v2-opts.is-cities .v2-opt { height: 110px; padding: 0; align-items: flex-end; }
.v2-opt-img { object-fit: cover; transition: transform .4s; }
.v2-opt:hover .v2-opt-img { transform: scale(1.08); }
.v2-opts.is-cities .v2-opt::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(11,31,74,.85)); }
.v2-opt-city { position: relative; z-index: 1; padding: 10px 12px; }
.v2-back { margin-top: 22px; display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: rgba(255,255,255,.65); font: inherit; font-size: 14px; cursor: pointer; padding: 4px 0; }
.v2-back:hover { color: #fff; }
.v2-plan-done p { color: rgba(255,255,255,.75); font-size: 16px; line-height: 1.65; margin-bottom: 26px; max-width: 460px; }
.v2-plan-ctas { display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }

.v2-card { background: #fff; color: var(--td); border-radius: 24px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,.3); position: sticky; top: 96px; transition: transform .4s; }
.v2-card.is-done { transform: rotate(-1deg); }
.v2-card-top { height: 150px; position: relative; background: linear-gradient(135deg, var(--blue), var(--navy)); display: flex; align-items: flex-end; overflow: hidden; }
.v2-card-img { object-fit: cover; animation: v2Fade .5s ease both; }
@keyframes v2Fade { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: none; } }
.v2-card-top::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(11,31,74,.85)); }
.v2-card-top-text { position: relative; z-index: 1; padding: 18px 22px; color: #fff; }
.v2-card-top-text span { display: block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--yellow); }
.v2-card-top-text strong { font-size: 30px; }
.v2-card-body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 14px; }
.v2-row { display: flex; flex-direction: column; gap: 5px; }
.v2-row > span, .v2-stat > span { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--tl); }
.v2-row strong { font-size: 16px; }
.v2-skel { display: block; height: 14px; width: 60%; border-radius: 6px; background: linear-gradient(90deg, var(--light), var(--off), var(--light)); background-size: 200% 100%; animation: v2Shimmer 1.4s linear infinite; }
@keyframes v2Shimmer { to { background-position: -200% 0; } }
.v2-pop { animation: v2Pop .35s ease both; }
@keyframes v2Pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.v2-route { display: flex; flex-wrap: wrap; gap: 6px; }
.v2-route em { font-style: normal; display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--navy); background: var(--light); padding: 6px 10px; border-radius: 8px; animation: v2Pop .35s ease both; }
.v2-route em svg { color: var(--tl); }
.v2-route em:last-child { background: var(--yellow); }
.v2-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.v2-stat { background: var(--off); border-radius: 12px; padding: 12px 14px; display: flex; flex-direction: column; gap: 4px; }
.v2-stat.is-wide { grid-column: 1 / 3; background: var(--navy); }
.v2-stat.is-wide > span { color: rgba(255,255,255,.6); }
.v2-stat strong { font-size: 18px; color: var(--navy); }
.v2-stat.is-wide strong { font-size: 26px; color: var(--yellow); font-family: ${serif}; }
.v2-stat.is-wide .v2-skel { background: rgba(255,255,255,.12); animation: none; }
.v2-card-after { display: flex; gap: 8px; align-items: flex-start; font-size: 13px; color: var(--tm); }
.v2-card-after svg { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
.v2-card-note { font-size: 11px; color: var(--tl); padding: 0 22px 18px; }

/* Journey */
.v2-journey { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; }
.v2-j-sticky { position: relative; }
.v2-j-frame { position: sticky; top: 104px; height: min(70vh, 580px); border-radius: 28px; overflow: hidden; background: var(--navy); box-shadow: 0 30px 60px rgba(15,30,69,.18); }
.v2-j-img { object-fit: cover; opacity: 0; transform: scale(1.06); transition: opacity .7s ease, transform 1.2s ease; }
.v2-j-img.is-on { opacity: 1; transform: none; }
.v2-j-frame::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 55%, rgba(11,31,74,.8)); }
.v2-j-badge { position: absolute; left: 24px; bottom: 26px; z-index: 1; display: flex; align-items: center; gap: 12px; color: #fff; font-family: ${serif}; font-size: 30px; font-weight: 700; }
.v2-j-badge span { font-family: inherit; font-size: 14px; background: var(--yellow); color: var(--navy); width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; }
.v2-j-dots { position: absolute; right: 24px; bottom: 36px; z-index: 1; display: flex; gap: 6px; }
.v2-j-dots i { width: 22px; height: 4px; border-radius: 4px; background: rgba(255,255,255,.3); transition: background .3s; }
.v2-j-dots i.is-on { background: var(--yellow); }
.v2-j-list { list-style: none; }
.v2-j-ch { min-height: 62vh; display: flex; flex-direction: column; justify-content: center; opacity: .3; transition: opacity .5s; }
.v2-j-ch.is-on { opacity: 1; }
.v2-j-mobile-img { display: none; }
.v2-j-n { font-size: 14px; font-weight: 700; color: var(--blue); letter-spacing: 2px; }
.v2-j-ch h3 { font-size: clamp(34px, 4vw, 52px); color: var(--navy); margin: 6px 0 12px; line-height: 1.05; }
.v2-j-ch > p { font-size: 19px; color: var(--tm); line-height: 1.55; max-width: 440px; margin-bottom: 24px; }
.v2-j-we { border-left: 3px solid var(--yellow); padding-left: 18px; }
.v2-j-we > span { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--tl); }
.v2-j-we ul { list-style: none; margin-top: 8px; display: flex; flex-direction: column; gap: 6px; }
.v2-j-we li { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 500; color: var(--td); }
.v2-j-we svg { color: #fff; background: var(--blue); border-radius: 50%; padding: 2px; flex-shrink: 0; }

/* Cities */
.v2-cities-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 36px; }
.v2-arrows { display: flex; gap: 10px; flex-shrink: 0; }
.v2-arrows button { width: 50px; height: 50px; border-radius: 50%; border: 1.5px solid var(--border); background: #fff; color: var(--navy); cursor: pointer; display: grid; place-items: center; transition: all .2s; }
.v2-arrows button:hover { background: var(--navy); color: #fff; border-color: var(--navy); }
.v2-cities { display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; scrollbar-width: none; margin-right: -5vw; padding-right: 5vw; }
.v2-cities::-webkit-scrollbar { display: none; }
.v2-city { position: relative; flex: 0 0 340px; height: 460px; border-radius: 24px; overflow: hidden; scroll-snap-align: start; color: #fff; }
.v2-city img { object-fit: cover; transition: transform .7s ease; }
.v2-city:hover img { transform: scale(1.06); }
.v2-city::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, rgba(11,31,74,.92)); }
.v2-city-tag { position: absolute; top: 18px; left: 18px; z-index: 1; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; border-radius: 20px; background: rgba(255,255,255,.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.v2-city-text { position: absolute; left: 24px; right: 24px; bottom: 24px; z-index: 1; }
.v2-city-text strong { font-size: 34px; display: block; line-height: 1.1; }
.v2-city-text p { font-size: 15px; color: rgba(255,255,255,.82); margin-top: 6px; }

/* Myths */
.v2-myths { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.v2-myth { width: 100%; perspective: 1200px; height: 300px; border: none; background: none; padding: 0; cursor: pointer; font: inherit; text-align: left; }
.v2-myth-inner { position: relative; display: block; width: 100%; height: 100%; transition: transform .7s cubic-bezier(.2,.8,.2,1); transform-style: preserve-3d; }
.v2-myth.is-flipped .v2-myth-inner { transform: rotateY(180deg); }
.v2-myth-face { position: absolute; inset: 0; border-radius: 22px; padding: 26px; display: flex; flex-direction: column; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.v2-myth-face em { font-style: normal; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
.v2-myth-front { background: var(--navy); color: #fff; }
.v2-myth-front em { color: rgba(255,255,255,.55); text-decoration: line-through; }
.v2-myth-front strong { font-size: 23px; line-height: 1.3; margin-top: 14px; }
.v2-myth-hint { margin-top: auto; display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--yellow); }
.v2-myth-back { background: var(--yellow); color: var(--navy); transform: rotateY(180deg); }
.v2-myth-back strong { font-size: 19px; line-height: 1.45; margin-top: 14px; font-weight: 600; }
.v2-myth:hover .v2-myth-inner { box-shadow: 0 20px 40px rgba(15,30,69,.18); border-radius: 22px; }

/* Numbers */
.v2-numbers { background: var(--yellow); padding: 64px 0; }
.v2-numbers-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center; }
.v2-numbers strong { display: block; font-size: clamp(40px, 5vw, 60px); color: var(--navy); line-height: 1; }
.v2-numbers span { display: block; margin-top: 8px; font-size: 15px; font-weight: 600; color: var(--navy); opacity: .8; }

/* FAQ */
.v2-faq { max-width: 780px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
.v2-faq details { background: #fff; border: 1px solid var(--border); border-radius: 16px; transition: border-color .2s; }
.v2-faq details[open] { border-color: var(--sky); }
.v2-faq summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 24px; font-size: 17px; font-weight: 600; color: var(--td); }
.v2-faq summary::-webkit-details-marker { display: none; }
.v2-faq summary svg { color: var(--blue); transition: transform .25s; flex-shrink: 0; }
.v2-faq details[open] summary svg { transform: rotate(45deg); }
.v2-faq p { padding: 0 24px 22px; color: var(--tm); line-height: 1.65; }
.v2-faq a { color: var(--blue); font-weight: 600; }

/* Final */
.v2-final { position: relative; padding: 150px 0; overflow: hidden; color: #fff; text-align: center; }
.v2-final-img { object-fit: cover; object-position: center 30%; }
.v2-final-shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(11,31,74,.75), rgba(11,31,74,.92)); }
.v2-final-inner { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
.v2-final h2 { font-size: clamp(34px, 5vw, 60px); line-height: 1.1; margin-bottom: 16px; }
.v2-final h2 em { color: var(--yellow); font-style: italic; }
.v2-final p { font-size: 18px; color: rgba(255,255,255,.8); margin-bottom: 30px; }
.v2-final .v2-hero-ctas { justify-content: center; animation: none; }
.v2-final-small { margin-top: 22px; font-size: 13px; color: rgba(255,255,255,.6); }

@media (prefers-reduced-motion: reduce) {
  .v2-hero-img, .v2-marquee-row, .v2-skel { animation: none !important; }
  .v2-reveal { opacity: 1; transform: none; transition: none; }
  .v2-myth-inner { transition: none; }
}

@media (max-width: 1000px) {
  .v2-plan { grid-template-columns: 1fr; }
  .v2-plan-q { min-height: 0; }
  .v2-card { position: static; }
  .v2-card.is-done { transform: none; }
  .v2-journey { grid-template-columns: 1fr; gap: 0; }
  .v2-j-sticky { display: none; }
  .v2-j-ch { min-height: 0; opacity: 1; padding: 0 0 56px; }
  .v2-j-mobile-img { display: block; position: relative; height: 240px; border-radius: 20px; overflow: hidden; margin-bottom: 20px; }
  .v2-j-mobile-img img { object-fit: cover; }
  .v2-myths { grid-template-columns: repeat(2, 1fr); }
  .v2-numbers-grid { grid-template-columns: repeat(2, 1fr); row-gap: 36px; }
}

@media (max-width: 700px) {
  .v2-sec { padding: 72px 0; }
  .v2-hero { min-height: calc(100svh - 72px); }
  .v2-hero-inner { padding-bottom: 40px; }
  .v2-hero-ctas { flex-direction: column; align-items: stretch; }
  .v2-hero-trust { gap: 8px 18px; font-size: 13px; margin-top: 28px; }
  .v2-head { margin-bottom: 36px; }
  .v2-familiar { padding: 72px 0 64px; }
  .v2-marquee-row span { font-size: 15px; padding: 12px 18px; }
  .v2-familiar-line { font-size: 16px; }
  .v2-plan-q { padding: 22px; border-radius: 20px; }
  .v2-plan-step h3 { font-size: 24px; }
  .v2-opts { grid-template-columns: 1fr; }
  .v2-opts.is-cities { grid-template-columns: 1fr 1fr; }
  .v2-opts.is-cities .v2-opt { height: 90px; }
  .v2-plan-ctas .v2-btn { width: 100%; }
  .v2-cities-head { align-items: flex-start; flex-direction: column; }
  .v2-arrows { display: none; }
  .v2-city { flex-basis: 78vw; height: 400px; }
  .v2-myths { grid-template-columns: 1fr; }
  .v2-myth { height: 220px; }
  .v2-numbers { padding: 48px 0; }
  .v2-final { padding: 96px 0; }
}
`;

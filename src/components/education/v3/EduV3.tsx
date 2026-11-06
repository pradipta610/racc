"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Lenis from "lenis";
import { ArrowRight, Check, Star, Plus, ShieldCheck, Languages, Clock } from "lucide-react";
import LeadForm from "./LeadForm";
import { WHATSAPP_URL } from "../eduData";
import {
  USPS, PERSONAS, METHOD, TIMELINE, TWELVE, FEES, V3_FAQS, upcomingIntakes, intakeStatus, fmtMonth, type Intake,
} from "./v3Data";

const Globe = dynamic(() => import("./Globe"), { ssr: false });
const serif = "var(--font-playfair), 'Playfair Display', serif";

/* ---------- helpers ---------- */

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, shown] = useInView<HTMLDivElement>(0.15);
  return <div ref={ref} className={`v3-reveal${shown ? " is-in" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>;
}

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const t0 = performance.now(), dur = 1600;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
      setV(to * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

/** Scroll progress (0–1) of an element passing through the viewport. */
function useScrollProgress<T extends HTMLElement>(mode: "through" | "pinned") {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const v = mode === "pinned" ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height * 0.5);
      setP(Math.max(0, Math.min(1, v)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [mode]);
  return [ref, p] as const;
}

function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current; if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`v3-tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}

/* ---------- sections ---------- */

function useIntakes() {
  const [state, setState] = useState<{ now: Date; list: Intake[] } | null>(null);
  useEffect(() => { const now = new Date(); setState({ now, list: upcomingIntakes(now, 3) }); }, []);
  return state;
}

function Hero() {
  const intakes = useIntakes();
  const next = intakes?.list.find((i) => intakeStatus(i, intakes.now).tone !== "late");
  const words = ["Study", "in", "Australia."];
  return (
    <section className="v3-hero">
      <div className="v3-hero-grid-bg" aria-hidden="true" />
      <div className="v3-wrap v3-hero-inner">
        <div className="v3-hero-copy">
          <span className="v3-badge">
            <span className="v3-badge-dot" />
            {next ? <>Now planning · <strong>{next.label}</strong> intake</> : "Now planning upcoming intakes"}
          </span>
          <h1 style={{ fontFamily: serif }}>
            {words.map((w, i) => <span key={w} className="v3-word" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{w}&nbsp;</span>)}
            <br />
            <em className="v3-word" style={{ animationDelay: "0.5s" }}>Planned properly.</em>
          </h1>
          <p className="v3-hero-lead">We help you choose a course, apply to the university or college, and get your student visa. One team, free course applications, 20 years of experience.</p>
          <div className="v3-hero-ctas">
            <a href="#plan-form" className="v3-btn v3-btn-yellow v3-btn-lg">Get my free plan <ArrowRight size={18} /></a>
            <a href="#timeline" className="v3-btn v3-btn-ghost v3-btn-lg">How it works</a>
          </div>
          <ul className="v3-hero-trust">
            <li><Star size={15} fill="currentColor" /> 4.8 · 800+ Google reviews</li>
            <li><ShieldCheck size={15} /> Registered migration agents</li>
            <li><Languages size={15} /> 12+ languages</li>
          </ul>
        </div>
        <div className="v3-globe-wrap">
          <Globe className="v3-globe" />
          <p className="v3-globe-legend">
            <i aria-hidden="true" /> Common study routes to Australia from across Asia. Our team speaks the languages along these routes.
          </p>
        </div>
      </div>
    </section>
  );
}

function FormBand() {
  return (
    <section id="plan-form" className="v3-formband">
      <div className="v3-wrap v3-formband-grid">
        <div className="v3-formband-copy">
          <span className="v3-kicker is-light">Free study plan</span>
          <h2 className="v3-h2 is-light" style={{ fontFamily: serif }}>Tell us where you are.<br />We&apos;ll map the rest.</h2>
          <ul className="v3-final-list">
            {["A route that fits your grades and budget", "Rough costs and the right intake", "Free, with no obligation"].map((t) => <li key={t}><Check size={16} /> {t}</li>)}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

function IntakeTicker() {
  const intakes = useIntakes();
  const items = intakes
    ? intakes.list.flatMap((i) => [`${i.label} intake`, `Recommended apply-by ${fmtMonth(i.applyBy)}`])
    : ["February & July intakes", "Plan 4–6 months ahead"];
  const row = [...items, "Free course applications", "Advice in 12+ languages"];
  return (
    <div className="v3-ticker" aria-label="Upcoming intakes">
      <div className="v3-ticker-track">
        {[...row, ...row, ...row].map((t, i) => <span key={i}>{t}<i aria-hidden="true">✦</i></span>)}
      </div>
    </div>
  );
}

function About() {
  const [ref, p] = useScrollProgress<HTMLDivElement>("through");
  const text = "We help international students pick the right course, get the right visa and plan what comes after. One team. Your language. No guesswork.";
  const words = text.split(" ");
  return (
    <section id="about" className="v3-sec">
      <div className="v3-wrap">
        <span className="v3-kicker">About the service</span>
        <div ref={ref} className="v3-about-text" style={{ fontFamily: serif }}>
          {words.map((w, i) => {
            const on = p * 1.25 > i / words.length;
            return <span key={i} className={on ? "is-on" : ""}>{w} </span>;
          })}
        </div>
        <div className="v3-counters">
          <div><strong style={{ fontFamily: serif }}><Counter to={20} suffix="+" /></strong><span>years in education & migration</span></div>
          <div><strong style={{ fontFamily: serif }}><Counter to={4.8} decimals={1} /></strong><span>average Google rating</span></div>
          <div><strong style={{ fontFamily: serif }}><Counter to={800} suffix="+" /></strong><span>Google reviews</span></div>
          <div><strong style={{ fontFamily: serif }}><Counter to={12} suffix="+" /></strong><span>languages spoken</span></div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="v3-sec v3-sec-dark">
      <div className="v3-wrap">
        <Reveal><span className="v3-kicker is-light">Why RACC</span><h2 className="v3-h2 is-light" style={{ fontFamily: serif }}>Why students pick us<br />over going it alone</h2></Reveal>
        <div className="v3-usps">
          {USPS.map((u, i) => (
            <Reveal key={u.k} delay={i * 90}>
              <Tilt className="v3-usp">
                <span className="v3-usp-k" style={{ fontFamily: serif }}>{u.k}</span>
                <strong>{u.title}</strong>
                <p>{u.sub}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForYou() {
  const [active, setActive] = useState(PERSONAS[0].id);
  const p = PERSONAS.find((x) => x.id === active)!;
  return (
    <section id="for-you" className="v3-sec">
      <div className="v3-wrap">
        <Reveal><span className="v3-kicker">Who it&apos;s for</span><h2 className="v3-h2" style={{ fontFamily: serif }}>Built for where you are right now</h2></Reveal>
        <div className="v3-tabs" role="tablist" aria-label="Your situation">
          {PERSONAS.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === active} className={`v3-tab${x.id === active ? " is-on" : ""}`} onClick={() => setActive(x.id)}>{x.tab}</button>
          ))}
        </div>
        <div className="v3-persona" role="tabpanel">
          <div className="v3-persona-img">
            {PERSONAS.map((x) => (
              <Image key={x.id} src={x.img} alt="" fill sizes="(max-width: 900px) 100vw, 560px" className={x.id === active ? "is-on" : ""} />
            ))}
          </div>
          <div key={p.id} className="v3-persona-body">
            <h3 style={{ fontFamily: serif }}>{p.title}</h3>
            <p>{p.line}</p>
            <span className="v3-mini">What we&apos;d do for you</span>
            <ol>
              {p.plan.map((s, i) => <li key={s} style={{ animationDelay: `${i * 90}ms` }}><span>{i + 1}</span>{s}</li>)}
            </ol>
            <a href="#plan-form" className="v3-btn v3-btn-navy">Get my plan <ArrowRight size={16} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Method() {
  return (
    <section className="v3-sec v3-sec-off">
      <div className="v3-wrap v3-method">
        <div className="v3-method-badge" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs><path id="v3circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#v3circle">ONE TEAM · ONE PLAN · ONE TEAM · ONE PLAN ·</textPath></text>
          </svg>
          <span>RACC</span>
        </div>
        <div>
          <Reveal><span className="v3-kicker">How we work</span><h2 className="v3-h2" style={{ fontFamily: serif }}>Less back-and-forth.<br />More certainty.</h2></Reveal>
          <div className="v3-method-cards">
            {METHOD.map((m, i) => (
              <Reveal key={m.title} delay={i * 100} className="v3-method-card"><strong>{m.title}</strong><p>{m.sub}</p></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const [ref, p] = useScrollProgress<HTMLElement>("pinned");
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => { if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80)); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return (
    <section id="timeline" ref={ref} className="v3-timeline" style={{ ["--dist" as string]: `${dist}px` }}>
      <div className="v3-tl-sticky">
        <div className="v3-wrap v3-tl-head">
          <div>
            <span className="v3-kicker is-light">Timeline</span>
            <h2 className="v3-h2 is-light" style={{ fontFamily: serif }}>From first chat to first class</h2>
          </div>
          <span className="v3-tl-weeks"><Clock size={16} /> Typically ~16 weeks</span>
        </div>
        <div className="v3-tl-rail" aria-hidden="true"><span style={{ transform: `scaleX(${p})` }} /></div>
        <div ref={track} className="v3-tl-track" style={{ transform: `translate3d(${-p * dist}px,0,0)` }}>
          {TIMELINE.map((s, i) => {
            const on = p * (TIMELINE.length - 0.6) >= i - 0.2;
            return (
              <div key={s.title} className={`v3-tl-card${on ? " is-on" : ""}${i === TIMELINE.length - 1 ? " is-last" : ""}`}>
                <span className="v3-tl-dot" />
                <em>{s.wk}</em>
                <strong style={{ fontFamily: serif }}>{s.title}</strong>
                <p>{s.sub}</p>
              </div>
            );
          })}
        </div>
        <p className="v3-wrap v3-tl-note">Timing varies by provider, country and visa processing.</p>
      </div>
    </section>
  );
}

function Twelve() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TWELVE.length), 2400);
    return () => clearInterval(id);
  }, [hovering]);
  return (
    <section className="v3-sec">
      <div className="v3-wrap">
        <Reveal><span className="v3-kicker">What&apos;s included</span><h2 className="v3-h2" style={{ fontFamily: serif }}>12 things we take off your plate</h2></Reveal>
        <div className="v3-twelve" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
          <ol className="v3-twelve-list">
            {TWELVE.map((t, i) => (
              <li key={t}>
                <button className={i === active ? "is-on" : ""} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>{t}
                </button>
              </li>
            ))}
          </ol>
          <div className="v3-twelve-show" aria-live="polite">
            <span key={`n${active}`} className="v3-twelve-num" style={{ fontFamily: serif }}>{String(active + 1).padStart(2, "0")}</span>
            <strong key={`t${active}`} style={{ fontFamily: serif }}>{TWELVE[active]}</strong>
            <div className="v3-twelve-bar"><span style={{ width: `${((active + 1) / TWELVE.length) * 100}%` }} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fees() {
  return (
    <section id="cost" className="v3-sec v3-sec-off">
      <div className="v3-wrap">
        <Reveal><span className="v3-kicker">What it costs to work with us</span><h2 className="v3-h2" style={{ fontFamily: serif }}>Clear from day one</h2></Reveal>
        <div className="v3-fees">
          {FEES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <Tilt className={`v3-fee${f.accent ? " is-accent" : ""}`}>
                <span>{f.title}</span>
                <strong style={{ fontFamily: serif }}>{f.price}</strong>
                <p>{f.note}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <p className="v3-fee-note">Government visa charges, tuition and health cover are paid to those organisations directly. We show you every number before you decide.</p>
      </div>
    </section>
  );
}

function Countdown({ to }: { to: Date }) {
  const [left, setLeft] = useState(() => to.getTime() - Date.now());
  useEffect(() => { const id = setInterval(() => setLeft(to.getTime() - Date.now()), 1000); return () => clearInterval(id); }, [to]);
  const s = Math.max(0, Math.floor(left / 1000));
  const parts = [{ v: Math.floor(s / 86400), l: "days" }, { v: Math.floor((s % 86400) / 3600), l: "hrs" }, { v: Math.floor((s % 3600) / 60), l: "min" }, { v: s % 60, l: "sec" }];
  return (
    <div className="v3-count">
      {parts.map((p) => <div key={p.l}><strong style={{ fontFamily: serif }}>{String(p.v).padStart(2, "0")}</strong><span>{p.l}</span></div>)}
    </div>
  );
}

function Intakes() {
  const intakes = useIntakes();
  const next = intakes?.list.find((i) => intakeStatus(i, intakes.now).tone !== "late");
  return (
    <section id="intakes" className="v3-sec v3-sec-dark v3-intakes">
      <div className="v3-wrap">
        <Reveal><span className="v3-kicker is-light">Intakes</span><h2 className="v3-h2 is-light" style={{ fontFamily: serif }}>Why start planning now?</h2></Reveal>
        <div className="v3-intake-grid">
          <div className="v3-intake-why">
            {[
              "Most courses start in February or July only.",
              "Offers take 2–6 weeks, and visas need time after that.",
              "Popular courses and scholarships fill up early.",
            ].map((t, i) => <Reveal key={t} delay={i * 80} className="v3-why-row"><span>{i + 1}</span>{t}</Reveal>)}
          </div>
          <div className="v3-intake-cards">
            {next && (
              <div className="v3-next">
                <span className="v3-mini is-light">Recommended apply-by for {next.label}</span>
                <Countdown to={next.applyBy} />
              </div>
            )}
            {intakes?.list.map((i) => {
              const st = intakeStatus(i, intakes.now);
              return (
                <div key={i.label} className={`v3-intake is-${st.tone}`}>
                  <div><strong style={{ fontFamily: serif }}>{i.label}</strong><span>Apply by {fmtMonth(i.applyBy)}</span></div>
                  <em>{st.tag}</em>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  return (
    <section className="v3-sec">
      <div ref={ref} className={`v3-wrap v3-reviews${inView ? " is-in" : ""}`}>
        <div className="v3-stars" aria-label="4.8 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} size={44} fill="currentColor" style={{ transitionDelay: `${i * 120}ms` }} />)}
        </div>
        <strong style={{ fontFamily: serif }}>4.8 out of 5</strong>
        <p>From 800+ reviews on Google, by students and families we have helped.</p>
        <Link href="/client-reviews" className="v3-btn v3-btn-line">Read the reviews <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="v3-final">
      <div className="v3-final-marquee" aria-hidden="true">
        <div>{Array.from({ length: 4 }).map((_, i) => <span key={i} style={{ fontFamily: serif }}>Your Australia starts with one chat ✦ </span>)}</div>
      </div>
      <Reveal className="v3-wrap v3-final-inner">
        <h2 className="v3-h2 is-light" style={{ fontFamily: serif }}>Ready when you are.</h2>
        <p className="v3-final-lead">Free first consultation. Course applications at no cost. Registered migration agents in-house.</p>
        <div className="v3-hero-ctas">
          <a href="#plan-form" className="v3-btn v3-btn-yellow v3-btn-lg">Get my free plan <ArrowRight size={18} /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost v3-btn-lg">WhatsApp us</a>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  return (
    <section className="v3-sec v3-sec-off">
      <div className="v3-wrap v3-faq">
        <h2 className="v3-h2" style={{ fontFamily: serif }}>Quick answers</h2>
        <div>
          {V3_FAQS.map((f) => (
            <details key={f.q}><summary>{f.q}<Plus size={20} /></summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

export default function EduV3() {
  // Smooth scrolling (Lenis). Anchor links are handled by Lenis too.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: { offset: -72 }, lerp: 0.1 });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <>
      <Hero />
      <IntakeTicker />
      <FormBand />
      <About />
      <Why />
      <ForYou />
      <Method />
      <Timeline />
      <Twelve />
      <Fees />
      <Intakes />
      <Reviews />
      <Faq />
      <Final />
      <style>{CSS}</style>
    </>
  );
}

const CSS = `
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.v3-wrap { max-width: 1240px; margin: 0 auto; padding: 0 5%; }
#about, #why, #for-you, #timeline, #intakes, #plan-form { scroll-margin-top: 72px; }

.v3-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1); }
.v3-reveal.is-in { opacity: 1; transform: none; }

.v3-kicker { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase; color: var(--blue); margin-bottom: 14px; }
.v3-kicker.is-light { color: var(--yellow); }
.v3-h2 { font-size: clamp(32px, 4.4vw, 56px); line-height: 1.06; letter-spacing: -1px; color: var(--navy); }
.v3-h2.is-light { color: #fff; }
.v3-mini { display: block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--tl); }
.v3-mini.is-light { color: rgba(255,255,255,.6); }

.v3-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 24px; border-radius: 12px; font: inherit; font-weight: 700; font-size: 15px; text-decoration: none; border: none; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s; }
.v3-btn:focus-visible, .v3-tab:focus-visible, .v3-twelve-list button:focus-visible, .v3-faq summary:focus-visible { outline: 3px solid var(--sky); outline-offset: 3px; }
.v3-btn-yellow { background: #eddb3c; color: var(--navy); }
.v3-btn-yellow:hover { background: #e2cf35; transform: translateY(-2px); box-shadow: 0 12px 28px rgba(237,219,60,.35); }
.v3-btn-navy { background: var(--navy); color: #fff; }
.v3-btn-navy:hover { background: var(--blue); transform: translateY(-2px); }
.v3-btn-line { background: transparent; color: var(--navy); border: 2px solid var(--navy); }
.v3-btn-line:hover { background: var(--navy); color: #fff; }
.v3-btn-block { width: 100%; }

/* HERO */
.v3-hero { position: relative; background: radial-gradient(ellipse at 60% 40%, #16357a 0%, #0b1f4a 45%, #060f2a 100%); color: #fff; overflow: hidden; min-height: calc(100vh - 72px); display: flex; align-items: center; }
.v3-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%); -webkit-mask-image: radial-gradient(ellipse at 50% 50%, #000 20%, transparent 75%); }
.v3-globe-wrap { position: relative; display: flex; flex-direction: column; align-items: center; }
.v3-globe { width: min(100%, 84vh, 680px); aspect-ratio: 1; animation: v3GlobeIn 1.6s cubic-bezier(.2,.7,.2,1) both; }
@keyframes v3GlobeIn { from { opacity: 0; transform: scale(.88) translateY(30px); } to { opacity: 1; transform: none; } }
.v3-btn-lg { padding: 16px 28px; font-size: 16px; }
.v3-btn-ghost { background: rgba(255,255,255,.08); color: #fff; border: 1.5px solid rgba(255,255,255,.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.v3-btn-ghost:hover { background: rgba(255,255,255,.16); }
.v3-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; animation: v3FormIn 1s .7s cubic-bezier(.2,.7,.2,1) both; }
.v3-globe-label { position: absolute; left: 0; top: 0; pointer-events: none; transition: opacity .3s; }
.v3-globe-label span { position: absolute; left: 14px; top: -34px; white-space: nowrap; font-size: 12px; font-weight: 700; color: var(--navy); background: var(--yellow); padding: 5px 10px; border-radius: 8px; box-shadow: 0 6px 18px rgba(0,0,0,.3); }
.v3-hero-inner { position: relative; z-index: 2; width: 100%; display: grid; grid-template-columns: 1fr 1.05fr; gap: 24px; align-items: center; padding-top: 32px; padding-bottom: 32px; }
.v3-hero-copy { display: flex; flex-direction: column; gap: 24px; }
.v3-badge { align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; font-size: 13px; padding: 8px 16px; border-radius: 30px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.v3-badge strong { color: var(--yellow); }
.v3-badge-dot { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 0 rgba(61,220,132,.7); animation: v3Ping 1.8s infinite; }
@keyframes v3Ping { to { box-shadow: 0 0 0 12px rgba(61,220,132,0); } }
.v3-hero h1 { font-size: clamp(42px, min(5.6vw, 10.5vh), 92px); line-height: .98; letter-spacing: -2px; text-shadow: 0 4px 30px rgba(0,0,0,.35); }
.v3-hero h1 em { color: var(--yellow); font-style: italic; }
.v3-word { display: inline-block; opacity: 0; transform: translateY(40%) rotate(3deg); animation: v3Word .9s cubic-bezier(.2,.7,.2,1) forwards; }
@keyframes v3Word { to { opacity: 1; transform: none; } }
.v3-hero-lead { font-size: 18px; line-height: 1.6; color: rgba(255,255,255,.78); max-width: 460px; text-shadow: 0 2px 16px rgba(0,0,0,.4); }
.v3-hero-trust { list-style: none; display: flex; flex-wrap: wrap; gap: 8px 22px; font-size: 14px; color: rgba(255,255,255,.85); }
.v3-hero-trust li { display: flex; align-items: center; gap: 7px; }
.v3-hero-trust svg { color: var(--yellow); }
.v3-globe-legend { display: flex; align-items: flex-start; gap: 10px; max-width: 420px; margin-top: -6px; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,.65); }
.v3-globe-legend i { flex-shrink: 0; width: 26px; height: 2px; margin-top: 9px; background: linear-gradient(90deg, transparent, var(--yellow)); border-radius: 2px; }

/* FORM BAND */
.v3-formband { background: linear-gradient(180deg, #060f2a, #0b1f4a); color: #fff; padding: 100px 0; }
.v3-formband-grid { display: grid; grid-template-columns: 1fr 520px; gap: 64px; align-items: center; }
.v3-formband-copy .v3-final-list { margin-top: 28px; }

/* FORM */
.v3-form { background: rgba(255,255,255,.97); color: var(--td); border-radius: 22px; padding: 26px; box-shadow: 0 40px 80px rgba(0,0,0,.35); display: flex; flex-direction: column; gap: 12px; animation: v3FormIn 1s .4s cubic-bezier(.2,.7,.2,1) both; }
@keyframes v3FormIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
.v3-form-head strong { display: block; font-family: ${serif}; font-size: 24px; color: var(--navy); }
.v3-form-head span { font-size: 13px; color: var(--tl); }
.v3-field { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.v3-field > span { font-size: 12px; font-weight: 600; color: var(--tm); }
.v3-field input, .v3-field select { font: inherit; font-size: 15px; padding: 11px 12px; border-radius: 10px; border: 1.5px solid var(--border); background: var(--off); color: var(--td); transition: border-color .2s, background .2s; width: 100%; }
.v3-field input:focus, .v3-field select:focus { outline: none; border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(46,109,180,.15); }
.v3-field [aria-invalid="true"] { border-color: #d64545; }
.v3-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.v3-err { font-size: 12px; color: #c03434; }
.v3-consent { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--tm); cursor: pointer; }
.v3-consent input { margin-top: 3px; width: 16px; height: 16px; accent-color: var(--navy); }
.v3-form-safe { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: var(--tl); }
.v3-form-done { align-items: center; text-align: center; padding: 36px 28px; }
.v3-form-check { width: 64px; height: 64px; border-radius: 50%; background: var(--yellow); color: var(--navy); display: grid; place-items: center; animation: v3Pop .5s cubic-bezier(.2,1.4,.4,1) both; }
@keyframes v3Pop { from { transform: scale(0); } to { transform: scale(1); } }
.v3-form-done h3 { font-family: ${serif}; font-size: 26px; color: var(--navy); }
.v3-form-done p { color: var(--tm); line-height: 1.6; }
.v3-form-link { background: none; border: none; color: var(--blue); font: inherit; font-size: 14px; cursor: pointer; text-decoration: underline; }

/* TICKER */
.v3-ticker { background: var(--yellow); color: var(--navy); overflow: hidden; padding: 16px 0; border-block: 2px solid var(--navy); }
.v3-ticker-track { display: flex; width: max-content; animation: v3Marq 38s linear infinite; }
.v3-ticker-track span { display: inline-flex; align-items: center; gap: 22px; padding-right: 22px; font-size: 15px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; white-space: nowrap; }
.v3-ticker-track i { font-style: normal; color: var(--blue); }
@keyframes v3Marq { to { transform: translateX(-33.333%); } }

/* SECTIONS */
.v3-sec { padding: 120px 0; background: #fff; }
.v3-sec-off { background: var(--off); }
.v3-sec-dark { background: radial-gradient(ellipse at 20% 0%, #16357a, #0b1f4a 50%, #060f2a); color: #fff; }

/* ABOUT */
.v3-about-text { font-size: clamp(30px, 4.2vw, 58px); line-height: 1.18; letter-spacing: -1px; max-width: 1080px; }
.v3-about-text span { color: #D5DCEA; transition: color .4s; }
.v3-about-text span.is-on { color: var(--navy); }
.v3-counters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 80px; border-top: 1px solid var(--border); padding-top: 40px; }
.v3-counters strong { display: block; font-size: clamp(44px, 5vw, 68px); color: var(--navy); line-height: 1; }
.v3-counters span { display: block; margin-top: 10px; font-size: 14px; color: var(--tm); }

/* WHY */
.v3-usps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 56px; }
.v3-tilt { transition: transform .25s ease; transform-style: preserve-3d; will-change: transform; }
.v3-usp { position: relative; height: 100%; min-height: 300px; padding: 28px; border-radius: 22px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); display: flex; flex-direction: column; gap: 10px; overflow: hidden; }
.v3-usp::before { content: ""; position: absolute; inset: 0; background: radial-gradient(400px circle at var(--mx, 50%) var(--my, 0%), rgba(245,197,24,.18), transparent 50%); opacity: 0; transition: opacity .3s; }
.v3-usp:hover::before { opacity: 1; }
.v3-usp-k { font-size: 64px; line-height: 1; color: transparent; -webkit-text-stroke: 1.5px var(--yellow); margin-bottom: auto; }
.v3-usp strong { font-size: 20px; position: relative; }
.v3-usp p { font-size: 15px; line-height: 1.55; color: rgba(255,255,255,.7); position: relative; }

/* WHO */
.v3-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin: 40px 0 28px; }
.v3-tab { font: inherit; font-size: 14px; font-weight: 600; padding: 11px 18px; border-radius: 40px; border: 1.5px solid var(--border); background: #fff; color: var(--tm); cursor: pointer; transition: all .2s; }
.v3-tab:hover { border-color: var(--navy); color: var(--navy); }
.v3-tab.is-on { background: var(--navy); color: #fff; border-color: var(--navy); }
.v3-persona { display: grid; grid-template-columns: 1.1fr 1fr; gap: 0; border-radius: 28px; overflow: hidden; background: var(--off); border: 1px solid var(--border); min-height: 440px; }
.v3-persona-img { position: relative; min-height: 300px; overflow: hidden; }
.v3-persona-img img { object-fit: cover; opacity: 0; transform: scale(1.08); transition: opacity .7s ease, transform 1.4s ease; }
.v3-persona-img img.is-on { opacity: 1; transform: none; }
.v3-persona-body { padding: 44px; display: flex; flex-direction: column; gap: 14px; justify-content: center; animation: v3Slide .55s ease both; }
@keyframes v3Slide { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
.v3-persona-body h3 { font-size: 34px; color: var(--navy); line-height: 1.1; }
.v3-persona-body > p { font-size: 17px; color: var(--tm); margin-bottom: 10px; }
.v3-persona-body ol { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.v3-persona-body li { display: flex; align-items: center; gap: 12px; font-weight: 600; color: var(--td); animation: v3Slide .5s ease both; }
.v3-persona-body li span { width: 30px; height: 30px; border-radius: 50%; background: var(--yellow); color: var(--navy); display: grid; place-items: center; font-size: 13px; font-weight: 800; flex-shrink: 0; }
.v3-persona-body .v3-btn { align-self: flex-start; }

/* METHOD */
.v3-method { display: grid; grid-template-columns: 300px 1fr; gap: 64px; align-items: center; }
.v3-method-badge { position: relative; width: 260px; aspect-ratio: 1; display: grid; place-items: center; }
.v3-method-badge svg { position: absolute; inset: 0; width: 100%; height: 100%; animation: v3Spin 22s linear infinite; }
.v3-method-badge text { font-size: 15px; font-weight: 800; letter-spacing: 4px; fill: var(--navy); }
.v3-method-badge > span { width: 140px; height: 140px; border-radius: 50%; background: var(--navy); color: var(--yellow); display: grid; place-items: center; font-family: ${serif}; font-size: 30px; font-weight: 700; box-shadow: 0 20px 40px rgba(28,58,138,.3); }
@keyframes v3Spin { to { transform: rotate(360deg); } }
.v3-method-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 36px; }
.v3-method-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 28px; }
.v3-method-card strong { display: block; font-size: 19px; color: var(--navy); margin-bottom: 8px; }
.v3-method-card p { font-size: 15px; color: var(--tm); line-height: 1.6; }

/* TIMELINE (pinned horizontal) */
.v3-timeline { position: relative; height: calc(100vh + var(--dist, 1200px)); background: radial-gradient(ellipse at 80% 0%, #16357a, #0b1f4a 50%, #060f2a); color: #fff; }
.v3-tl-sticky { position: sticky; top: 72px; height: calc(100vh - 72px); overflow: hidden; display: flex; flex-direction: column; justify-content: center; gap: 36px; }
.v3-tl-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; width: 100%; }
.v3-tl-weeks { display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: var(--yellow); white-space: nowrap; }
.v3-tl-rail { height: 3px; background: rgba(255,255,255,.12); margin: 0 5%; border-radius: 3px; overflow: hidden; }
.v3-tl-rail span { display: block; height: 100%; background: var(--yellow); transform-origin: left; }
.v3-tl-track { display: flex; gap: 22px; padding: 0 5%; width: max-content; will-change: transform; }
.v3-tl-card { position: relative; width: 320px; min-height: 250px; padding: 30px 28px; border-radius: 24px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); display: flex; flex-direction: column; gap: 10px; opacity: .35; transform: scale(.96); transition: opacity .5s, transform .5s, background .5s, border-color .5s; }
.v3-tl-card.is-on { opacity: 1; transform: none; background: rgba(255,255,255,.08); border-color: rgba(245,197,24,.35); }
.v3-tl-card.is-last.is-on { background: var(--yellow); color: var(--navy); }
.v3-tl-card.is-last.is-on em, .v3-tl-card.is-last.is-on p { color: var(--navy); }
.v3-tl-dot { width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--yellow); margin-bottom: 8px; }
.v3-tl-card.is-on .v3-tl-dot { background: var(--yellow); box-shadow: 0 0 20px rgba(245,197,24,.7); }
.v3-tl-card em { font-style: normal; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--yellow); }
.v3-tl-card strong { font-size: 28px; line-height: 1.15; }
.v3-tl-card p { font-size: 15px; color: rgba(255,255,255,.7); }
.v3-tl-note { font-size: 12px; color: rgba(255,255,255,.45); width: 100%; }

/* TWELVE */
.v3-twelve { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 48px; align-items: start; }
.v3-twelve-list { list-style: none; border-top: 1px solid var(--border); }
.v3-twelve-list li { border-bottom: 1px solid var(--border); }
.v3-twelve-list button { width: 100%; display: flex; align-items: center; gap: 18px; padding: 16px 6px; background: none; border: none; font: inherit; font-size: 17px; font-weight: 500; color: var(--tm); text-align: left; cursor: pointer; transition: color .25s, padding .25s; }
.v3-twelve-list button span { font-size: 13px; font-weight: 700; color: var(--tl); width: 24px; }
.v3-twelve-list button.is-on { color: var(--navy); font-weight: 700; padding-left: 16px; }
.v3-twelve-list button.is-on span { color: var(--blue); }
.v3-twelve-show { position: sticky; top: 120px; background: var(--navy); color: #fff; border-radius: 28px; padding: 44px; min-height: 380px; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; }
.v3-twelve-num { font-size: 150px; line-height: .9; color: transparent; -webkit-text-stroke: 2px var(--yellow); animation: v3Num .6s cubic-bezier(.2,.7,.2,1) both; }
@keyframes v3Num { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
.v3-twelve-show strong { font-size: clamp(26px, 2.6vw, 36px); line-height: 1.2; animation: v3Num .6s .08s cubic-bezier(.2,.7,.2,1) both; }
.v3-twelve-bar { height: 4px; background: rgba(255,255,255,.12); border-radius: 4px; margin-top: 28px; }
.v3-twelve-bar span { display: block; height: 100%; background: var(--yellow); border-radius: 4px; transition: width .5s; }

/* FEES */
.v3-fees { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 48px; }
.v3-fee { height: 100%; background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 32px; display: flex; flex-direction: column; gap: 8px; }
.v3-fee span { font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--tl); }
.v3-fee strong { font-size: 54px; color: var(--navy); line-height: 1.05; }
.v3-fee p { font-size: 15px; color: var(--tm); line-height: 1.55; }
.v3-fee.is-accent { background: var(--navy); border-color: var(--navy); }
.v3-fee.is-accent span { color: rgba(255,255,255,.6); }
.v3-fee.is-accent strong { color: var(--yellow); }
.v3-fee.is-accent p { color: rgba(255,255,255,.75); }
.v3-fee-note { margin-top: 24px; font-size: 14px; color: var(--tm); max-width: 680px; }

/* INTAKES */
.v3-intake-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; margin-top: 48px; align-items: start; }
.v3-intake-why { display: flex; flex-direction: column; gap: 14px; }
.v3-why-row { display: flex; gap: 16px; align-items: center; font-size: 19px; line-height: 1.4; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,.12); }
.v3-why-row span { width: 40px; height: 40px; flex-shrink: 0; border-radius: 50%; border: 2px solid var(--yellow); color: var(--yellow); display: grid; place-items: center; font-weight: 800; }
.v3-intake-cards { display: flex; flex-direction: column; gap: 12px; }
.v3-next { background: var(--yellow); color: var(--navy); border-radius: 22px; padding: 24px 26px; }
.v3-next .v3-mini { color: var(--navy); opacity: .7; }
.v3-count { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 12px; }
.v3-count div { background: rgba(28,58,138,.1); border-radius: 14px; padding: 12px 0; text-align: center; }
.v3-count strong { display: block; font-size: 40px; line-height: 1; font-variant-numeric: tabular-nums; }
.v3-count span { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
.v3-intake { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 18px 22px; border-radius: 18px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); }
.v3-intake strong { display: block; font-size: 22px; }
.v3-intake span { font-size: 13px; color: rgba(255,255,255,.6); }
.v3-intake em { font-style: normal; font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 20px; white-space: nowrap; }
.v3-intake.is-late em { background: rgba(255,255,255,.12); color: rgba(255,255,255,.8); }
.v3-intake.is-soon em { background: #ffb547; color: #3a2400; }
.v3-intake.is-open em { background: #3ddc84; color: #04341b; }

/* REVIEWS */
.v3-reviews { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.v3-stars { display: flex; gap: 6px; color: #E2E7F1; }
.v3-stars svg { transition: color .5s, transform .5s cubic-bezier(.2,1.6,.4,1); transform: scale(.6); }
.v3-reviews.is-in .v3-stars svg { color: var(--yellow); transform: scale(1); }
.v3-reviews > strong { font-size: clamp(40px, 5vw, 64px); color: var(--navy); line-height: 1; }
.v3-reviews p { font-size: 17px; color: var(--tm); max-width: 440px; margin-bottom: 10px; }

/* FAQ */
.v3-faq { display: grid; grid-template-columns: 1fr 1.6fr; gap: 56px; align-items: start; }
.v3-faq details { border-bottom: 1px solid var(--border); }
.v3-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; cursor: pointer; padding: 22px 0; font-size: 18px; font-weight: 600; color: var(--td); }
.v3-faq summary::-webkit-details-marker { display: none; }
.v3-faq summary svg { color: var(--blue); transition: transform .25s; flex-shrink: 0; }
.v3-faq details[open] summary svg { transform: rotate(45deg); }
.v3-faq details p { padding: 0 0 22px; color: var(--tm); line-height: 1.65; }

/* FINAL */
.v3-final { background: radial-gradient(ellipse at 50% 100%, #16357a, #0b1f4a 55%, #060f2a); color: #fff; padding: 0 0 120px; overflow: hidden; }
.v3-final-marquee { padding: 40px 0 80px; overflow: hidden; }
.v3-final-marquee div { display: flex; width: max-content; animation: v3Marq2 30s linear infinite; }
.v3-final-marquee span { font-size: clamp(56px, 9vw, 140px); font-weight: 700; white-space: nowrap; color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.25); padding-right: 40px; }
@keyframes v3Marq2 { to { transform: translateX(-50%); } }
.v3-final-inner { display: flex; flex-direction: column; align-items: center; text-align: center; }
.v3-final-inner .v3-hero-ctas { justify-content: center; animation: none; }
.v3-final-lead { font-size: 18px; line-height: 1.6; color: rgba(255,255,255,.75); margin: 18px 0 30px; max-width: 520px; }
.v3-final-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.v3-final-list li { display: flex; align-items: center; gap: 10px; font-size: 16px; }
.v3-final-list svg { color: var(--navy); background: var(--yellow); border-radius: 50%; padding: 3px; width: 22px; height: 22px; }

@media (prefers-reduced-motion: reduce) {
  .v3-word, .v3-form, .v3-globe { animation: none !important; opacity: 1 !important; transform: none; }
  .v3-ticker-track, .v3-final-marquee div, .v3-method-badge svg { animation: none !important; }
  .v3-reveal { opacity: 1; transform: none; transition: none; }
}

@media (max-width: 1100px) {
  .v3-hero-inner { grid-template-columns: 1fr; gap: 0; padding-top: 40px; }
  .v3-globe { width: min(100%, 520px); }
  .v3-hero-copy { gap: 20px; }
  .v3-formband-grid { grid-template-columns: 1fr; gap: 36px; }
  .v3-usps { grid-template-columns: repeat(2, 1fr); }
  .v3-counters { grid-template-columns: repeat(2, 1fr); row-gap: 40px; }
  .v3-persona { grid-template-columns: 1fr; }
  .v3-method { grid-template-columns: 1fr; gap: 24px; }
  .v3-method-badge { width: 180px; }
  .v3-method-badge > span { width: 100px; height: 100px; font-size: 22px; }
  .v3-twelve, .v3-intake-grid, .v3-faq { grid-template-columns: 1fr; gap: 32px; }
  .v3-twelve-show { position: relative; top: 0; min-height: 0; order: -1; }
  .v3-twelve-num { font-size: 96px; }
  .v3-fees { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  /* Timeline becomes a vertical list */
  .v3-timeline { height: auto !important; padding: 96px 0; }
  .v3-tl-sticky { position: static; height: auto; overflow: visible; }
  .v3-tl-rail { display: none; }
  .v3-tl-track { transform: none !important; flex-direction: column; width: auto; }
  .v3-tl-card { width: auto; min-height: 0; opacity: 1; transform: none; }
  .v3-tl-head { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 700px) {
  .v3-sec { padding: 80px 0; }
  .v3-hero-inner { padding-top: 32px; }
  .v3-hero h1 { letter-spacing: -1px; }
  .v3-hero-lead { font-size: 16px; }
  .v3-globe-legend { font-size: 12px; }
  .v3-form { padding: 20px; }
  .v3-field-row { grid-template-columns: 1fr; }
  .v3-usps { grid-template-columns: 1fr; }
  .v3-usp { min-height: 220px; }
  .v3-persona-body { padding: 26px; }
  .v3-persona-body h3 { font-size: 26px; }
  .v3-method-cards { grid-template-columns: 1fr; }
  .v3-twelve-list button { font-size: 15px; padding: 14px 4px; }
  .v3-twelve-show { padding: 28px; }
  .v3-fee strong { font-size: 42px; }
  .v3-count strong { font-size: 30px; }
  .v3-why-row { font-size: 16px; }
  .v3-intake { flex-direction: column; align-items: flex-start; }
}
`;

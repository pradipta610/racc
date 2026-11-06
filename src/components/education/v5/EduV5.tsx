"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowLeft, Star, ShieldCheck, MapPin, Languages, Copy, Check, ExternalLink, Phone, Mail, Clock,
  X as XIcon, MessageCircle, Plus, Lock,
} from "lucide-react";
import { WHATSAPP_URL } from "../eduData";
import {
  OMARA_URL, MARNS, OFFICE, GREETINGS, BELIEFS, COMPARE, NEEDS, WHERE, EDU, V5_FAQS, HOW, STUDY_LEVELS, V5_ROUTES, GLOSSARY,
} from "./v5Data";

const serif = "var(--font-playfair), 'Playfair Display', serif";

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
  return <div ref={ref} className={`v5-reveal${shown ? " is-in" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>;
}

function Head({ kicker, title, sub, center }: { kicker: string; title: string; sub?: string; center?: boolean }) {
  return (
    <Reveal className={`v5-head${center ? " is-center" : ""}`}>
      <span className="v5-kicker">{kicker}</span>
      <h2 style={{ fontFamily: serif }}>{title}</h2>
      {sub && <p>{sub}</p>}
    </Reveal>
  );
}

/* ---------- Hero ---------- */

function Greeting() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % GREETINGS.length), 1900);
    return () => clearInterval(id);
  }, []);
  const g = GREETINGS[i];
  return (
    <span className="v5-greet" aria-label="Hello in nine languages">
      <span key={i} className="v5-greet-word">{g.word}</span>
      <span key={`l${i}`} className="v5-greet-lang">{g.lang}</span>
    </span>
  );
}

function Hero() {
  return (
    <section className="v5-hero">
      <div className="v5-wrap v5-hero-grid">
        <div className="v5-hero-copy">
          <Greeting />
          <h1 style={{ fontFamily: serif }}>We&apos;re RACC. Honest advice for students coming to Australia, <em>for 20+ years.</em></h1>
          <p className="v5-lead">A Melbourne education agency. We help you choose a course, apply to the school and get your student visa. We tell you what will actually work, then help you do it.</p>
          <div className="v5-ctas">
            <a href="#check" className="v5-btn v5-btn-main">Get a free profile check <ArrowRight size={18} /></a>
            <a href="#credentials" className="v5-btn v5-btn-line">Check our credentials</a>
          </div>
        </div>
        <div className="v5-hero-visual">
          <div className="v5-hero-photo">
            <Image src="/education/city-melbourne.jpg" alt="Flinders Street Station in Melbourne, near the RACC office" fill priority sizes="(max-width: 900px) 100vw, 540px" />
          </div>
          <div className="v5-card v5-card-marn">
            <ShieldCheck size={22} />
            <div><strong>Student visas by registered agents</strong><span>MARN {MARNS.join(" · ")}</span></div>
          </div>
          <div className="v5-card v5-card-rating">
            <div className="v5-stars">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={14} fill="currentColor" />)}</div>
            <strong style={{ fontFamily: serif }}>4.8</strong>
            <span>800+ Google reviews</span>
          </div>
          <div className="v5-card v5-card-pin">
            <MapPin size={18} />
            <span>Melbourne CBD office</span>
          </div>
        </div>
      </div>
      <div className="v5-wrap">
        <ul className="v5-proof">
          <li><ShieldCheck size={20} /><div><strong>Registered agents</strong><span>MARNs publicly listed</span></div></li>
          <li><MapPin size={20} /><div><strong>Real office</strong><span>343 Little Collins St</span></div></li>
          <li><Star size={20} /><div><strong>4.8 on Google</strong><span>800+ reviews</span></div></li>
          <li><Languages size={20} /><div><strong>12+ languages</strong><span>Ask in yours</span></div></li>
        </ul>
      </div>
    </section>
  );
}

/* ---------- Language marquee ---------- */

function LangMarquee() {
  const row = [...GREETINGS, ...GREETINGS];
  return (
    <div className="v5-marquee" aria-hidden="true">
      <div className="v5-marquee-track">
        {[...row, ...row].map((g, i) => <span key={i} style={{ fontFamily: serif }}>{g.word}<i>✦</i></span>)}
      </div>
    </div>
  );
}

/* ---------- Start here (explainer for students who are new to all this) ---------- */

function StartHere() {
  const [routeId, setRouteId] = useState(V5_ROUTES[0].id);
  const route = V5_ROUTES.find((r) => r.id === routeId)!;
  return (
    <section id="start" className="v5-sec v5-start">
      <div className="v5-wrap">
        <Head kicker="New to this? Start here" title="How studying in Australia works" sub="Five steps from where you are now to your first class. We walk you through every one." center />

        <div className="v5-how">
          {HOW.map(({ icon: Icon, title, sub }, i) => (
            <Reveal key={title} delay={i * 80} className="v5-how-step">
              <div className="v5-how-icon"><Icon size={24} /><span>{i + 1}</span></div>
              <strong>{title}</strong>
              <p>{sub}</p>
            </Reveal>
          ))}
        </div>

        <div className="v5-start-grid">
          <Reveal className="v5-box v5-route-box">
            <h3 style={{ fontFamily: serif }}>Where are you starting from?</h3>
            <div className="v5-route-chips" role="tablist" aria-label="Your current situation">
              {V5_ROUTES.map((r) => {
                const Icon = r.icon;
                const on = r.id === routeId;
                return (
                  <button key={r.id} role="tab" aria-selected={on} className={`v5-rchip${on ? " is-on" : ""}`} onClick={() => setRouteId(r.id)}>
                    <Icon size={16} /> {r.chip}
                  </button>
                );
              })}
            </div>
            <ol key={route.id} className="v5-route">
              {route.steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.label} style={{ animationDelay: `${i * 90}ms` }} className={i === route.steps.length - 1 ? "is-goal" : ""}>
                    <span className="v5-route-icon"><Icon size={18} /></span>
                    <div><strong>{s.label}</strong><em>{s.time}</em></div>
                  </li>
                );
              })}
            </ol>
            <p className="v5-small">Example routes. Your real plan depends on your grades and goals, so we check it with you first.</p>
          </Reveal>

          <Reveal delay={100} className="v5-box v5-levels-box">
            <h3 style={{ fontFamily: serif }}>Study levels at a glance</h3>
            <ul className="v5-levels">
              {STUDY_LEVELS.map((l, i) => (
                <li key={l.label}>
                  <div><strong>{l.label}</strong><span>{l.time}</span></div>
                  <i><b style={{ width: `${l.w}%`, transitionDelay: `${i * 120}ms` }} /></i>
                </li>
              ))}
            </ul>
            <p className="v5-small">A diploma can count towards a bachelor, so you don&apos;t always start from zero.</p>
          </Reveal>
        </div>

        <Reveal className="v5-gloss-wrap">
          <h3 style={{ fontFamily: serif }}>Words you&apos;ll hear, explained</h3>
          <dl className="v5-gloss">
            {GLOSSARY.map((g) => (
              <div key={g.term}>
                <dt><span>{g.term}</span>{g.full}</dt>
                <dd>{g.def}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="v5-start-cta">
          <span>Still unsure? That&apos;s normal.</span>
          <a href="#check" className="v5-btn v5-btn-main">Ask us for free <ArrowRight size={18} /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Beliefs ---------- */

function Believe() {
  return (
    <section id="believe" className="v5-sec">
      <div className="v5-wrap">
        <Head kicker="What we believe" title="Three things we won't compromise on" />
        <div className="v5-beliefs">
          {BELIEFS.map((b, i) => (
            <Reveal key={b.n} delay={i * 100} className="v5-belief">
              <span className="v5-belief-n" style={{ fontFamily: serif }}>{b.n}</span>
              <strong style={{ fontFamily: serif }}>{b.title}</strong>
              <p>{b.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Credentials ---------- */

function Credentials() {
  const [copied, setCopied] = useState("");
  const copy = async (m: string) => {
    try { await navigator.clipboard.writeText(m); setCopied(m); setTimeout(() => setCopied(""), 1600); } catch { /* clipboard blocked */ }
  };
  return (
    <section id="credentials" className="v5-sec v5-sec-navy">
      <div className="v5-wrap v5-cred-grid">
        <div>
          <span className="v5-kicker is-light">Credentials</span>
          <h2 className="is-light" style={{ fontFamily: serif }}>Don&apos;t take our word for it. Check.</h2>
          <p className="v5-cred-lead">Your student visa is prepared by our registered agents. Each one has a MARN listed on the Australian Government&apos;s official register. Copy ours and look them up.</p>
          <a href={OMARA_URL} target="_blank" rel="noopener noreferrer" className="v5-btn v5-btn-main">Open the official register <ExternalLink size={16} /></a>
        </div>
        <div className="v5-marns">
          {MARNS.map((m, i) => (
            <Reveal key={m} delay={i * 90} className="v5-marn">
              <div>
                <span>MARN</span>
                <strong style={{ fontFamily: serif }}>{m}</strong>
              </div>
              <button onClick={() => copy(m)} aria-label={`Copy MARN ${m}`}>
                {copied === m ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </button>
            </Reveal>
          ))}
          <p className="v5-marn-note"><ShieldCheck size={14} /> Registration means agents follow the Code of Conduct and keep their training current.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

function Compare() {
  return (
    <section id="compare" className="v5-sec v5-sec-off">
      <div className="v5-wrap">
        <Head kicker="How we help" title="Doing it alone vs. doing it with us" sub="Plenty of students apply on their own. Here's what changes when you don't." center />
        <div className="v5-compare" role="table" aria-label="Doing it alone compared with RACC">
          <div className="v5-cmp-row v5-cmp-headrow" role="row">
            <span role="columnheader" />
            <span role="columnheader">On your own</span>
            <span role="columnheader" className="is-racc">With RACC</span>
          </div>
          {COMPARE.map((c, i) => (
            <Reveal key={c.topic} delay={i * 60}>
              <div className="v5-cmp-row" role="row">
                <strong role="rowheader">{c.topic}</strong>
                <span role="cell" className="v5-cmp-alone"><XIcon size={16} /> {c.alone}</span>
                <span role="cell" className="v5-cmp-racc"><Check size={16} /> {c.racc}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Office ---------- */

function Office() {
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  return (
    <section id="office" className="v5-sec">
      <div className="v5-wrap v5-office">
        <div>
          <Head kicker="Visit us" title="A real office, with real people" sub="Drop by our Melbourne office, or meet us online from anywhere." />
          <ul className="v5-office-list">
            <li><MapPin size={20} /><div><strong>{OFFICE.line1}</strong><span>{OFFICE.line2}</span></div></li>
            <li><Clock size={20} /><div><strong>{OFFICE.hours}</strong><span>Melbourne time</span></div></li>
            <li><Phone size={20} /><div><a href={OFFICE.phoneHref}><strong>{OFFICE.phone}</strong></a><span>Call us</span></div></li>
            <li><Mail size={20} /><div><a href={`mailto:${OFFICE.email}`}><strong>{OFFICE.email}</strong></a><span>Email us anytime</span></div></li>
          </ul>
          <a href={OFFICE.mapLink} target="_blank" rel="noopener noreferrer" className="v5-btn v5-btn-line">Get directions <ExternalLink size={16} /></a>
        </div>
        <div ref={ref} className="v5-map">
          {inView ? (
            <iframe title="Map of the RACC office in Melbourne" src={OFFICE.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : <div className="v5-map-ph" />}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews strip ---------- */

function Reviews() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  return (
    <section className="v5-reviews">
      <div ref={ref} className={`v5-wrap v5-reviews-inner${inView ? " is-in" : ""}`}>
        <div className="v5-stars-big">{[0, 1, 2, 3, 4].map((s) => <Star key={s} size={34} fill="currentColor" style={{ transitionDelay: `${s * 110}ms` }} />)}</div>
        <div>
          <strong style={{ fontFamily: serif }}>4.8 out of 5 on Google</strong>
          <span>800+ reviews from students and families we have helped.</span>
        </div>
        <Link href="/client-reviews" className="v5-btn v5-btn-line">Read reviews <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

/* ---------- Lead wizard ---------- */

function LeadWizard() {
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState("");
  const [where, setWhere] = useState("");
  const [edu, setEdu] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");
  const [link, setLink] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return setErr("Please enter your name.");
    if (phone.replace(/\D/g, "").length < 8) return setErr("Please enter your WhatsApp number.");
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return setErr("Please check your email.");
    if (!consent) return setErr("Please tick the box so we can contact you.");
    setErr("");
    const msg = [
      "Hi RACC, I'd like a free profile check.",
      `Name: ${name}`, `WhatsApp: ${phone}`, email && `Email: ${email}`,
      `Need help with: ${need}`, `Location: ${where}`, `Highest education: ${edu}`,
    ].filter(Boolean).join("\n");
    setLink(`${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`);
  };

  if (link) {
    return (
      <div className="v5-wiz v5-wiz-done">
        <span className="v5-done-icon"><Check size={30} /></span>
        <h3 style={{ fontFamily: serif }}>Thanks, {name.split(" ")[0]}.</h3>
        <p>Tap below to send your details to our team on WhatsApp. We&apos;ll look at your profile and reply with honest options.</p>
        <a href={link} target="_blank" rel="noopener noreferrer" className="v5-btn v5-btn-main v5-btn-block"><MessageCircle size={18} /> Send on WhatsApp</a>
        <button className="v5-link" onClick={() => setLink("")}>Edit my details</button>
      </div>
    );
  }

  const choice = (opts: string[], value: string, set: (v: string) => void, next: number) => (
    <div className="v5-choices">
      {opts.map((o) => (
        <button key={o} type="button" className={`v5-choice${value === o ? " is-on" : ""}`} aria-pressed={value === o} onClick={() => { set(o); if (next >= 0) setStep(next); }}>
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <form className="v5-wiz" onSubmit={submit} noValidate>
      <div className="v5-wiz-top">
        <span>Step {step + 1} of 3</span>
        <div className="v5-wiz-bar"><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      </div>

      {step === 0 && (
        <div className="v5-wiz-step" key="s0">
          <h3 style={{ fontFamily: serif }}>What do you need help with?</h3>
          {choice(NEEDS, need, setNeed, 1)}
        </div>
      )}
      {step === 1 && (
        <div className="v5-wiz-step" key="s1">
          <h3 style={{ fontFamily: serif }}>Tell us about you</h3>
          <span className="v5-wiz-label">Where are you now?</span>
          {choice(WHERE, where, setWhere, -1)}
          <span className="v5-wiz-label">Highest education</span>
          {choice(EDU, edu, setEdu, -1)}
          <button type="button" className="v5-btn v5-btn-main v5-btn-block" disabled={!where || !edu} onClick={() => setStep(2)}>Continue <ArrowRight size={18} /></button>
        </div>
      )}
      {step === 2 && (
        <div className="v5-wiz-step" key="s2">
          <h3 style={{ fontFamily: serif }}>Where should we reply?</h3>
          <label className="v5-field"><span>Full name</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label className="v5-field"><span>WhatsApp number</span><input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="+62 …" /></label>
          <label className="v5-field"><span>Email <em>(optional)</em></span><input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" /></label>
          <label className="v5-consent"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> <span>I agree RACC may contact me about my profile.</span></label>
          {err && <p className="v5-err" role="alert">{err}</p>}
          <button type="submit" className="v5-btn v5-btn-main v5-btn-block">Get my free profile check <ArrowRight size={18} /></button>
          <p className="v5-safe"><Lock size={12} /> Your details go only to the RACC team.</p>
        </div>
      )}

      {step > 0 && <button type="button" className="v5-link v5-back" onClick={() => setStep(step - 1)}><ArrowLeft size={15} /> Back</button>}
    </form>
  );
}

function Check5() {
  return (
    <section id="check" className="v5-sec v5-check">
      <div className="v5-wrap v5-check-grid">
        <div>
          <span className="v5-kicker">Free profile check</span>
          <h2 style={{ fontFamily: serif }}>Find out what&apos;s possible for you. Honestly.</h2>
          <p className="v5-lead">Answer three quick questions. Our team reviews your profile and replies with options that fit, including if now isn&apos;t the right time.</p>
          <ul className="v5-check-list">
            {["Free, with no obligation", "Reviewed by people, not a bot", "Reply in your language"].map((t) => <li key={t}><Check size={16} /> {t}</li>)}
          </ul>
        </div>
        <LeadWizard />
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="v5-sec v5-sec-off">
      <div className="v5-wrap v5-faq">
        <h2 style={{ fontFamily: serif }}>Questions about trusting an agent</h2>
        <div>
          {V5_FAQS.map((f) => (
            <details key={f.q}><summary>{f.q}<Plus size={20} /></summary><p>{f.a}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EduV5() {
  return (
    <>
      <Hero />
      <LangMarquee />
      <StartHere />
      <Believe />
      <Credentials />
      <Compare />
      <Office />
      <Reviews />
      <Check5 />
      <Faq />
      <style>{CSS}</style>
    </>
  );
}

const CSS = `
.v5-wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
#start, #believe, #credentials, #compare, #office, #check { scroll-margin-top: 72px; }

/* START HERE */
.v5-sec.v5-start { background: #FBF9F3; }
.v5-how { list-style: none; display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; position: relative; margin-bottom: 40px; }
.v5-how::before { content: ""; position: absolute; top: 32px; left: 10%; right: 10%; border-top: 3px dashed #E3DCC8; }
.v5-how-step { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
.v5-how-icon { position: relative; width: 64px; height: 64px; border-radius: 20px; background: #fff; color: var(--navy); border: 2px solid var(--navy); display: grid; place-items: center; margin-bottom: 6px; box-shadow: 0 8px 20px rgba(28,58,138,.1); }
.v5-how-step:last-child .v5-how-icon { background: var(--yellow); border-color: var(--yellow); }
.v5-how-icon span { position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: var(--navy); color: #fff; font-size: 12px; font-weight: 800; display: grid; place-items: center; }
.v5-how-step strong { font-size: 16px; color: var(--td); line-height: 1.3; }
.v5-how-step p { font-size: 14px; color: var(--tm); line-height: 1.5; }
.v5-start-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 20px; }
.v5-box { background: #fff; border: 1px solid #ECE6D6; border-radius: 24px; padding: 28px; }
.v5-box h3, .v5-gloss-wrap h3 { font-size: 24px; color: var(--navy); margin-bottom: 18px; }
.v5-route-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 22px; }
.v5-rchip { display: inline-flex; align-items: center; gap: 6px; font: inherit; font-size: 13px; font-weight: 600; padding: 9px 14px; border-radius: 30px; border: 1.5px solid var(--border); background: #fff; color: var(--tm); cursor: pointer; transition: all .2s; }
.v5-rchip:hover { border-color: var(--blue); color: var(--navy); }
.v5-rchip.is-on { background: var(--navy); border-color: var(--navy); color: #fff; }
.v5-rchip:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
.v5-route { list-style: none; display: flex; flex-direction: column; gap: 10px; position: relative; }
.v5-route::before { content: ""; position: absolute; left: 19px; top: 20px; bottom: 20px; border-left: 2px dashed var(--yellow); }
.v5-route li { position: relative; display: flex; align-items: center; gap: 14px; animation: v5Step .4s ease both; }
.v5-route-icon { width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0; display: grid; place-items: center; background: var(--light); color: var(--navy); border: 2px solid #fff; }
.v5-route li.is-goal .v5-route-icon { background: var(--yellow); }
.v5-route strong { display: block; font-size: 15px; color: var(--td); }
.v5-route em { font-style: normal; font-size: 12px; font-weight: 600; color: var(--blue); }
.v5-small { font-size: 12px; color: var(--tl); margin-top: 18px; line-height: 1.5; }
.v5-levels { list-style: none; display: flex; flex-direction: column; gap: 16px; }
.v5-levels li > div { display: flex; justify-content: space-between; margin-bottom: 6px; }
.v5-levels strong { font-size: 15px; color: var(--td); }
.v5-levels span { font-size: 13px; font-weight: 600; color: var(--blue); }
.v5-levels i { display: block; height: 10px; background: var(--light); border-radius: 10px; overflow: hidden; }
.v5-levels b { display: block; height: 100%; border-radius: 10px; background: linear-gradient(90deg, var(--sky), var(--navy)); transform-origin: left; transform: scaleX(0); transition: transform .9s cubic-bezier(.2,.7,.2,1); }
.v5-reveal.is-in .v5-levels b { transform: scaleX(1); }
.v5-gloss-wrap { background: #fff; border: 1px solid #ECE6D6; border-radius: 24px; padding: 28px; }
.v5-gloss { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px 28px; }
.v5-gloss dt { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: var(--tl); margin-bottom: 6px; }
.v5-gloss dt span { align-self: flex-start; font-size: 14px; font-weight: 800; color: var(--navy); background: var(--yellow); padding: 3px 10px; border-radius: 8px; }
.v5-gloss dd { font-size: 15px; color: var(--td); line-height: 1.5; }
.v5-start-cta { display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap; margin-top: 36px; font-size: 17px; font-weight: 600; color: var(--td); }
.v5-reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
.v5-reveal.is-in { opacity: 1; transform: none; }

.v5-kicker { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); margin-bottom: 12px; }
.v5-kicker.is-light { color: var(--yellow); }
.v5-head { margin-bottom: 44px; max-width: 640px; }
.v5-head.is-center { text-align: center; margin-left: auto; margin-right: auto; }
.v5-head h2, .v5-check h2, .v5-faq h2, .v5-cred-grid h2 { font-size: clamp(30px, 3.8vw, 48px); line-height: 1.12; color: var(--navy); letter-spacing: -.5px; }
.v5-cred-grid h2.is-light { color: #fff; }
.v5-head p { font-size: 17px; color: var(--tm); margin-top: 12px; line-height: 1.6; }
.v5-lead { font-size: 18px; line-height: 1.65; color: var(--tm); max-width: 520px; }

.v5-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 24px; border-radius: 12px; font: inherit; font-weight: 700; font-size: 15px; text-decoration: none; border: none; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s, color .2s; }
.v5-btn:focus-visible, .v5-choice:focus-visible, .v5-marn button:focus-visible, .v5-faq summary:focus-visible { outline: 3px solid var(--sky); outline-offset: 3px; }
.v5-btn-main { background: #eddb3c; color: var(--navy); }
.v5-btn-main:hover { background: #e2cf35; transform: translateY(-2px); box-shadow: 0 12px 26px rgba(212,168,0,.3); }
.v5-btn-main:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
.v5-btn-line { background: transparent; color: var(--navy); border: 2px solid var(--navy); }
.v5-btn-line:hover { background: var(--navy); color: #fff; }
.v5-btn-block { width: 100%; }
.v5-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }

/* HERO */
.v5-hero { background: linear-gradient(180deg, #FBF9F3 0%, #fff 100%); padding: 56px 0 40px; overflow: hidden; }
.v5-hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
.v5-greet { display: inline-flex; align-items: baseline; gap: 12px; min-height: 44px; margin-bottom: 14px; }
.v5-greet-word { font-family: ${serif}; font-size: 36px; font-weight: 700; color: var(--blue); animation: v5Greet .6s cubic-bezier(.2,.7,.2,1) both; }
.v5-greet-lang { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--tl); animation: v5Fade .6s .1s both; }
@keyframes v5Greet { from { opacity: 0; transform: translateY(14px); filter: blur(4px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes v5Fade { from { opacity: 0; } to { opacity: 1; } }
.v5-hero h1 { font-size: clamp(34px, 4.4vw, 58px); line-height: 1.12; color: var(--navy); letter-spacing: -1px; margin-bottom: 20px; }
.v5-hero h1 em { font-style: italic; color: var(--blue); }
.v5-hero-visual { position: relative; padding: 24px 24px 40px 40px; }
.v5-hero-photo { position: relative; aspect-ratio: 4 / 4.6; border-radius: 200px 200px 28px 28px; overflow: hidden; box-shadow: 0 30px 60px rgba(15,30,69,.18); }
.v5-hero-photo img { object-fit: cover; }
.v5-card { position: absolute; background: #fff; border-radius: 16px; box-shadow: 0 16px 36px rgba(15,30,69,.16); display: flex; align-items: center; gap: 12px; padding: 14px 16px; animation: v5Bob 6s ease-in-out infinite; }
.v5-card strong { display: block; font-size: 14px; color: var(--td); }
.v5-card span { font-size: 12px; color: var(--tl); }
.v5-card-marn { left: 0; bottom: 70px; max-width: 290px; }
.v5-card-marn > svg { color: #1F9D57; flex-shrink: 0; }
.v5-card-rating { right: 0; top: 60px; flex-direction: column; align-items: flex-start; gap: 2px; animation-delay: -3s; }
.v5-card-rating strong { font-size: 30px; color: var(--navy); line-height: 1; }
.v5-card-pin { right: 30px; bottom: 10px; padding: 10px 14px; background: var(--navy); animation-delay: -1.5s; }
.v5-card-pin svg { color: var(--yellow); }
.v5-card-pin span { color: #fff; font-weight: 600; font-size: 13px; }
.v5-stars { display: flex; gap: 1px; color: var(--yellow); }
@keyframes v5Bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -7px; } }
.v5-proof { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 48px; border-top: 1px solid var(--border); }
.v5-proof li { display: flex; gap: 12px; align-items: flex-start; padding: 22px 18px 6px 0; }
.v5-proof li + li { padding-left: 18px; border-left: 1px solid var(--border); }
.v5-proof svg { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
.v5-proof strong { display: block; font-size: 15px; color: var(--td); }
.v5-proof span { font-size: 13px; color: var(--tl); }

/* MARQUEE */
.v5-marquee { background: var(--navy); overflow: hidden; padding: 22px 0; }
.v5-marquee-track { display: flex; width: max-content; animation: v5Marq 40s linear infinite; }
.v5-marquee-track span { display: inline-flex; align-items: center; gap: 28px; padding-right: 28px; font-size: 30px; font-weight: 700; color: #fff; white-space: nowrap; }
.v5-marquee-track span:nth-child(3n+2) { color: var(--yellow); }
.v5-marquee-track i { font-style: normal; font-size: 16px; color: var(--sky); }
@keyframes v5Marq { to { transform: translateX(-50%); } }

/* SECTIONS */
.v5-sec { padding: 110px 0; background: #fff; }
.v5-sec-off { background: #FBF9F3; }
.v5-sec-navy { background: radial-gradient(ellipse at 0% 0%, #16357a, #0b1f4a 60%); color: #fff; }

/* BELIEFS */
.v5-beliefs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 2px solid var(--navy); }
.v5-belief { padding: 32px 28px 8px 0; }
.v5-belief + .v5-belief { padding-left: 28px; border-left: 1px solid var(--border); }
.v5-belief-n { display: block; font-size: 15px; font-weight: 700; color: var(--blue); margin-bottom: 18px; }
.v5-belief strong { display: block; font-size: 30px; line-height: 1.15; color: var(--navy); margin-bottom: 12px; }
.v5-belief p { font-size: 16px; color: var(--tm); line-height: 1.6; }

/* CREDENTIALS */
.v5-cred-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.v5-cred-lead { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,.75); margin: 16px 0 28px; max-width: 460px; }
.v5-marns { display: flex; flex-direction: column; gap: 12px; }
.v5-marn > div:first-child, .v5-marn { display: flex; align-items: center; }
.v5-marn { justify-content: space-between; gap: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.14); border-radius: 18px; padding: 18px 20px; }
.v5-marn > div { gap: 14px; }
.v5-marn > div span { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--navy); background: var(--yellow); padding: 4px 8px; border-radius: 6px; }
.v5-marn strong { font-size: 32px; letter-spacing: 2px; font-variant-numeric: tabular-nums; }
.v5-marn button { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.1); color: #fff; border: 1px solid rgba(255,255,255,.2); border-radius: 10px; padding: 9px 14px; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; transition: background .2s; }
.v5-marn button:hover { background: rgba(255,255,255,.2); }
.v5-marn-note { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(255,255,255,.6); margin-top: 6px; }

/* COMPARE */
.v5-compare { max-width: 980px; margin: 0 auto; background: #fff; border-radius: 24px; border: 1px solid var(--border); overflow: hidden; box-shadow: 0 20px 50px rgba(15,30,69,.06); }
.v5-cmp-row { display: grid; grid-template-columns: 1fr 1.3fr 1.3fr; gap: 16px; align-items: center; padding: 20px 26px; border-top: 1px solid var(--border); }
.v5-cmp-headrow { border-top: none; background: var(--off); font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: var(--tl); }
.v5-cmp-headrow .is-racc { color: var(--navy); }
.v5-cmp-row strong { font-size: 16px; color: var(--td); }
.v5-cmp-alone, .v5-cmp-racc { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; line-height: 1.45; }
.v5-cmp-alone { color: var(--tl); }
.v5-cmp-alone svg { color: #d06464; flex-shrink: 0; margin-top: 2px; }
.v5-cmp-racc { color: var(--td); font-weight: 600; }
.v5-cmp-racc svg { color: #fff; background: #1F9D57; border-radius: 50%; padding: 2px; flex-shrink: 0; margin-top: 1px; }

/* OFFICE */
.v5-office { display: grid; grid-template-columns: 1fr 1.15fr; gap: 56px; align-items: center; }
.v5-office .v5-head { margin-bottom: 28px; }
.v5-office-list { list-style: none; display: flex; flex-direction: column; gap: 18px; margin-bottom: 30px; }
.v5-office-list li { display: flex; gap: 14px; align-items: flex-start; }
.v5-office-list svg { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
.v5-office-list strong { display: block; font-size: 16px; color: var(--td); }
.v5-office-list a { text-decoration: none; }
.v5-office-list a:hover strong { color: var(--blue); }
.v5-office-list span { font-size: 13px; color: var(--tl); }
.v5-map { position: relative; aspect-ratio: 1 / 0.9; border-radius: 28px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 24px 50px rgba(15,30,69,.12); background: var(--light); }
.v5-map iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
.v5-map-ph { position: absolute; inset: 0; background: linear-gradient(90deg, var(--light), var(--off), var(--light)); }

/* REVIEWS */
.v5-reviews { background: var(--yellow); padding: 56px 0; }
.v5-reviews-inner { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: space-between; }
.v5-stars-big { display: flex; gap: 4px; color: rgba(28,58,138,.2); }
.v5-stars-big svg { transform: scale(.6); transition: transform .5s cubic-bezier(.2,1.6,.4,1), color .4s; }
.v5-reviews-inner.is-in .v5-stars-big svg { transform: scale(1); color: var(--navy); }
.v5-reviews-inner > div:nth-child(2) { flex: 1; min-width: 240px; }
.v5-reviews-inner strong { display: block; font-size: 30px; color: var(--navy); }
.v5-reviews-inner span { color: var(--navy); opacity: .8; }

/* CHECK (lead) */
.v5-check { background: linear-gradient(180deg, #fff, #FBF9F3); }
.v5-check-grid { display: grid; grid-template-columns: 1fr 480px; gap: 64px; align-items: center; }
.v5-check-grid .v5-lead { margin: 16px 0 24px; }
.v5-check-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.v5-check-list li { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 500; color: var(--td); }
.v5-check-list svg { color: var(--navy); background: var(--yellow); border-radius: 50%; padding: 3px; width: 22px; height: 22px; }
.v5-wiz { background: #fff; border: 1px solid var(--border); border-radius: 26px; padding: 28px; box-shadow: 0 30px 60px rgba(15,30,69,.12); display: flex; flex-direction: column; gap: 16px; min-height: 420px; }
.v5-wiz-top { display: flex; align-items: center; gap: 14px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--tl); white-space: nowrap; }
.v5-wiz-bar { flex: 1; height: 6px; background: var(--light); border-radius: 6px; overflow: hidden; }
.v5-wiz-bar i { display: block; height: 100%; background: var(--yellow); border-radius: 6px; transition: width .4s ease; }
.v5-wiz-step { display: flex; flex-direction: column; gap: 12px; animation: v5Step .4s ease both; }
@keyframes v5Step { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
.v5-wiz h3 { font-size: 26px; color: var(--navy); line-height: 1.2; margin-bottom: 4px; }
.v5-wiz-label { font-size: 13px; font-weight: 600; color: var(--tm); margin-top: 4px; }
.v5-choices { display: flex; flex-wrap: wrap; gap: 8px; }
.v5-choice { font: inherit; font-size: 14px; font-weight: 600; padding: 12px 16px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--off); color: var(--td); cursor: pointer; transition: all .2s; }
.v5-choice:hover { border-color: var(--blue); }
.v5-choice.is-on { background: var(--navy); color: #fff; border-color: var(--navy); }
.v5-wiz-step:first-child .v5-choices, .v5-wiz-step[data-big] .v5-choices { flex-direction: column; }
.v5-field { display: flex; flex-direction: column; gap: 5px; }
.v5-field span { font-size: 13px; font-weight: 600; color: var(--tm); }
.v5-field em { font-style: normal; font-weight: 400; color: var(--tl); }
.v5-field input { font: inherit; font-size: 15px; padding: 12px 14px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--off); color: var(--td); }
.v5-field input:focus { outline: none; border-color: var(--blue); background: #fff; box-shadow: 0 0 0 3px rgba(46,109,180,.15); }
.v5-consent { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--tm); cursor: pointer; }
.v5-consent input { margin-top: 3px; width: 16px; height: 16px; accent-color: var(--navy); }
.v5-err { font-size: 13px; color: #c03434; }
.v5-safe { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: var(--tl); }
.v5-link { background: none; border: none; font: inherit; font-size: 14px; color: var(--blue); cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.v5-back { align-self: flex-start; color: var(--tl); margin-top: auto; }
.v5-wiz-done { align-items: center; justify-content: center; text-align: center; }
.v5-done-icon { width: 66px; height: 66px; border-radius: 50%; background: var(--yellow); color: var(--navy); display: grid; place-items: center; animation: v5Pop .5s cubic-bezier(.2,1.5,.4,1) both; }
@keyframes v5Pop { from { transform: scale(0); } to { transform: scale(1); } }
.v5-wiz-done p { color: var(--tm); line-height: 1.6; }

/* FAQ */
.v5-faq { display: grid; grid-template-columns: 1fr 1.5fr; gap: 56px; align-items: start; }
.v5-faq details { border-bottom: 1px solid var(--border); }
.v5-faq summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; cursor: pointer; padding: 22px 0; font-size: 18px; font-weight: 600; color: var(--td); }
.v5-faq summary::-webkit-details-marker { display: none; }
.v5-faq summary svg { color: var(--blue); flex-shrink: 0; transition: transform .25s; }
.v5-faq details[open] summary svg { transform: rotate(45deg); }
.v5-faq details p { padding-bottom: 22px; color: var(--tm); line-height: 1.65; }

@media (prefers-reduced-motion: reduce) {
  .v5-reveal { opacity: 1; transform: none; transition: none; }
  .v5-card, .v5-marquee-track, .v5-greet-word, .v5-greet-lang { animation: none !important; }
}

@media (max-width: 1000px) {
  .v5-hero-grid, .v5-cred-grid, .v5-office, .v5-check-grid, .v5-faq { grid-template-columns: 1fr; gap: 40px; }
  .v5-hero-visual { max-width: 480px; width: 100%; margin: 0 auto; }
  .v5-proof { grid-template-columns: repeat(2, 1fr); }
  .v5-proof li:nth-child(3) { border-left: none; padding-left: 0; }
  .v5-beliefs { grid-template-columns: 1fr; }
  .v5-how { grid-template-columns: 1fr; gap: 14px; max-width: 420px; margin-left: auto; margin-right: auto; }
  .v5-how::before { top: 32px; bottom: 32px; left: 31px; right: auto; border-top: none; border-left: 3px dashed #E3DCC8; }
  .v5-how-step { display: grid; grid-template-columns: 64px 1fr; column-gap: 16px; text-align: left; align-items: center; }
  .v5-how-icon { grid-row: 1 / 3; margin: 0; }
  .v5-start-grid { grid-template-columns: 1fr; }
  .v5-gloss { grid-template-columns: repeat(2, 1fr); }
  .v5-belief, .v5-belief + .v5-belief { padding: 26px 0; border-left: none; border-bottom: 1px solid var(--border); }
}

@media (max-width: 700px) {
  .v5-sec { padding: 76px 0; }
  .v5-hero { padding-top: 32px; }
  .v5-greet-word { font-size: 28px; }
  .v5-lead { font-size: 16px; }
  .v5-ctas { flex-direction: column; }
  .v5-ctas .v5-btn { width: 100%; }
  .v5-hero-visual { padding: 16px 8px 36px 16px; }
  .v5-card-marn { max-width: 250px; }
  .v5-proof { grid-template-columns: 1fr; }
  .v5-proof li, .v5-proof li + li { padding: 16px 0; border-left: none; border-bottom: 1px solid var(--border); }
  .v5-marquee-track span { font-size: 22px; }
  .v5-belief strong { font-size: 25px; }
  .v5-marn strong { font-size: 24px; }
  .v5-cmp-headrow { display: none; }
  .v5-gloss { grid-template-columns: 1fr; }
  .v5-box, .v5-gloss-wrap { padding: 22px; }
  .v5-start-cta { flex-direction: column; }
  .v5-cmp-row { grid-template-columns: 1fr; gap: 8px; padding: 18px 20px; }
  .v5-wiz { padding: 22px; }
  .v5-reviews-inner { flex-direction: column; align-items: flex-start; }
}
`;

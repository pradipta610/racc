"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Check, BadgeCheck, Plus, BookOpen, MapPin, Wallet, CalendarDays, Stamp, Info,
  GraduationCap, Briefcase,
} from "lucide-react";
import {
  CONSULTATION_URL, ROUTES, FIELDS, LEVEL_NAMES, COURSE_FILTERS, LEVELS, CITIES, COSTS, COST_MAX,
  COST_EXTRAS, MONTHS, MAIN_INTAKES, MINOR_INTAKES, DOCS, SERVICES, PROCESS, FAQS, type Level,
} from "./eduData";

const serif = "var(--font-playfair), 'Playfair Display', serif";
const ALL_LEVELS: Level[] = ["Cert", "Dip", "Bach", "Master"];
const FILTER_LEVELS: Record<string, Level[]> = { all: ALL_LEVELS, vet: ["Cert", "Dip"], uni: ["Bach", "Master"] };
const k = (n: number) => `${Math.round(n / 1000)}k`;

/* ---------- Hero visual: a compact "your route" card over the photo ---------- */

function HeroRoute() {
  const steps = [
    { icon: MapPin, label: "Where you are now" },
    { icon: GraduationCap, label: "The right course" },
    { icon: Stamp, label: "Student visa 500" },
    { icon: Briefcase, label: "Graduate visa 485" },
  ];
  return (
    <div className="edu-hero-card" aria-label="Example RACC route">
      <span className="edu-hc-kicker">Your RACC route</span>
      <ol>
        {steps.map(({ icon: Icon, label }, i) => (
          <li key={label} style={{ animationDelay: `${0.3 + i * 0.25}s` }}>
            <span className={`edu-hc-icon${i === steps.length - 1 ? " is-goal" : ""}`}><Icon size={18} /></span>
            {label}
            <Check size={16} className="edu-hc-check" />
          </li>
        ))}
      </ol>
    </div>
  );
}

function SectionHead({ kicker, title, dark }: { kicker: string; title: string; dark?: boolean }) {
  return (
    <div className="edu-head">
      <span className="edu-kicker" style={dark ? { color: "var(--yellow)" } : undefined}>{kicker}</span>
      <h2 style={{ fontFamily: serif, color: dark ? "#fff" : "var(--navy)" }}>{title}</h2>
    </div>
  );
}

/* ---------- Page ---------- */

export default function EduLanding() {
  const [routeId, setRouteId] = useState(ROUTES[0].id);
  const route = ROUTES.find((r) => r.id === routeId)!;
  const [filter, setFilter] = useState<string>("all");
  const shownLevels = FILTER_LEVELS[filter];
  const fields = FIELDS.filter((f) => f.levels.some((l) => shownLevels.includes(l)));

  return (
    <>
      {/* HERO */}
      <section className="edu-hero">
        <Image src="/education/hero-students.jpg" alt="" fill priority sizes="100vw" className="edu-hero-img" />
        <div className="edu-hero-overlay" aria-hidden="true" />
        <div className="edu-wrap edu-hero-grid">
          <div>
            <span className="edu-badge"><span className="edu-dot" /> Education Pathways · Australia</span>
            <h1 className="edu-h1">
              Too many study options?<br />
              <em>We map one clear route.</em>
            </h1>
            <p className="edu-lead">Courses, cities, costs and your visa. Everything you need, on one page.</p>
            <div className="edu-btns">
              <Link href={CONSULTATION_URL} className="edu-btn-primary">Get my pathway <ArrowRight size={16} /></Link>
              <a href="#pathway" className="edu-btn-ghost">Explore the guide</a>
            </div>
            <div className="edu-stats">
              {[{ v: "20+", l: "Years" }, { v: "4.8★", l: "Rating" }, { v: "800+", l: "Reviews" }, { v: "12+", l: "Languages" }].map((s) => (
                <div key={s.l}><strong>{s.v}</strong><span>{s.l}</span></div>
              ))}
            </div>
          </div>
          <HeroRoute />
        </div>
      </section>

      {/* QUICK JUMP */}
      <div className="edu-wrap">
        <div className="edu-quick">
          {[
            { id: "courses", icon: BookOpen, label: "Courses" },
            { id: "cities", icon: MapPin, label: "Cities" },
            { id: "costs", icon: Wallet, label: "Costs" },
            { id: "apply", icon: CalendarDays, label: "Intakes" },
            { id: "services", icon: Stamp, label: "Visa help" },
          ].map(({ id, icon: Icon, label }) => (
            <a key={id} href={`#${id}`} className="edu-quick-item">
              <span><Icon size={22} /></span>{label}
            </a>
          ))}
        </div>
      </div>

      {/* PATHWAY PICKER */}
      <section id="pathway" className="edu-sec">
        <div className="edu-wrap">
          <SectionHead kicker="Your route" title="Where are you starting from?" />
          <div className="edu-chips" role="tablist" aria-label="Your current situation">
            {ROUTES.map((r) => {
              const Icon = r.icon;
              const active = r.id === routeId;
              return (
                <button key={r.id} role="tab" aria-selected={active} onClick={() => setRouteId(r.id)} className={`edu-chip${active ? " is-active" : ""}`}>
                  <Icon size={18} /> {r.chip}
                </button>
              );
            })}
          </div>
          <ol key={route.id} className="edu-route" style={{ ["--n" as string]: route.steps.length }}>
            {route.steps.map((s, i) => {
              const Icon = s.icon;
              const last = i === route.steps.length - 1;
              return (
                <li key={s.label} className="edu-step" style={{ animationDelay: `${i * 90}ms` }}>
                  <div className={`edu-step-icon${last ? " is-goal" : ""}`}><Icon size={24} /></div>
                  <span className="edu-step-num">Step {i + 1}</span>
                  <strong>{s.label}</strong>
                  <span className="edu-step-time">{s.time}</span>
                </li>
              );
            })}
          </ol>
          <p className="edu-note">Example routes only. Your real pathway depends on your profile, so we check it with you first.</p>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="edu-sec edu-sec-off">
        <div className="edu-wrap">
          <SectionHead kicker="Choose a course" title="What do you want to study?" />
          <div className="edu-chips" role="tablist" aria-label="Type of provider">
            {COURSE_FILTERS.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)} className={`edu-chip${filter === f.id ? " is-active" : ""}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="edu-fields">
            {fields.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.name} className="edu-field">
                  <div className="edu-field-icon"><Icon size={26} /></div>
                  <strong>{f.name}</strong>
                  <span className="edu-field-careers">{f.careers}</span>
                  <div className="edu-field-levels">
                    {ALL_LEVELS.map((l) => {
                      const has = f.levels.includes(l);
                      const lit = has && shownLevels.includes(l);
                      return (
                        <span key={l} className={`edu-lv${lit ? " is-on" : has ? " is-dim" : " is-off"}`} title={has ? LEVEL_NAMES[l] : `No ${LEVEL_NAMES[l]}`}>
                          {LEVEL_NAMES[l]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="edu-note">Can&apos;t see your field? We work with hundreds of providers. Just ask.</p>

          <div className="edu-levels-block">
            <h3 style={{ fontFamily: serif }}>Each study level can lead to the next</h3>
            <div className="edu-ladder">
              {LEVELS.map((l, i) => (
                <div key={l.label} className="edu-rung">
                  <span className="edu-rung-time">{l.time}</span>
                  <div className="edu-bar" style={{ height: `${l.h}%`, ["--w" as string]: `${l.h}%`, animationDelay: `${i * 100}ms` }}>
                    <span className="edu-bar-num">{i + 1}</span>
                  </div>
                  <strong>{l.label}</strong>
                </div>
              ))}
            </div>
            <div className="edu-ladder-foot"><BadgeCheck size={18} /> Credit from earlier study can shorten the next level.</div>
          </div>
        </div>
      </section>

      {/* STUDENT LIFE */}
      <section className="edu-sec">
        <div className="edu-wrap">
          <SectionHead kicker="Student life" title="More than a classroom" />
          <div className="edu-life">
            <figure className="edu-life-photo edu-life-a">
              <Image src="/education/life-study.jpg" alt="International students studying together on laptops" fill sizes="(max-width: 700px) 100vw, 600px" />
              <figcaption>Classmates from all over the world</figcaption>
            </figure>
            <figure className="edu-life-photo edu-life-b">
              <Image src="/education/life-class.jpg" alt="Students in a practical class" fill sizes="(max-width: 700px) 100vw, 400px" />
              <figcaption>Practical, industry-led classes</figcaption>
            </figure>
            <div className="edu-life-stat edu-life-c">
              <strong>48 hrs</strong>
              <span>work per fortnight while you study</span>
            </div>
            <figure className="edu-life-photo edu-life-d">
              <Image src="/education/life-friends.jpg" alt="Friends talking in a café" fill sizes="(max-width: 700px) 100vw, 400px" />
              <figcaption>Friends for life</figcaption>
            </figure>
            <div className="edu-life-stat edu-life-e is-navy">
              <strong>2–3 yrs</strong>
              <span>post-study work rights after many degrees</span>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section id="cities" className="edu-sec edu-sec-off">
        <div className="edu-wrap">
          <SectionHead kicker="Where to live" title="Pick a city that fits you" />
          <div className="edu-cities">
            {CITIES.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.name} className="edu-city" style={{ ["--tint" as string]: c.tint }}>
                  <div className="edu-city-top">
                    <Image src={c.img} alt={`${c.name}, Australia`} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 380px" className="edu-city-img" />
                    <Icon size={30} strokeWidth={1.8} className="edu-city-icon" />
                    <span>{c.state}</span>
                  </div>
                  <div className="edu-city-body">
                    <strong style={{ fontFamily: serif }}>{c.name}</strong>
                    <p>{c.vibe}</p>
                    <div>{c.tags.map((t) => <em key={t}>{t}</em>)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COSTS */}
      <section id="costs" className="edu-sec">
        <div className="edu-wrap">
          <SectionHead kicker="Budget" title="What does it cost per year?" />
          <div className="edu-costs">
            <div className="edu-cost-chart">
              <span className="edu-cost-cap">Tuition fees, AUD per year</span>
              {COSTS.map((c) => (
                <div key={c.label} className="edu-cost-row">
                  <span className="edu-cost-label">{c.label}</span>
                  <div className="edu-cost-track">
                    <div className="edu-cost-range" style={{ left: `${(c.min / COST_MAX) * 100}%`, width: `${((c.max - c.min) / COST_MAX) * 100}%` }}>
                      <span>A${k(c.min)}–{k(c.max)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="edu-cost-axis" aria-hidden="true">
                {[0, 10000, 20000, 30000, 40000, 50000].map((t) => (
                  <span key={t} style={{ left: `${(t / COST_MAX) * 100}%` }}>{t === 0 ? "0" : k(t)}</span>
                ))}
              </div>
            </div>
            <div className="edu-cost-extras">
              {COST_EXTRAS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="edu-extra">
                  <span className="edu-extra-icon"><Icon size={20} /></span>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="edu-note"><Info size={14} style={{ verticalAlign: -2 }} /> Approximate figures. Fees differ by provider and change each year, so we confirm the exact numbers for you.</p>
        </div>
      </section>

      {/* INTAKES + DOCUMENTS */}
      <section id="apply" className="edu-sec edu-sec-off">
        <div className="edu-wrap">
          <SectionHead kicker="How to apply" title="When to start and what to prepare" />
          <div className="edu-apply">
            <div className="edu-card">
              <h3><CalendarDays size={20} /> Intakes</h3>
              <div className="edu-months">
                {MONTHS.map((m, i) => {
                  const main = MAIN_INTAKES.includes(i);
                  const minor = MINOR_INTAKES.includes(i);
                  return (
                    <div key={m} className={`edu-month${main ? " is-main" : minor ? " is-minor" : ""}`}>
                      <span>{m}</span>
                    </div>
                  );
                })}
              </div>
              <div className="edu-legend">
                <span><i className="is-main" /> Main intake</span>
                <span><i className="is-minor" /> Some courses</span>
              </div>
              <div className="edu-tip">
                <strong>Apply 3–6 months early</strong>
                <div className="edu-tip-flow">
                  {["Apply", "Offer", "CoE", "Visa", "Fly"].map((s, i, a) => (
                    <span key={s}>{s}{i < a.length - 1 && <ArrowRight size={14} />}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="edu-card">
              <h3><Check size={20} /> Documents checklist</h3>
              <div className="edu-docs">
                {DOCS.map(({ icon: Icon, label }) => (
                  <div key={label} className="edu-doc"><span><Icon size={20} /></span>{label}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="edu-sec edu-sec-navy">
        <div className="edu-wrap">
          <SectionHead kicker="What we handle" title="One team, start to finish" dark />
          <div className="edu-svc-grid">
            {SERVICES.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="edu-svc">
                <div className="edu-svc-icon"><Icon size={22} /></div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            ))}
          </div>

          <div className="edu-proc">
            {PROCESS.map(({ icon: Icon, title }, i) => (
              <div key={title} className="edu-proc-step">
                <div className="edu-proc-icon"><Icon size={26} /><span>{i + 1}</span></div>
                <strong>{title}</strong>
              </div>
            ))}
          </div>
          <ul className="edu-checks">
            {["Registered migration agents in-house", "Advice in 12+ languages", "Melbourne office, help worldwide"].map((c) => (
              <li key={c}><Check size={16} /> {c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="edu-sec edu-sec-off">
        <div className="edu-wrap">
          <SectionHead kicker="Quick answers" title="Students often ask" />
          <div className="edu-faq">
            {FAQS.map((f) => (
              <details key={f.q} className="edu-faq-item">
                <summary>{f.q}<Plus size={20} /></summary>
                <p>
                  {f.a}
                  {f.link && <> <Link href={f.link.href}>{f.link.label} →</Link></>}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <style>{CSS}</style>
    </>
  );
}

const CSS = `
.edu-wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
#pathway, #courses, #cities, #costs, #apply, #services, #faq { scroll-margin-top: 72px; }

/* Hero */
.edu-hero {
  background:
    radial-gradient(circle at 85% 20%, rgba(91,163,217,.28), transparent 45%),
    linear-gradient(135deg, #0B1F4A 0%, var(--navy) 60%, var(--blue) 120%);
  color: #fff; padding: 56px 0 96px; overflow: hidden; position: relative;
}
.edu-hero-img { object-fit: cover; object-position: center 78%; z-index: 0; }
.edu-hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background:
    radial-gradient(circle at 85% 20%, rgba(91,163,217,.25), transparent 45%),
    linear-gradient(90deg, rgba(11,31,74,.95) 0%, rgba(11,31,74,.85) 40%, rgba(28,58,138,.55) 75%, rgba(28,58,138,.45) 100%);
}
.edu-hero .edu-hero-grid { position: relative; z-index: 2; }
.edu-hero-grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: 48px; align-items: center; }
.edu-badge {
  display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600;
  letter-spacing: .5px; text-transform: uppercase; padding: 6px 14px; border-radius: 20px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.15); margin-bottom: 20px;
}
.edu-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--yellow); }
.edu-h1 { font-family: ${serif}; font-size: 48px; line-height: 1.12; margin-bottom: 16px; }
.edu-h1 em { color: var(--yellow); font-style: normal; }
.edu-lead { font-size: 17px; color: rgba(255,255,255,.75); line-height: 1.6; margin-bottom: 28px; max-width: 440px; }
.edu-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
.edu-btn-primary {
  display: inline-flex; align-items: center; gap: 8px; background: #eddb3c; color: var(--navy);
  padding: 14px 26px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; transition: all .2s;
}
.edu-btn-primary:hover { background: #e2cf35; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,.2); }
.edu-btn-ghost {
  display: inline-flex; align-items: center; padding: 14px 22px; border-radius: 10px; font-size: 15px;
  color: #fff; text-decoration: none; border: 2px solid rgba(255,255,255,.3); transition: border-color .2s;
}
.edu-btn-ghost:hover { border-color: rgba(255,255,255,.7); }
.edu-stats { display: flex; gap: 28px; flex-wrap: wrap; }
.edu-stats strong { display: block; font-size: 24px; font-weight: 700; }
.edu-stats span { font-size: 12px; color: rgba(255,255,255,.55); }
.edu-hero-grid { min-height: 440px; }
.edu-hero-card {
  justify-self: end; align-self: end; width: 100%; max-width: 300px; padding: 18px; border-radius: 18px;
  background: rgba(11,31,74,.55); border: 1px solid rgba(255,255,255,.18);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 18px 40px rgba(0,0,0,.25);
}
.edu-hc-kicker { display: block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--yellow); margin-bottom: 12px; }
.edu-hero-card ol { list-style: none; display: flex; flex-direction: column; gap: 10px; position: relative; }
.edu-hero-card ol::before { content: ""; position: absolute; left: 17px; top: 18px; bottom: 18px; border-left: 2px dashed rgba(245,197,24,.6); }
.edu-hero-card li { display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; position: relative; opacity: 0; animation: floatUp .5s ease forwards; }
.edu-hc-icon { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; display: grid; place-items: center; background: #fff; color: var(--navy); }
.edu-hc-icon.is-goal { background: var(--yellow); }
.edu-hc-check { margin-left: auto; color: var(--yellow); }

/* Quick jump */
.edu-quick {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: -48px; position: relative; z-index: 2;
  background: #fff; border-radius: 18px; box-shadow: 0 18px 40px rgba(15,30,69,.14); overflow: hidden;
}
.edu-quick-item {
  display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 22px 10px; text-decoration: none;
  color: var(--td); font-weight: 600; font-size: 14px; transition: background .2s;
}
.edu-quick-item + .edu-quick-item { border-left: 1px solid var(--border); }
.edu-quick-item span { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; background: var(--light); color: var(--navy); transition: all .2s; }
.edu-quick-item:hover { background: var(--off); }
.edu-quick-item:hover span { background: var(--yellow); }

/* Sections */
.edu-sec { padding: 80px 0; background: #fff; }
.edu-sec-off { background: var(--off); }
.edu-sec-navy { background: var(--navy); }
.edu-head { text-align: center; margin-bottom: 40px; }
.edu-kicker { display: block; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; }
.edu-head h2 { font-size: 34px; line-height: 1.2; }
.edu-note { text-align: center; font-size: 13px; color: var(--tl); margin-top: 32px; }

/* Chips */
.edu-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 40px; }
.edu-chip {
  display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; border-radius: 40px;
  border: 1.5px solid var(--border); background: #fff; color: var(--tm); font: inherit; font-size: 14px;
  font-weight: 600; cursor: pointer; transition: all .2s;
}
.edu-chip:hover { border-color: var(--sky); color: var(--navy); }
.edu-chip:focus-visible, .edu-faq-item summary:focus-visible, .edu-quick-item:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
.edu-chip.is-active { background: var(--navy); border-color: var(--navy); color: #fff; }

/* Route */
.edu-route { list-style: none; display: grid; grid-template-columns: repeat(var(--n), 1fr); gap: 16px; position: relative; }
.edu-route::before {
  content: ""; position: absolute; top: 32px; left: calc(50% / var(--n)); right: calc(50% / var(--n));
  border-top: 3px dashed var(--yellow); z-index: 0;
}
.edu-step { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; opacity: 0; animation: floatUp .5s ease forwards; }
.edu-step-icon {
  width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; margin-bottom: 8px;
  background: #fff; color: var(--navy); border: 3px solid var(--navy); box-shadow: 0 6px 18px rgba(28,58,138,.12);
}
.edu-step-icon.is-goal { background: var(--yellow); border-color: var(--yellow); }
.edu-step-num { font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--tl); }
.edu-step strong { font-size: 15px; color: var(--td); line-height: 1.3; }
.edu-step-time { font-size: 12px; font-weight: 600; color: var(--blue); background: var(--light); padding: 4px 10px; border-radius: 20px; }

/* Course fields */
.edu-fields { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.edu-field {
  background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 6px;
  transition: all .2s; animation: floatUp .4s ease both;
}
.edu-field:hover { border-color: var(--sky); box-shadow: 0 12px 28px rgba(28,58,138,.1); transform: translateY(-2px); }
.edu-field-icon { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: var(--navy); color: var(--yellow); margin-bottom: 10px; }
.edu-field strong { font-size: 16px; color: var(--td); }
.edu-field-careers { font-size: 13px; color: var(--tl); }
.edu-field-levels { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px; }
.edu-lv { font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; }
.edu-lv.is-on { background: var(--light); color: var(--navy); }
.edu-lv.is-dim { background: var(--off); color: var(--tl); }
.edu-lv.is-off { display: none; }

/* Ladder */
.edu-levels-block { margin-top: 72px; padding-top: 56px; border-top: 1px solid var(--border); }
.edu-levels-block h3 { text-align: center; font-size: 24px; color: var(--navy); margin-bottom: 36px; }
.edu-ladder {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; align-items: end; height: 280px;
  max-width: 860px; margin: 0 auto; border-bottom: 2px solid var(--border);
}
.edu-rung { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; gap: 8px; }
.edu-rung strong { font-size: 14px; color: var(--td); text-align: center; position: relative; top: 34px; height: 0; white-space: nowrap; }
.edu-rung-time { font-size: 12px; font-weight: 700; color: var(--blue); }
.edu-bar {
  width: 100%; border-radius: 12px 12px 0 0; position: relative; display: flex; justify-content: center;
  background: linear-gradient(180deg, var(--sky), var(--navy)); transform-origin: bottom; animation: eduGrow .7s ease both;
}
.edu-rung:last-child .edu-bar { background: linear-gradient(180deg, var(--yellow), var(--gold)); }
.edu-bar-num { margin-top: 12px; font-family: ${serif}; font-size: 26px; font-weight: 700; color: rgba(255,255,255,.9); }
@keyframes eduGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.edu-ladder-foot { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 84px; font-size: 14px; color: var(--tm); }
.edu-ladder-foot svg { color: var(--blue); }

/* Student life */
.edu-life { display: grid; grid-template-columns: 1.3fr 1fr 1fr; grid-template-rows: 220px 220px; gap: 14px; }
.edu-life-a { grid-column: 1; grid-row: 1 / 3; }
.edu-life-b { grid-column: 2; grid-row: 1; }
.edu-life-c { grid-column: 3; grid-row: 1; }
.edu-life-d { grid-column: 3; grid-row: 2; }
.edu-life-e { grid-column: 2; grid-row: 2; }
.edu-life-photo { position: relative; margin: 0; border-radius: 18px; overflow: hidden; }
.edu-life-photo img { object-fit: cover; transition: transform .6s ease; }
.edu-life-photo:hover img { transform: scale(1.05); }
.edu-life-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(11,31,74,.8) 100%); }
.edu-life-photo figcaption { position: absolute; left: 18px; right: 18px; bottom: 16px; z-index: 1; color: #fff; font-weight: 600; font-size: 15px; }
.edu-life-stat { border-radius: 18px; padding: 24px; display: flex; flex-direction: column; justify-content: flex-end; background: var(--yellow); color: var(--navy); }
.edu-life-stat strong { font-family: ${serif}; font-size: 44px; line-height: 1; margin-bottom: 8px; }
.edu-life-stat span { font-size: 14px; font-weight: 500; }
.edu-life-stat.is-navy { background: var(--navy); color: #fff; }
.edu-life-stat.is-navy strong { color: var(--yellow); }
.edu-life-stat.is-navy span { color: rgba(255,255,255,.75); }

/* Cities */
.edu-cities { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.edu-city { border-radius: 18px; overflow: hidden; background: #fff; border: 1px solid var(--border); transition: all .25s; }
.edu-city:hover { transform: translateY(-3px); box-shadow: 0 16px 32px rgba(28,58,138,.12); }
.edu-city-top {
  height: 170px; position: relative; overflow: hidden; display: flex; align-items: flex-end; justify-content: space-between; padding: 18px 20px;
  background: var(--tint); color: #fff;
}
.edu-city-img { object-fit: cover; transition: transform .5s ease; z-index: 0; }
.edu-city:hover .edu-city-img { transform: scale(1.06); }
.edu-city-top::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(11,31,74,0) 35%, rgba(11,31,74,.75) 100%); }
.edu-city-icon, .edu-city-top span { position: relative; z-index: 2; }
.edu-city-icon { filter: drop-shadow(0 2px 6px rgba(0,0,0,.4)); }
.edu-city-top span { font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; background: rgba(255,255,255,.2); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); padding: 4px 10px; border-radius: 20px; }
.edu-city-body { padding: 18px 20px 22px; }
.edu-city-body strong { display: block; font-size: 22px; color: var(--navy); }
.edu-city-body p { font-size: 14px; color: var(--tm); margin: 4px 0 12px; }
.edu-city-body div { display: flex; flex-wrap: wrap; gap: 6px; }
.edu-city-body em { font-style: normal; font-size: 12px; font-weight: 600; color: var(--navy); background: var(--light); padding: 4px 10px; border-radius: 20px; }

/* Costs */
.edu-costs { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; align-items: stretch; }
.edu-cost-chart { background: var(--off); border: 1px solid var(--border); border-radius: 18px; padding: 28px 28px 44px; position: relative; }
.edu-cost-cap { display: block; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--tl); margin-bottom: 22px; }
.edu-cost-row { margin-bottom: 22px; }
.edu-cost-label { display: block; font-size: 14px; font-weight: 600; color: var(--td); margin-bottom: 8px; }
.edu-cost-track { position: relative; height: 34px; background: repeating-linear-gradient(90deg, var(--off) 0 calc(18.18% - 1px), var(--border) calc(18.18% - 1px) 18.18%); border-radius: 8px; }
.edu-cost-range {
  position: absolute; top: 0; bottom: 0; border-radius: 8px; background: linear-gradient(90deg, var(--sky), var(--navy));
  display: flex; align-items: center; justify-content: center; animation: eduGrowX .8s ease both; transform-origin: left;
}
.edu-cost-range span { font-size: 12px; font-weight: 700; color: #fff; white-space: nowrap; }
.edu-cost-axis { position: absolute; left: 28px; right: 28px; bottom: 18px; height: 14px; }
.edu-cost-axis span { position: absolute; transform: translateX(-50%); font-size: 11px; color: var(--tl); }
.edu-cost-axis span:first-child { transform: none; }
@keyframes eduGrowX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.edu-cost-extras { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.edu-extra { background: var(--navy); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 4px; color: #fff; }
.edu-extra-icon { width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; background: var(--yellow); color: var(--navy); margin-bottom: 10px; }
.edu-extra strong { font-size: 19px; }
.edu-extra span:last-child { font-size: 13px; color: rgba(255,255,255,.65); }

/* Apply */
.edu-apply { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.edu-card { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 28px; }
.edu-card h3 { display: flex; align-items: center; gap: 10px; font-size: 18px; color: var(--navy); margin-bottom: 20px; }
.edu-card h3 svg { color: var(--blue); }
.edu-months { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; }
.edu-month {
  aspect-ratio: 1; border-radius: 12px; display: grid; place-items: center; background: #fff; border: 1px solid var(--border);
  font-size: 13px; font-weight: 600; color: var(--tl);
}
.edu-month.is-main { background: var(--yellow); border-color: var(--yellow); color: var(--navy); font-weight: 800; box-shadow: 0 6px 14px rgba(212,168,0,.3); }
.edu-month.is-minor { background: var(--light); border-color: var(--sky); color: var(--navy); }
.edu-legend { display: flex; gap: 18px; margin-top: 14px; font-size: 12px; color: var(--tm); }
.edu-legend span { display: flex; align-items: center; gap: 6px; }
.edu-legend i { width: 12px; height: 12px; border-radius: 4px; display: inline-block; }
.edu-legend i.is-main { background: var(--yellow); }
.edu-legend i.is-minor { background: var(--light); border: 1px solid var(--sky); }
.edu-tip { margin-top: 22px; background: var(--navy); color: #fff; border-radius: 14px; padding: 16px 18px; }
.edu-tip strong { display: block; font-size: 14px; color: var(--yellow); margin-bottom: 10px; }
.edu-tip-flow { display: flex; flex-wrap: wrap; gap: 6px; font-size: 13px; font-weight: 600; }
.edu-tip-flow span { display: inline-flex; align-items: center; gap: 6px; }
.edu-tip-flow svg { color: rgba(255,255,255,.5); }
.edu-docs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.edu-doc { display: flex; align-items: center; gap: 12px; background: var(--off); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; font-size: 14px; font-weight: 500; color: var(--td); }
.edu-doc span { width: 38px; height: 38px; flex-shrink: 0; border-radius: 10px; display: grid; place-items: center; background: var(--light); color: var(--navy); }

/* Services */
.edu-svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.edu-svc { display: flex; flex-direction: column; gap: 6px; padding: 26px; border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); transition: all .2s; }
.edu-svc:hover { background: rgba(255,255,255,.1); transform: translateY(-2px); }
.edu-svc-icon { width: 48px; height: 48px; border-radius: 12px; display: grid; place-items: center; margin-bottom: 10px; background: var(--yellow); color: var(--navy); }
.edu-svc strong { color: #fff; font-size: 17px; }
.edu-svc span { color: rgba(255,255,255,.62); font-size: 14px; }

/* Process (on navy) */
.edu-proc { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; position: relative; max-width: 900px; margin: 64px auto 0; }
.edu-proc::before { content: ""; position: absolute; top: 40px; left: 12.5%; right: 12.5%; border-top: 3px dashed rgba(245,197,24,.5); }
.edu-proc-step { display: flex; flex-direction: column; align-items: center; gap: 14px; position: relative; text-align: center; }
.edu-proc-icon { width: 80px; height: 80px; border-radius: 22px; display: grid; place-items: center; position: relative; background: #fff; color: var(--navy); box-shadow: 0 10px 24px rgba(0,0,0,.2); }
.edu-proc-icon span { position: absolute; top: -8px; right: -8px; width: 26px; height: 26px; border-radius: 50%; background: var(--yellow); color: var(--navy); font-size: 13px; font-weight: 700; display: grid; place-items: center; }
.edu-proc-step strong { font-size: 16px; color: #fff; }
.edu-checks { list-style: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 28px; margin-top: 48px; }
.edu-checks li { display: flex; align-items: center; gap: 8px; font-size: 14px; color: rgba(255,255,255,.8); }
.edu-checks svg { color: var(--navy); background: var(--yellow); border-radius: 50%; padding: 2px; }

/* FAQ */
.edu-faq { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 10px; }
.edu-faq-item { background: #fff; border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.edu-faq-item summary { list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 22px; font-weight: 600; font-size: 16px; color: var(--td); }
.edu-faq-item summary::-webkit-details-marker { display: none; }
.edu-faq-item summary svg { flex-shrink: 0; color: var(--blue); transition: transform .2s; }
.edu-faq-item[open] summary svg { transform: rotate(45deg); }
.edu-faq-item[open] { border-color: var(--sky); }
.edu-faq-item p { padding: 0 22px 20px; font-size: 15px; line-height: 1.65; color: var(--tm); }
.edu-faq-item a { color: var(--blue); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .edu-hero-card li, .edu-step, .edu-bar, .edu-field, .edu-cost-range { animation: none !important; opacity: 1 !important; stroke-dashoffset: 0 !important; }
}

@media (max-width: 1000px) {
  .edu-hero-grid { grid-template-columns: 1fr; gap: 24px; }
  .edu-hero-grid { min-height: 0; }
  .edu-hero-card { display: none; }
  .edu-fields { grid-template-columns: repeat(2, 1fr); }
  .edu-cities, .edu-svc-grid { grid-template-columns: repeat(2, 1fr); }
  .edu-costs, .edu-apply { grid-template-columns: 1fr; }
}

@media (max-width: 700px) {
  .edu-hero { padding: 40px 0 80px; text-align: center; }
  .edu-hero-overlay { background: linear-gradient(180deg, rgba(11,31,74,.82) 0%, rgba(11,31,74,.9) 100%); }
  .edu-h1 { font-size: 32px; }
  .edu-lead { margin-left: auto; margin-right: auto; font-size: 15px; }
  .edu-btns, .edu-stats { justify-content: center; }
  .edu-sec { padding: 56px 0; }
  .edu-head h2 { font-size: 26px; }
  .edu-chip { font-size: 13px; padding: 10px 14px; }

  .edu-quick { grid-template-columns: repeat(5, 1fr); margin-top: -40px; border-radius: 14px; }
  .edu-quick-item { padding: 14px 4px; font-size: 11px; gap: 6px; }
  .edu-quick-item span { width: 36px; height: 36px; border-radius: 10px; }
  .edu-quick-item span svg { width: 18px; height: 18px; }

  .edu-route { grid-template-columns: 1fr; gap: 18px; max-width: 360px; margin: 0 auto; }
  .edu-route::before { top: 32px; bottom: 32px; left: 31px; right: auto; border-top: none; border-left: 3px dashed var(--yellow); }
  .edu-step { display: grid; grid-template-columns: 64px 1fr; column-gap: 16px; row-gap: 2px; text-align: left; align-items: center; }
  .edu-step-icon { grid-row: 1 / 4; margin: 0; }
  .edu-step-time { justify-self: start; }

  .edu-fields { gap: 10px; }
  .edu-field { padding: 16px; }
  .edu-field-icon { width: 42px; height: 42px; border-radius: 11px; }
  .edu-field strong { font-size: 14px; }
  .edu-field-careers { font-size: 12px; }
  .edu-lv { font-size: 10px; padding: 2px 6px; }

  .edu-levels-block h3 { font-size: 20px; }
  .edu-ladder { grid-template-columns: 1fr; height: auto; border-bottom: none; gap: 12px; }
  .edu-rung { display: grid; grid-template-columns: 1fr auto; height: auto; gap: 4px 10px; align-items: center; }
  .edu-rung strong { position: static; height: auto; grid-column: 1; grid-row: 1; text-align: left; }
  .edu-rung-time { grid-column: 2; grid-row: 1; }
  .edu-bar { grid-column: 1 / 3; grid-row: 2; height: 14px !important; width: var(--w, 100%); border-radius: 8px; transform-origin: left; animation-name: eduGrowX; }
  .edu-bar-num { display: none; }
  .edu-ladder-foot { margin-top: 28px; font-size: 13px; }

  .edu-cities { grid-template-columns: 1fr; }
  .edu-city-top { height: 150px; }
  .edu-life { grid-template-columns: 1fr 1fr; grid-template-rows: 240px 160px 160px; gap: 10px; }
  .edu-life-a { grid-column: 1 / 3; grid-row: 1; }
  .edu-life-b { grid-column: 1; grid-row: 2; }
  .edu-life-c { grid-column: 2; grid-row: 2; }
  .edu-life-d { grid-column: 2; grid-row: 3; }
  .edu-life-e { grid-column: 1; grid-row: 3; }
  .edu-life-photo figcaption { font-size: 13px; left: 12px; right: 12px; bottom: 12px; }
  .edu-life-stat { padding: 16px; }
  .edu-life-stat strong { font-size: 30px; }
  .edu-life-stat span { font-size: 12px; }
  .edu-city-body { padding: 14px 16px; }
  .edu-city-body strong { font-size: 19px; }

  .edu-cost-chart { padding: 22px 18px 40px; }
  .edu-cost-axis { left: 18px; right: 18px; }
  .edu-extra { padding: 16px; }
  .edu-extra strong { font-size: 16px; }

  .edu-card { padding: 20px; }
  .edu-docs { grid-template-columns: 1fr; }

  .edu-svc-grid { grid-template-columns: 1fr; }
  .edu-svc { flex-direction: row; flex-wrap: wrap; align-items: center; padding: 18px; column-gap: 14px; }
  .edu-svc-icon { margin: 0; }
  .edu-svc strong { flex: 1; }
  .edu-svc span { flex-basis: 100%; padding-left: 62px; margin-top: -6px; }

  .edu-proc { grid-template-columns: repeat(2, 1fr); row-gap: 32px; }
  .edu-proc::before { display: none; }

  .edu-faq-item summary { font-size: 15px; padding: 16px 18px; }
  .edu-faq-item p { padding: 0 18px 18px; font-size: 14px; }
}
`;

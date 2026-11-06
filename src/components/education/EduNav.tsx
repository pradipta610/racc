"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUp, Menu, X } from "lucide-react";
import LOGO from "@/lib/logo";
import { CONSULTATION_URL, NAV_LINKS } from "./eduData";

type NavLink = { id: string; label: string };

export default function EduNav({ links = NAV_LINKS, ctaLabel = "Free consultation", ctaHref = CONSULTATION_URL }: { links?: NavLink[]; ctaLabel?: string; ctaHref?: string } = {}) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Scroll progress + shadow + back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 500);
      if (window.scrollY < 300) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [links]);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const ring = 2 * Math.PI * 22;

  return (
    <>
      <header className="en-bar">
        <div className="en-inner">
          <a href="#top" className="en-logo" aria-label="RACC Australia, back to top" onClick={() => setOpen(false)}>
            <Image src={LOGO} alt="RACC Australia" width={150} height={44} style={{ objectFit: "contain" }} priority />
            <span className="en-tag">Study in Australia</span>
          </a>

          <nav aria-label="Page sections" className="en-links">
            {links.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={`en-link${active === l.id ? " is-active" : ""}`}>{l.label}</a>
            ))}
          </nav>

          <a href={ctaHref} className="en-cta">{ctaLabel}</a>

          <button
            className="en-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className="en-progress" style={{ transform: `scaleX(${progress})` }} />

        <div className={`en-mobile${open ? " is-open" : ""}`}>
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)} className={active === l.id ? "is-active" : ""}>{l.label}</a>
          ))}
          <a href={ctaHref} className="en-mobile-cta" onClick={() => setOpen(false)}>{ctaLabel}</a>
        </div>
      </header>

      <button
        className={`en-top${scrolled ? " is-visible" : ""}`} onClick={toTop}
        aria-label="Scroll to top" tabIndex={scrolled ? 0 : -1}
      >
        <svg viewBox="0 0 50 50" aria-hidden="true">
          <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
          <circle
            cx="25" cy="25" r="22" fill="none" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round"
            strokeDasharray={ring} strokeDashoffset={ring * (1 - progress)} transform="rotate(-90 25 25)"
          />
        </svg>
        <ArrowUp size={20} />
      </button>

      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

        .en-bar { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,.96); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
        .en-inner { max-width: 1280px; margin: 0 auto; padding: 0 4%; height: 72px; display: flex; align-items: center; gap: 20px; }
        .en-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
        .en-tag { font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: var(--navy); background: var(--yellow); padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
        .en-links { display: flex; gap: 2px; flex: 1; justify-content: center; }
        .en-link { font-size: 14px; font-weight: 500; color: var(--tm); text-decoration: none; padding: 8px 12px; border-radius: 8px; transition: all .2s; white-space: nowrap; }
        .en-link:hover { color: var(--navy); background: var(--light); }
        .en-link.is-active { color: var(--navy); background: var(--light); font-weight: 600; }
        .en-cta { background: #eddb3c; color: var(--navy); font-weight: 700; font-size: 14px; padding: 11px 18px; border-radius: 9px; text-decoration: none; white-space: nowrap; transition: all .2s; }
        .en-cta:hover { background: #e2cf35; transform: translateY(-1px); }
        .en-burger { display: none; margin-left: auto; background: none; border: none; color: var(--navy); cursor: pointer; padding: 8px; border-radius: 8px; }
        .en-burger:focus-visible, .en-top:focus-visible { outline: 3px solid var(--sky); outline-offset: 2px; }
        .en-progress { height: 3px; background: var(--yellow); transform-origin: left; position: absolute; left: 0; right: 0; bottom: -1px; }

        .en-mobile { display: none; }

        .en-top {
          position: fixed; right: 22px; bottom: 22px; z-index: 90; width: 54px; height: 54px; border-radius: 50%;
          border: none; background: var(--navy); color: #fff; cursor: pointer; display: grid; place-items: center;
          box-shadow: 0 10px 24px rgba(15,30,69,.3); opacity: 0; transform: translateY(16px); pointer-events: none;
          transition: opacity .25s, transform .25s, background .2s;
        }
        .en-top svg { position: absolute; inset: 2px; width: 50px; height: 50px; }
        .en-top.is-visible { opacity: 1; transform: none; pointer-events: auto; }
        .en-top:hover { background: var(--blue); }

        @media (max-width: 1120px) {
          .en-links, .en-cta { display: none; }
          .en-burger { display: grid; }
          .en-mobile {
            display: flex; flex-direction: column; gap: 2px; padding: 0 4%; max-height: 0; overflow: hidden;
            background: #fff; transition: max-height .3s ease, padding .3s ease;
          }
          .en-mobile.is-open { max-height: 520px; padding: 8px 4% 18px; border-top: 1px solid var(--border); }
          .en-mobile a { padding: 12px 14px; border-radius: 8px; color: var(--tm); text-decoration: none; font-weight: 500; }
          .en-mobile a.is-active, .en-mobile a:hover { background: var(--light); color: var(--navy); }
          .en-mobile .en-mobile-cta { margin-top: 8px; background: #eddb3c; color: var(--navy); font-weight: 700; text-align: center; }
        }
        @media (max-width: 480px) {
          .en-tag { display: none; }
          .en-top { right: 16px; bottom: 16px; }
        }
      `}</style>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  EDU_PATHWAYS,
  EDU_COURSES,
  MIG_SKILLED,
  MIG_EMPLOYER,
  MIG_OTHER,
} from "@/lib/data";
import LOGO from "@/lib/logo";

const CONSULTATION_URL = "https://www.racc.net.au/migration-agent-education-agent";

export default function NavbarV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accOpen, setAccOpen] = useState<string | null>(null);

  function toggleAcc(id: string) {
    setAccOpen((prev) => (prev === id ? null : id));
  }

  function closeMenu() {
    setMobileOpen(false);
    setAccOpen(null);
  }

  return (
    <>
      <nav className="v2-nav">
        <Link href="https://www.racc.net.au" className="v2-nav-logo">
          <Image src={LOGO} alt="RACC Australia" width={36} height={36} style={{ objectFit: "contain" }} />
          <span>RACC Australia</span>
        </Link>

        <Link href={CONSULTATION_URL} className="v2-nav-cta v2-desk-only">Book Consultation</Link>

        <ul className="v2-nav-links v2-desk-only">
          <li><Link href="/about-us">About Us</Link></li>
          <li><Link href="https://www.racc.net.au/event">News &amp; Events</Link></li>
          <li className="v2-has-dropdown">
            <Link href="https://www.racc.net.au/education-services">Education ▾</Link>
            <div className="v2-dropdown v2-cols-2">
              <div className="v2-dropdown-col">
                <div className="v2-dropdown-heading">Pathway Courses</div>
                {EDU_PATHWAYS.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
              <div className="v2-dropdown-col">
                <div className="v2-dropdown-heading">Courses &amp; Training</div>
                {EDU_COURSES.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
            </div>
          </li>
          <li className="v2-has-dropdown">
            <Link href="/migration-services">Migration ▾</Link>
            <div className="v2-dropdown v2-cols-3">
              <div className="v2-dropdown-col">
                <div className="v2-dropdown-heading">Skilled Migration</div>
                {MIG_SKILLED.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
              <div className="v2-dropdown-col">
                <div className="v2-dropdown-heading">Employer &amp; Family</div>
                {MIG_EMPLOYER.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
              <div className="v2-dropdown-col">
                <div className="v2-dropdown-heading">Other Visas</div>
                {MIG_OTHER.map((l) => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
            </div>
          </li>
          <li><Link href="/client-reviews">Client Reviews</Link></li>
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={`v2-hamburger${mobileOpen ? " open" : ""}`}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`v2-mobile-menu${mobileOpen ? " open" : ""}`}>
        <Link href="/about-us" onClick={closeMenu}>About Us</Link>
        <Link href="https://www.racc.net.au/event" onClick={closeMenu}>News &amp; Events</Link>

        {/* Education accordion */}
        <div className={`v2-mob-accordion${accOpen === "edu" ? " open" : ""}`}>
          <div className="v2-mob-acc-trigger" onClick={() => toggleAcc("edu")}>
            Education <span className="v2-acc-arrow">▼</span>
          </div>
          <div className="v2-mob-acc-panel">
            <div className="v2-mob-acc-heading">Pathway Courses</div>
            {EDU_PATHWAYS.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>)}
            <div className="v2-mob-acc-heading">Courses &amp; Training</div>
            {EDU_COURSES.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>)}
          </div>
        </div>

        {/* Migration accordion */}
        <div className={`v2-mob-accordion${accOpen === "mig" ? " open" : ""}`}>
          <div className="v2-mob-acc-trigger" onClick={() => toggleAcc("mig")}>
            Migration <span className="v2-acc-arrow">▼</span>
          </div>
          <div className="v2-mob-acc-panel">
            <div className="v2-mob-acc-heading">Skilled Migration</div>
            {MIG_SKILLED.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>)}
            <div className="v2-mob-acc-heading">Employer &amp; Family</div>
            {MIG_EMPLOYER.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>)}
            <div className="v2-mob-acc-heading">Other Visas</div>
            {MIG_OTHER.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu}>{l.label}</Link>)}
          </div>
        </div>

        <Link href="/client-reviews" onClick={closeMenu}>Client Reviews</Link>
        <Link href={CONSULTATION_URL} onClick={closeMenu} className="v2-mob-cta">Book Consultation</Link>
      </div>

      <style>{`
        .v2-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,.96);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          padding: 0 5%; display: flex; align-items: center; height: 64px; gap: 14px;
        }
        .v2-nav-logo { display: flex; align-items: center; gap: 9px; text-decoration: none; flex-shrink: 0; }
        .v2-nav-logo span { font-weight: 600; font-size: 16px; color: var(--navy); }
        .v2-nav-cta {
          background: var(--yellow); color: var(--navy); font-size: 13px; font-weight: 700;
          padding: 8px 17px; border-radius: 7px; text-decoration: none; white-space: nowrap;
          flex-shrink: 0; transition: all .15s;
        }
        .v2-nav-cta:hover { background: var(--gold); }
        .v2-nav-links {
          display: flex; align-items: center; gap: 0; flex: 1;
          justify-content: flex-end; list-style: none; margin-right: 14px;
        }
        .v2-nav-links a {
          font-size: 13px; font-weight: 500; color: var(--tm); text-decoration: none;
          padding: 6px 10px; border-radius: 6px; display: block; transition: all .15s; white-space: nowrap;
        }
        .v2-nav-links a:hover { color: var(--navy); background: var(--light); }
        .v2-has-dropdown { position: relative; }
        .v2-dropdown {
          display: none; position: absolute; top: calc(100% + 6px); left: 50%;
          transform: translateX(-50%); background: var(--white); border: 1px solid var(--border);
          border-radius: 12px; box-shadow: 0 12px 36px rgba(28,58,138,.12);
          padding: 16px; z-index: 200; gap: 20px; flex-direction: row;
        }
        .v2-cols-2 { min-width: 400px; }
        .v2-cols-3 { min-width: 620px; }
        .v2-has-dropdown:hover .v2-dropdown { display: flex; }
        .v2-dropdown-col { display: flex; flex-direction: column; gap: 1px; min-width: 168px; }
        .v2-dropdown-heading {
          font-size: 10px; font-weight: 700; color: var(--blue); text-transform: uppercase;
          letter-spacing: 1.2px; padding: 3px 10px 7px; border-bottom: 1px solid var(--border); margin-bottom: 3px;
        }
        .v2-dropdown a {
          font-size: 12.5px; color: var(--tm); text-decoration: none; padding: 5px 10px;
          border-radius: 6px; transition: all .12s;
        }
        .v2-dropdown a:hover { background: var(--light); color: var(--navy); }

        /* Hamburger */
        .v2-hamburger {
          display: none; flex-direction: column; justify-content: center; align-items: center;
          width: 36px; height: 36px; cursor: pointer; background: none; border: none;
          border-radius: 8px; padding: 0; flex-shrink: 0; margin-left: auto; transition: background .15s;
        }
        .v2-hamburger:hover { background: var(--light); }
        .v2-hamburger span {
          display: block; width: 18px; height: 1.5px; background: var(--navy); border-radius: 2px;
          transition: transform .28s cubic-bezier(.4,0,.2,1), opacity .2s ease, width .2s ease;
          transform-origin: center; position: absolute;
        }
        .v2-hamburger span:nth-child(1) { transform: translateY(-5px); }
        .v2-hamburger span:nth-child(2) { transform: translateY(0); }
        .v2-hamburger span:nth-child(3) { transform: translateY(5px); width: 12px; }
        .v2-hamburger.open span:nth-child(1) { transform: translateY(0) rotate(45deg); }
        .v2-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .v2-hamburger.open span:nth-child(3) { transform: translateY(0) rotate(-45deg); width: 18px; }

        /* Mobile menu */
        .v2-mobile-menu {
          position: fixed; top: 64px; left: 0; right: 0;
          background: rgba(255,255,255,.98);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 10px 5% 16px; z-index: 99;
          flex-direction: column; gap: 2px;
          box-shadow: 0 12px 32px rgba(28,58,138,.1);
          display: flex; opacity: 0; transform: translateY(-8px);
          pointer-events: none;
          transition: opacity .25s ease, transform .25s cubic-bezier(.4,0,.2,1);
        }
        .v2-mobile-menu.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .v2-mobile-menu > a {
          font-size: 14px; font-weight: 500; color: var(--tm); text-decoration: none;
          padding: 10px 12px; border-radius: 8px;
          opacity: 0; transform: translateX(-8px);
          transition: background .15s, color .15s, opacity .22s ease, transform .22s ease;
          display: block;
        }
        .v2-mobile-menu.open > a { opacity: 1; transform: translateX(0); }
        .v2-mobile-menu > a:hover { background: var(--light); color: var(--navy); }

        /* Accordion */
        .v2-mob-accordion {
          opacity: 0; transform: translateX(-8px);
          transition: opacity .22s ease, transform .22s ease;
        }
        .v2-mobile-menu.open .v2-mob-accordion { opacity: 1; transform: translateX(0); }
        .v2-mob-acc-trigger {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 12px; border-radius: 8px; cursor: pointer;
          font-size: 14px; font-weight: 500; color: var(--tm);
          transition: background .15s, color .15s; user-select: none;
        }
        .v2-mob-acc-trigger:hover { background: var(--light); color: var(--navy); }
        .v2-acc-arrow {
          font-size: 11px; color: var(--tl);
          transition: transform .22s cubic-bezier(.4,0,.2,1); flex-shrink: 0;
        }
        .v2-mob-accordion.open .v2-mob-acc-trigger { color: var(--navy); }
        .v2-mob-accordion.open .v2-acc-arrow { transform: rotate(180deg); }
        .v2-mob-acc-panel {
          max-height: 0; overflow: hidden;
          transition: max-height .3s cubic-bezier(.4,0,.2,1);
        }
        .v2-mob-accordion.open .v2-mob-acc-panel { max-height: 800px; }
        .v2-mob-acc-heading {
          font-size: 10px; font-weight: 700; color: var(--blue);
          text-transform: uppercase; letter-spacing: 1.2px;
          padding: 14px 12px 5px 20px; margin-top: 4px;
        }
        .v2-mob-acc-panel a {
          font-size: 13px; padding: 8px 12px 8px 20px;
          border-radius: 7px; color: var(--tm); display: block;
          text-decoration: none; transition: background .15s, color .15s;
        }
        .v2-mob-acc-panel a:hover { background: var(--light); color: var(--navy); }
        .v2-mob-cta {
          background: var(--yellow) !important; color: var(--navy) !important;
          font-weight: 700 !important; text-align: center; margin-top: 6px;
          border-radius: 8px;
        }

        /* stagger delays */
        .v2-mobile-menu.open > a:nth-child(1) { transition-delay: .04s; }
        .v2-mobile-menu.open > a:nth-child(2) { transition-delay: .08s; }
        .v2-mobile-menu.open > .v2-mob-accordion:nth-of-type(1) { transition-delay: .12s; }
        .v2-mobile-menu.open > .v2-mob-accordion:nth-of-type(2) { transition-delay: .16s; }
        .v2-mobile-menu.open > a:nth-last-child(2) { transition-delay: .20s; }
        .v2-mobile-menu.open > a:nth-last-child(1) { transition-delay: .24s; }

        @media (max-width: 768px) {
          .v2-desk-only { display: none !important; }
          .v2-hamburger { display: flex; position: relative; }
          .v2-nav { padding: 0 4%; }
        }
      `}</style>
    </>
  );
}

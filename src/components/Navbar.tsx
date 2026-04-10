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

interface NavbarProps { activePage?: "news" | "migration" | "reviews" | "about"; }

export default function Navbar({ activePage }: NavbarProps = {}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "var(--white)", borderBottom: "1px solid var(--border)",
        padding: "0 5%", display: "flex", alignItems: "center",
        height: 80, gap: 20,
      }}>
        {/* Logo */}
        <Link href="https://www.racc.net.au" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", flexShrink: 0 }}>
          <Image src={LOGO} alt="RACC Australia" width={180} height={50} style={{ objectFit: "contain" }} />
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center", listStyle: "none" }}
          className="nav-links-desktop">
          <li><Link href="/about-us" className={`nav-link${activePage === "about" ? " nav-link-active" : ""}`}>About Us</Link></li>

          {/* Education dropdown */}
          <li className="has-dropdown">
            <Link href="https://www.racc.net.au/education-migration-and-study-options-popular-occupations-australia" className="nav-link">
              Education ▾
            </Link>
            <div className="dropdown cols-2">
              <div className="dropdown-col">
                <div className="dropdown-heading">Pathway Courses</div>
                {EDU_PATHWAYS.map((l) => <Link key={l.href} href={l.href} className="dropdown-link">{l.label}</Link>)}
              </div>
              <div className="dropdown-col">
                <div className="dropdown-heading">Courses &amp; Training</div>
                {EDU_COURSES.map((l) => <Link key={l.href} href={l.href} className="dropdown-link">{l.label}</Link>)}
              </div>
            </div>
          </li>

          {/* Migration dropdown */}
          <li className="has-dropdown">
            <Link href="/migration-services" className={`nav-link${activePage === "migration" ? " nav-link-active" : ""}`}>
              Migration ▾
            </Link>
            <div className="dropdown cols-3">
              <div className="dropdown-col">
                <div className="dropdown-heading">Skilled Migration</div>
                {MIG_SKILLED.map((l) => <Link key={l.href} href={l.href} className="dropdown-link">{l.label}</Link>)}
              </div>
              <div className="dropdown-col">
                <div className="dropdown-heading">Employer &amp; Family</div>
                {MIG_EMPLOYER.map((l) => <Link key={l.href} href={l.href} className="dropdown-link">{l.label}</Link>)}
              </div>
              <div className="dropdown-col">
                <div className="dropdown-heading">Other Visas</div>
                {MIG_OTHER.map((l) => <Link key={l.href} href={l.href} className="dropdown-link">{l.label}</Link>)}
              </div>
            </div>
          </li>

          <li><Link href="/news-events" className={`nav-link${activePage === "news" ? " nav-link-active" : ""}`}>News &amp; Events</Link></li>
          <li><Link href="/client-reviews" className={`nav-link${activePage === "reviews" ? " nav-link-active" : ""}`}>Client Reviews</Link></li>
        </ul>

        {/* CTA */}
        <Link href={CONSULTATION_URL} className="nav-cta-btn nav-links-desktop">
          Book Consultation
        </Link>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={`hamburger-btn${mobileOpen ? " is-open" : ""}`}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu — always rendered, animated via CSS */}
      <div className={`mobile-menu${mobileOpen ? " mobile-menu-open" : ""}`}>
        {[
          { href: "/about-us", label: "About Us" },
          { href: "https://www.racc.net.au/education-migration-and-study-options-popular-occupations-australia", label: "Education" },
          { href: "/migration-services", label: "Migration" },
          { href: "/news-events", label: "News & Events" },
          { href: "/client-reviews", label: "Client Reviews" },
        ].map((item, i) => (
          <Link key={item.href} href={item.href} className="mobile-link" style={{ transitionDelay: mobileOpen ? `${(i + 1) * 50}ms` : "0ms" }}>
            {item.label}
          </Link>
        ))}
        <Link href={CONSULTATION_URL} className="mobile-link mob-cta" style={{ transitionDelay: mobileOpen ? "300ms" : "0ms" }}>
          Book Consultation
        </Link>
      </div>

      <style>{`
        .nav-link {
          font-size: 16px; font-weight: 500; color: var(--tm);
          text-decoration: none; padding: 8px 14px; border-radius: 6px; transition: all .2s;
        }
        .nav-link:hover, .nav-link-active { background: var(--light); color: var(--navy); font-weight: 600; }
        .nav-cta-btn {
          background: var(--yellow); color: var(--navy); font-size: 15px; font-weight: 700;
          padding: 11px 22px; border-radius: 8px; text-decoration: none; white-space: nowrap;
          flex-shrink: 0; transition: all .2s;
        }
        .nav-cta-btn:hover { background: var(--gold); }
        .hamburger-btn {
          display: none; flex-direction: column; gap: 5px; cursor: pointer;
          background: none; border: none; padding: 8px;
          margin-left: auto;
        }
        .hamburger-btn span {
          width: 22px; height: 2px; background: var(--navy); border-radius: 2px;
          display: block; transition: all .3s ease;
          transform-origin: center;
        }
        .hamburger-btn.is-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger-btn.is-open span:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .hamburger-btn.is-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .has-dropdown { position: relative; }
        .has-dropdown > a { cursor: pointer; }
        .dropdown {
          display: none; position: absolute; top: calc(100% + 8px); left: 50%;
          transform: translateX(-50%); background: var(--white); border: 1px solid var(--border);
          border-radius: 14px; box-shadow: 0 16px 48px rgba(28,58,138,.14);
          padding: 20px; z-index: 200; min-width: 220px; gap: 24px; flex-direction: row;
        }
        .dropdown.cols-2 { min-width: 440px; }
        .dropdown.cols-3 { min-width: 660px; }
        .has-dropdown:hover .dropdown { display: flex; }
        .dropdown-col { display: flex; flex-direction: column; gap: 2px; min-width: 180px; }
        .dropdown-heading {
          font-size: 11px; font-weight: 700; color: var(--blue); text-transform: uppercase;
          letter-spacing: 1px; padding: 4px 10px 8px; border-bottom: 1px solid var(--border); margin-bottom: 4px;
        }
        .dropdown-link {
          font-size: 14px; color: var(--tm); text-decoration: none; padding: 6px 10px;
          border-radius: 7px; transition: all .15s; white-space: nowrap;
        }
        .dropdown-link:hover { background: var(--light); color: var(--navy); }
        .mobile-menu {
          position: fixed; top: 80px; left: 0; right: 0; background: var(--white);
          border-bottom: 1px solid var(--border); padding: 0 5%; z-index: 99;
          display: flex; flex-direction: column; gap: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,.08);
          max-height: 0; overflow: hidden; opacity: 0;
          transition: max-height .35s cubic-bezier(.4,0,.2,1), opacity .25s ease, padding .35s ease;
        }
        .mobile-menu.mobile-menu-open {
          max-height: 420px; opacity: 1; padding: 14px 5% 20px;
        }
        .mobile-link {
          font-size: 16px; font-weight: 500; color: var(--tm);
          text-decoration: none; padding: 12px 14px; border-radius: 8px;
          opacity: 0; transform: translateY(-8px);
          transition: opacity .25s ease, transform .25s ease, background .15s ease, color .15s ease;
        }
        .mobile-menu-open .mobile-link {
          opacity: 1; transform: translateY(0);
        }
        .mobile-link:hover { background: var(--light); color: var(--navy); }
        .mob-cta {
          background: var(--yellow) !important; color: var(--navy) !important;
          font-weight: 700 !important; text-align: center; margin-top: 6px;
        }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          nav img { width: 120px !important; height: auto !important; }
        }
      `}</style>
    </>
  );
}

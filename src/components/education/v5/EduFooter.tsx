import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { OFFICE, MARNS, EDU_FOOTER_LINKS } from "./v5Data";

/* Education-only footer for the v5 landing page (no migration links). */
export default function EduFooter() {
  return (
    <footer className="ef">
      <div className="ef-wrap ef-grid">
        <div>
          <Image src="/logo-whtie-text.png" alt="RACC Australia" width={160} height={103} style={{ objectFit: "contain", height: "auto" }} />
          <p className="ef-about">Melbourne education agency helping international students choose a course, apply and get their student visa for 20+ years.</p>
        </div>
        <nav aria-label="Study options">
          <strong className="ef-title">Study in Australia</strong>
          <ul>
            {EDU_FOOTER_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <strong className="ef-title">Contact</strong>
          <ul className="ef-contact">
            <li><MapPin size={16} /> <span>{OFFICE.line1}, {OFFICE.line2}</span></li>
            <li><Clock size={16} /> <span>{OFFICE.hours}</span></li>
            <li><Phone size={16} /> <a href={OFFICE.phoneHref}>{OFFICE.phone}</a></li>
            <li><Mail size={16} /> <a href={`mailto:${OFFICE.email}`}>{OFFICE.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="ef-wrap ef-bottom">
        <span>© {new Date().getFullYear()} RACC Australia</span>
        <span>Student visas prepared by registered agents · MARN {MARNS.join(" · ")}</span>
      </div>
      <style>{`
        .ef { background: #0b1f4a; color: rgba(255,255,255,.75); padding: 72px 0 28px; }
        .ef-wrap { max-width: 1200px; margin: 0 auto; padding: 0 5%; }
        .ef-grid { display: grid; grid-template-columns: 1.3fr 1fr 1.2fr; gap: 48px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,.12); }
        .ef-about { font-size: 14px; line-height: 1.65; margin-top: 16px; max-width: 320px; }
        .ef-title { display: block; color: var(--yellow); font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .ef ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ef a { color: rgba(255,255,255,.8); text-decoration: none; font-size: 14px; transition: color .2s; }
        .ef a:hover { color: #fff; text-decoration: underline; }
        .ef-contact li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
        .ef-contact svg { color: var(--yellow); flex-shrink: 0; margin-top: 2px; }
        .ef-bottom { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 22px; font-size: 12px; color: rgba(255,255,255,.5); }
        @media (max-width: 800px) { .ef-grid { grid-template-columns: 1fr; gap: 32px; } }
      `}</style>
    </footer>
  );
}

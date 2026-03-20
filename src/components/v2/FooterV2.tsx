import Link from "next/link";
import Image from "next/image";
import {
  FOOTER_MIG,
  FOOTER_EDU,
} from "@/lib/data";

const FOOTER_QUICK_V2 = [
  { label: "About Us", href: "https://www.racc.net.au/about-us" },
  { label: "Client Reviews", href: "https://www.racc.net.au/client-reviews" },
  { label: "News & Events", href: "https://www.racc.net.au/event" },
  { label: "Book Consultation", href: "https://www.racc.net.au/migration-agent-education-agent" },
  { label: "Privacy Policy", href: "https://www.racc.net.au/privacy-policy" },
];

const CONTACT_PILLS = [
  { icon: "📍", title: "343 Little Collins St, Level 7", sub: "Melbourne VIC 3000", href: "https://maps.google.com/?q=343+Little+Collins+Street+Melbourne" },
  { icon: "📞", title: "+61 420 746 705", sub: "Mon–Fri, 9am–6pm", href: "tel:+61420746705" },
  { icon: "✉️", title: "info@racc.net.au", sub: "Email anytime", href: "mailto:info@racc.net.au" },
  { icon: "💬", title: "WhatsApp", sub: "+61 485 505 268", href: "https://wa.me/61420746705" },
];

const SOCIALS = [
  { title: "Instagram", href: "https://www.instagram.com/racc_australia/", svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { title: "Facebook", href: "https://www.facebook.com/raccaustraliamigrationagenteducationagent", svg: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { title: "LinkedIn", href: "https://www.linkedin.com/company/19271554/", svg: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { title: "YouTube", href: "https://www.youtube.com/@RACCAustralia", svg: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" },
  { title: "TikTok", href: "https://www.tiktok.com/@racc.australia", svg: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
];

export default function FooterV2() {
  return (
    <footer className="v2-footer">
      <div className="v2-ft-wrap">
        <div className="v2-ft-grid">
          <div>
            <Link href="https://www.racc.net.au" className="v2-ft-brand">
              <Image src="/logo-whtie-text.png" alt="RACC Australia" width={120} height={33} style={{ objectFit: "contain" }} />
            </Link>
            <p className="v2-ft-tagline">
              Registered migration agents and education consultancy in Melbourne. Helping people build a life in Australia for 20+ years.
            </p>
          </div>
          <div className="v2-ft-pills">
            {CONTACT_PILLS.map((p) => (
              <Link key={p.title} href={p.href} className="v2-ft-pill">
                <span className="v2-ft-pill-ico">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <span>{p.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="v2-ft-links">
          <div className="v2-ft-col">
            <h4>✈️ Migration</h4>
            <ul>
              {FOOTER_MIG.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="v2-ft-col">
            <h4>🎓 Education</h4>
            <ul>
              {FOOTER_EDU.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="v2-ft-col">
            <h4>🔗 Quick Links</h4>
            <ul>
              {FOOTER_QUICK_V2.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="v2-ft-bottom">
        <div className="v2-ft-socs">
          {SOCIALS.map((s) => (
            <Link key={s.title} href={s.href} className="v2-ft-soc" title={s.title}>
              <svg viewBox="0 0 24 24"><path d={s.svg} /></svg>
            </Link>
          ))}
        </div>
        <div>
          <div className="v2-ft-copy">
            © 2025 RACC Australia{" "}
            <Link href="https://www.racc.net.au/privacy-policy">Privacy Policy</Link>
          </div>
          <div className="v2-ft-marn">MARN 1572962 · MARN 1172003 · MARN 2518802</div>
        </div>
      </div>

      <style>{`
        .v2-footer { background: #0B1F4A; }
        .v2-ft-wrap { max-width: 1100px; margin: 0 auto; padding: 48px 5% 0; }
        .v2-ft-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 36px;
          padding-bottom: 36px; border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .v2-ft-brand { display: inline-block; text-decoration: none; margin-bottom: 14px; }
        .v2-ft-tagline { font-size: 13px; color: rgba(255,255,255,.42); line-height: 1.7; max-width: 300px; }
        .v2-ft-pills { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
        .v2-ft-pill {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
          border-radius: 8px; padding: 9px 12px; text-decoration: none; transition: all .15s;
        }
        .v2-ft-pill:hover { background: rgba(245,197,24,.07); border-color: rgba(245,197,24,.2); }
        .v2-ft-pill-ico { font-size: 13px; }
        .v2-ft-pill strong { font-size: 11px; color: var(--white); display: block; }
        .v2-ft-pill span { font-size: 10px; color: rgba(255,255,255,.32); }
        .v2-ft-links {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
          padding: 32px 0 28px; border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .v2-ft-col h4 {
          font-size: 10px; font-weight: 700; color: var(--yellow);
          text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;
        }
        .v2-ft-col ul { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .v2-ft-col ul li a {
          font-size: 12px; color: rgba(255,255,255,.38); text-decoration: none;
          transition: all .15s; display: flex; align-items: center; gap: 5px;
        }
        .v2-ft-col ul li a::before {
          content: ''; width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,.18); flex-shrink: 0; transition: background .15s;
        }
        .v2-ft-col ul li a:hover { color: rgba(255,255,255,.8); padding-left: 3px; }
        .v2-ft-col ul li a:hover::before { background: var(--yellow); }
        .v2-ft-bottom {
          max-width: 1100px; margin: 0 auto; padding: 16px 5% 24px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
        .v2-ft-socs { display: flex; gap: 7px; }
        .v2-ft-soc {
          width: 32px; height: 32px; border-radius: 7px;
          border: 1px solid rgba(255,255,255,.1);
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; background: rgba(255,255,255,.04); transition: all .15s;
        }
        .v2-ft-soc svg { width: 14px; height: 14px; fill: rgba(255,255,255,.38); transition: fill .15s; }
        .v2-ft-soc:hover { background: var(--yellow); border-color: var(--yellow); }
        .v2-ft-soc:hover svg { fill: var(--navy); }
        .v2-ft-copy { font-size: 11px; color: rgba(255,255,255,.18); }
        .v2-ft-copy a { color: rgba(255,255,255,.18); text-decoration: none; margin-left: 12px; }
        .v2-ft-copy a:hover { color: var(--yellow); }
        .v2-ft-marn { font-size: 10px; color: rgba(255,255,255,.1); margin-top: 3px; }
        @media (max-width: 900px) {
          .v2-ft-grid { grid-template-columns: 1fr; }
          .v2-ft-pills { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .v2-ft-links { grid-template-columns: 1fr 1fr; }
          .v2-ft-bottom { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 520px) {
          .v2-ft-links { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}

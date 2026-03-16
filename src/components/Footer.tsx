import Link from "next/link";
import Image from "next/image";
import { FOOTER_MIG, FOOTER_EDU, FOOTER_QUICK } from "@/lib/data";
import LOGO from "@/lib/logo";

const SOCIALS = [
  {
    title: "Instagram",
    href: "https://www.instagram.com/racc_australia/",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/raccaustraliamigrationagenteducationagent",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/company/19271554/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@RACCAustralia",
    path: "M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z",
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@racc.australia",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
];

const FOOTER_COLS = [
  { icon: "✈️", heading: "Migration", links: FOOTER_MIG },
  { icon: "🎓", heading: "Education", links: FOOTER_EDU },
  { icon: "🔗", heading: "Quick Links", links: FOOTER_QUICK },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0B1F4A", position: "relative", overflow: "hidden" }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: -120, right: -120, width: 400, height: 400,
        borderRadius: "50%", background: "rgba(46,109,180,.12)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80, width: 280, height: 280,
        borderRadius: "50%", background: "rgba(245,197,24,.05)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 5% 0" }}>

        {/* Brand + contact row */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40,
          paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,.08)",
        }} className="ft-brand-row">

          <div>
            <Link href="https://www.racc.net.au" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
              <Image src={LOGO} alt="RACC Australia" width={52} height={52}
                style={{ objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,.3))" }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1 }}>RACC Australia</strong>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: ".5px", marginTop: 3 }}>
                  Migration &amp; Education Agent
                </span>
              </div>
            </Link>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 280, marginTop: 16 }}>
              Registered migration agent and education consultancy in Melbourne. Helping people build a life in Australia for 20+ years.
            </p>
          </div>

          {/* Contact pills */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="ft-pills">
            {[
              { icon: "📍", bg: "rgba(91,163,217,.15)", title: "343 Little Collins St, Level 7", sub: "Melbourne VIC 3000", href: "https://maps.google.com/?q=343+Little+Collins+Street+Melbourne" },
              { icon: "📞", bg: "rgba(46,180,120,.15)", title: "+61 420 746 705", sub: "Mon–Fri, 9am–6pm", href: "tel:+61420746705" },
              { icon: "✉️", bg: "rgba(245,197,24,.12)", title: "info@racc.net.au", sub: "Email us anytime", href: "mailto:info@racc.net.au" },
              { icon: "💬", bg: "rgba(37,211,102,.15)", title: "WhatsApp Us", sub: "+61 485 505 268", href: "https://wa.me/61420746705" },
            ].map((p) => (
              <Link key={p.title} href={p.href} className="ft-pill" style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 10, padding: "10px 16px", textDecoration: "none", transition: "all .2s",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: p.bg,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0,
                }}>{p.icon}</div>
                <div>
                  <strong style={{ fontSize: 12, color: "#fff", display: "block", fontWeight: 600 }}>{p.title}</strong>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{p.sub}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40,
          padding: "40px 0 36px", borderBottom: "1px solid rgba(255,255,255,.08)",
        }} className="ft-links-row">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 style={{
                fontSize: 11, fontWeight: 700, color: "var(--yellow)", textTransform: "uppercase",
                letterSpacing: "1.2px", marginBottom: 16, display: "flex", alignItems: "center", gap: 7,
              }}>
                <span style={{ fontSize: 16 }}>{col.icon}</span> {col.heading}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="ft-col-link" style={{
                      fontSize: 13, color: "rgba(255,255,255,.45)", textDecoration: "none",
                      transition: "all .2s", display: "flex", alignItems: "center", gap: 6,
                    }}>
                      <span style={{
                        width: 4, height: 4, borderRadius: "50%",
                        background: "rgba(255,255,255,.2)", flexShrink: 0, display: "inline-block",
                      }} />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "20px 5% 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16,
      }} className="ft-bottom">
        <div style={{ display: "flex", gap: 10 }}>
          {SOCIALS.map((s) => (
            <Link key={s.title} href={s.href} title={s.title} className="ft-soc" style={{
              width: 36, height: 36, borderRadius: 9, border: "1px solid rgba(255,255,255,.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              textDecoration: "none", transition: "all .2s", background: "rgba(255,255,255,.04)",
            }}>
              <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "rgba(255,255,255,.45)", transition: "fill .2s" }}>
                <path d={s.path} />
              </svg>
            </Link>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>
            © 2025 RACC Australia{" "}
            <Link href="https://www.racc.net.au/privacy-policy"
              style={{ color: "rgba(255,255,255,.2)", textDecoration: "none", marginLeft: 16 }}>
              Privacy Policy
            </Link>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.15)", marginTop: 4 }}>
            MARN 1572962 · MARN 1172003 · MARN 2518802
          </div>
        </div>
      </div>

      <style>{`
        .ft-pill:hover  { background: rgba(245,197,24,.1) !important; border-color: rgba(245,197,24,.3) !important; }
        .ft-col-link:hover { color: #fff !important; padding-left: 4px; }
        .ft-soc:hover   { background: var(--yellow) !important; border-color: var(--yellow) !important; }
        .ft-soc:hover svg { fill: var(--navy) !important; }
        @media (max-width: 768px) {
          .ft-brand-row  { grid-template-columns: 1fr !important; gap: 24px !important; }
          .ft-pills      { grid-template-columns: 1fr !important; }
          .ft-links-row  { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .ft-bottom     { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
        }
      `}</style>
    </footer>
  );
}

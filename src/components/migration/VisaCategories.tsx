import Link from "next/link";
import { VISA_CATEGORIES } from "@/lib/data";

export default function VisaCategories() {
  return (
    <section id="visa-categories" style={{ padding: "72px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Our Services</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 30, color: "var(--td)", marginBottom: 8,
          }}>All Migration Visa Categories</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 600, lineHeight: 1.7 }}>
            Whether you&apos;re a skilled professional, an employer, or reuniting with family — we have the expertise to guide your application from start to finish.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="vcat-grid">
          {VISA_CATEGORIES.map((cat) => (
            <div key={cat.title} className="vcat" style={{
              background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 16,
              padding: 26, display: "flex", flexDirection: "column", transition: "all .25s",
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, background: "var(--light)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 16, flexShrink: 0,
              }}>{cat.icon}</div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--td)", marginBottom: 8 }}>{cat.title}</h3>

              <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
                {cat.desc}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                {cat.sublinks.map((l) => (
                  <Link key={l.href} href={l.href} className="vcat-sublink" style={{
                    fontSize: 12, color: "var(--blue)", textDecoration: "none",
                    padding: "4px 0", display: "flex", alignItems: "center", gap: 5, transition: "all .2s",
                  }}>
                    <span style={{ fontSize: 14, opacity: 0.5 }}>›</span>
                    {l.label}
                  </Link>
                ))}
              </div>

              <Link href={cat.cta.href} className="vcat-cta-link" style={{
                fontSize: 13, fontWeight: 600, color: "var(--navy)",
                display: "flex", alignItems: "center", gap: 5, marginTop: "auto",
                textDecoration: "none",
              }}>
                {cat.cta.label} <span className="vcat-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .vcat:hover { border-color: var(--blue) !important; box-shadow: 0 10px 32px rgba(28,58,138,.1); transform: translateY(-3px); }
        .vcat-sublink:hover { color: var(--navy) !important; padding-left: 4px !important; }
        .vcat:hover .vcat-arrow { transform: translateX(4px); display: inline-block; transition: transform .2s; }
        @media (max-width: 1024px) { .vcat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px)  { .vcat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

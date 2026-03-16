import Link from "next/link";
import { ABOUT_CONSULT_CARDS } from "@/lib/data";

const THEME = {
  mig: { head: "linear-gradient(135deg,var(--navy),var(--blue))", btn: "var(--navy)", btnHover: "var(--blue)" },
  edu: { head: "linear-gradient(135deg,#1a6b3a,#2e8b57)",        btn: "#1a6b3a",      btnHover: "#2e8b57" },
};

export default function ConsultTypes() {
  return (
    <section style={{ padding: "72px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ width: 28, height: 2, background: "var(--yellow)", display: "inline-block" }} />
            Book a Consultation
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 34, color: "var(--td)", marginBottom: 10 }}>Talk to Our Team</h2>
          <p style={{ fontSize: 15, color: "var(--tm)" }}>
            Choose the consultation that best fits your needs — migration pathway or education and study queries.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="consult-grid">
          {ABOUT_CONSULT_CARDS.map((c) => {
            const t = THEME[c.theme];
            return (
              <div key={c.title} className="consult-card" style={{ borderRadius: 18, overflow: "hidden", border: "1.5px solid var(--border)", transition: "all .2s" }}>
                {/* Coloured head */}
                <div style={{ padding: "28px 28px 22px", background: t.head }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{c.icon}</span>
                    <h3 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 20, color: "#fff" }}>{c.title}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.65 }}>{c.desc}</p>
                  <span style={{ display: "inline-block", marginTop: 12, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>
                    {c.price}
                  </span>
                </div>
                {/* White body */}
                <div style={{ padding: "22px 28px 26px", background: "var(--white)" }}>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                    {c.items.map((item) => (
                      <li key={item} style={{ fontSize: 13, color: "var(--tm)", display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <span style={{ color: "var(--blue)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={c.btnHref} style={{ display: "block", textAlign: "center", background: t.btn, color: "#fff", fontSize: 13, fontWeight: 600, padding: 12, borderRadius: 9, textDecoration: "none", transition: "all .2s" }} className={`book-btn-${c.theme}`}>
                    {c.btnLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .consult-card:hover { box-shadow: 0 10px 32px rgba(28,58,138,.1); transform: translateY(-2px); }
        .book-btn-mig:hover { background: var(--blue) !important; }
        .book-btn-edu:hover { background: #2e8b57 !important; }
        @media (max-width: 768px) { .consult-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

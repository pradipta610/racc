import { ABOUT_LANGUAGES, ABOUT_CAREER_CARDS } from "@/lib/data";

export default function TeamLanguages() {
  return (
    <section style={{ background: "var(--off)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "72px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ width: 28, height: 2, background: "var(--yellow)", display: "inline-block" }} />
            Our Multilingual Team
            <span style={{ width: 28, height: 2, background: "var(--yellow)", display: "inline-block" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 34, color: "var(--td)", marginBottom: 10 }}>We Speak Your Language</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 560, margin: "0 auto" }}>
            Our team of registered agents and education consultants serves clients from across the world, communicating fluently in 9+ languages.
          </p>
        </div>

        {/* Language grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 48 }} className="lang-grid">
          {ABOUT_LANGUAGES.map((l) => (
            <div key={l.lang + l.sub} className="lang-card" style={{
              background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14,
              padding: 20, textAlign: "center", transition: "all .2s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{l.flag}</div>
              <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--td)" }}>{l.lang}</strong>
              <span style={{ fontSize: 12, color: "var(--tl)" }}>{l.sub}</span>
            </div>
          ))}
        </div>

        {/* Career support */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 28, height: 2, background: "var(--yellow)", display: "inline-block" }} />
          Career Support Services
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="career-grid">
          {ABOUT_CAREER_CARDS.map((c) => (
            <div key={c.title} className="career-card" style={{
              background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24, transition: "all .2s",
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
              <h4 style={{ fontSize: 15, fontWeight: 600, color: "var(--td)", marginBottom: 6 }}>{c.title}</h4>
              <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lang-card:hover { border-color: var(--blue) !important; box-shadow: 0 6px 20px rgba(28,58,138,.08); transform: translateY(-2px); }
        .career-card:hover { border-color: var(--sky) !important; box-shadow: 0 6px 20px rgba(28,58,138,.07); }
        @media (max-width: 1024px) { .lang-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media (max-width: 768px)  { .lang-grid { grid-template-columns: repeat(2,1fr) !important; } .career-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px)  { .lang-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>
  );
}

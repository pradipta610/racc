import { WHY_CARDS } from "@/lib/data";

export default function WhyRacc() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Why Choose Us</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>Why Thousands Trust RACC</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            We go beyond lodging applications — your long-term partner in building a life in Australia.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="why-grid">
          {WHY_CARDS.map((c) => (
            <div key={c.title} style={{
              background: "var(--white)", border: "1.5px solid var(--border)",
              borderRadius: 14, padding: "24px 18px", borderLeft: "4px solid var(--navy)",
            }}>
              <span style={{ fontSize: 28, marginBottom: 12, display: "block" }}>{c.icon}</span>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--td)", marginBottom: 7 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px)  { .why-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px)  { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

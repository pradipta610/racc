import { GOOGLE_BARS } from "@/lib/data";

export default function GoogleRating() {
  return (
    <div style={{
      background: "var(--off)", borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)", padding: "48px 5%",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center",
      }} className="g-inner">

        {/* Left */}
        <div>
          <h2 style={{
            fontFamily: "var(--font-playfair),'Playfair Display',serif",
            fontSize: 28, color: "var(--td)", marginBottom: 10,
          }}>Rated 4.9 / 5 on Google</h2>
          <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.7, marginBottom: 18 }}>
            RACC Australia has achieved 4.9 out of 5 customer service satisfaction across 20+ years of serving clients from all over the world.
          </p>
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            background: "var(--white)", border: "1.5px solid var(--border)",
            borderRadius: 14, padding: "18px 22px",
          }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>4.9</span>
            <div>
              <strong style={{ display: "block", fontSize: 14, color: "var(--td)" }}>Customer Satisfaction</strong>
              <div style={{ color: "var(--yellow)", fontSize: 16, letterSpacing: 2, margin: "3px 0" }}>★★★★★</div>
              <span style={{ fontSize: 12, color: "var(--tl)" }}>500+ client reviews</span>
            </div>
          </div>
        </div>

        {/* Right: bar chart */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {GOOGLE_BARS.map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12, color: "var(--tl)", width: 32, textAlign: "right", flexShrink: 0 }}>{b.label}</span>
              <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 4, background: b.color, width: `${b.pct}%` }} />
              </div>
              <span style={{ fontSize: 12, color: "var(--tl)", width: 28, flexShrink: 0 }}>{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .g-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

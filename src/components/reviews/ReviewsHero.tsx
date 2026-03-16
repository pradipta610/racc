import { REVIEWS_STATS } from "@/lib/data";

export default function ReviewsHero() {
  return (
    <section style={{
      background: "linear-gradient(135deg,#0F1E45 0%,#1C3A8A 60%,#2E6DB4 100%)",
      padding: "60px 5% 68px", position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(91,163,217,.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(245,197,24,.06)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
          color: "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 600,
          padding: "5px 14px", borderRadius: 20, marginBottom: 16,
          letterSpacing: ".5px", textTransform: "uppercase",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
          4.9 / 5 Customer Satisfaction
        </div>

        <h1 style={{
          fontFamily: "var(--font-playfair),'Playfair Display',serif",
          fontSize: 40, lineHeight: 1.2, color: "#fff", marginBottom: 14,
        }}>
          Real Clients.{" "}
          <em style={{ color: "var(--yellow)", fontStyle: "normal" }}>Real Results.</em>
        </h1>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.75, marginBottom: 32, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Every client is special. At RACC, we treat all of our clients as friends — providing genuine advice and our fullest support. Here&apos;s what they say.
        </p>

        {/* Stat row */}
        <div style={{
          display: "flex", justifyContent: "center", maxWidth: 640, margin: "0 auto",
          background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
          borderRadius: 16, overflow: "hidden",
        }} className="rv-stat-row">
          {REVIEWS_STATS.map((s, i) => (
            <div key={s.label} style={{
              flex: 1, padding: "20px 16px", textAlign: "center",
              borderRight: i < REVIEWS_STATS.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none",
            }}>
              <strong style={{ display: "block", fontSize: 26, fontWeight: 700, color: "var(--yellow)" }}>{s.val}</strong>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 3, display: "block" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .rv-stat-row { flex-wrap: wrap !important; }
          .rv-stat-row > div { flex: 1 1 45% !important; }
        }
        @media (max-width: 480px) {
          .rv-stat-row > div { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}

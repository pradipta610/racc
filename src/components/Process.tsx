import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>How It Works</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>Our Simple 4-Step Process</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            From first consultation to visa approval — we&apos;re with you at every step.
          </p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative",
        }} className="psteps">
          <div className="psteps-line" />
          {PROCESS_STEPS.map((s) => (
            <div key={s.title} style={{ textAlign: "center", padding: "0 14px", position: "relative", zIndex: 1 }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%", background: "var(--navy)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px", fontSize: 22, boxShadow: "0 4px 16px rgba(28,58,138,.2)",
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--td)", marginBottom: 5 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .psteps-line {
          content: '';
          position: absolute;
          top: 34px; left: 12.5%; right: 12.5%;
          height: 2px;
          background: var(--border);
          z-index: 0;
          width: 75%;
        }
        @media (max-width: 768px) {
          .psteps { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .psteps-line { display: none !important; }
        }
        @media (max-width: 480px) {
          .psteps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

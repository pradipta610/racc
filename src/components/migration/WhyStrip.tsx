import { WHY_STRIP_ITEMS } from "@/lib/data";

export default function WhyStrip() {
  return (
    <div style={{ background: "var(--navy)", padding: "48px 5%" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
      }} className="why-strip-inner">
        {WHY_STRIP_ITEMS.map((item) => (
          <div key={item.title} style={{ textAlign: "center", padding: "0 12px" }}>
            <span style={{ fontSize: 28, marginBottom: 10, display: "block" }}>{item.icon}</span>
            <strong style={{ fontSize: 15, fontWeight: 600, color: "#fff", display: "block", marginBottom: 5 }}>
              {item.title}
            </strong>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.55 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) { .why-strip-inner { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px)  { .why-strip-inner { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px)  { .why-strip-inner { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

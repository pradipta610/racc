import { TRUST_ITEMS } from "@/lib/data";

export default function TrustBar() {
  return (
    <div style={{ background: "var(--navy)", padding: "18px 5%", marginTop: 56 }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex",
        alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
      }}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.title} style={{ display: "contents" }}>
            {i > 0 && (
              <div className="trust-div" style={{ width: 1, height: 32, background: "rgba(255,255,255,.15)" }} />
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--white)" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>{item.title}</strong>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{item.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .trust-div { display: none !important; }
        }
      `}</style>
    </div>
  );
}

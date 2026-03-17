import { TRUST_ITEMS } from "@/lib/data";

export default function TrustBar() {
  return (
    <div className="trust-bar" style={{
      background: "var(--navy)", padding: "20px 5%",
    }}>
      <div className="trust-inner" style={{
        maxWidth: 1200, margin: "0 auto", display: "flex",
        alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap",
      }}>
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="trust-item" style={{
            display: "flex", alignItems: "center", gap: 10, color: "var(--white)",
            background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
            borderRadius: 12, padding: "12px 18px",
            backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
          }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>{item.title}</strong>
              <span style={{ fontSize: 11, opacity: 0.5 }}>{item.sub}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .trust-bar {
            padding: 20px 4% !important;
            background: var(--white) !important;
            border-bottom: 1px solid var(--border);
          }
          .trust-inner {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 10px !important;
          }
          .trust-item {
            background: var(--light) !important;
            border: 1.5px solid var(--border) !important;
            border-radius: 14px !important;
            padding: 14px 14px !important;
            color: var(--navy) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .trust-item strong {
            font-size: 12px !important;
            color: var(--navy) !important;
          }
          .trust-item span[style] {
            opacity: 1 !important;
          }
          .trust-item > div > span { color: var(--tl) !important; }
        }
        @media (max-width: 380px) {
          .trust-inner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

import Link from "next/link";
import { REVIEWS } from "@/lib/data";

export default function Reviews() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Client Reviews</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>What Our Clients Say</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            4.8 out of 5 customer satisfaction — here&apos;s what some of our clients have to say.
          </p>
          <Link href="/client-reviews" style={{
            display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600,
            color: "var(--blue)", textDecoration: "none",
          }} className="rv-all-link">View all client reviews →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="rgrid">
          {REVIEWS.map((r) => (
            <div key={r.name} style={{
              background: "var(--white)", border: "1.5px solid var(--border)",
              borderRadius: 14, padding: 22,
            }}>
              <div style={{ color: "var(--yellow)", fontSize: 15, marginBottom: 10, letterSpacing: 2 }}>
                ★★★★★
              </div>
              <p style={{
                fontSize: 14, color: "var(--tm)", lineHeight: 1.7,
                marginBottom: 14, fontStyle: "italic",
              }}>
                &quot;{r.text}&quot;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "var(--navy)",
                  color: "var(--white)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {r.initials}
                </div>
                <div>
                  <strong style={{ fontSize: 13, color: "var(--td)", display: "block" }}>{r.name}</strong>
                  <span style={{ fontSize: 12, color: "var(--tl)" }}>{r.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .rv-all-link:hover { text-decoration: underline !important; }
        @media (max-width: 768px) {
          .rgrid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .rgrid > div { padding: 18px !important; }
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";
import { POPULAR_LINKS } from "@/lib/data";

export default function PopularLinks() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Quick Links</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>Popular Visa &amp; Occupation Pathways</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Find the right visa or course pathway for your occupation or situation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }} className="pgrid">
          {POPULAR_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="plink" style={{
              background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 9,
              padding: "12px 14px", textDecoration: "none", color: "var(--td)", fontSize: 13,
              fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "all .2s",
            }}>
              {l.label}
              <span style={{ opacity: 0.35, fontSize: 14 }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .plink:hover { border-color: var(--blue) !important; color: var(--blue) !important; background: var(--light) !important; }
        @media (max-width: 768px) { .pgrid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .pgrid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

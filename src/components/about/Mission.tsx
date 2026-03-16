import Link from "next/link";
import { ABOUT_VALUES, ABOUT_SERVICES_CARD } from "@/lib/data";

export default function Mission() {
  return (
    <section style={{ padding: "80px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="mission-inner">

        {/* Left */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 28, height: 2, background: "var(--yellow)", display: "inline-block" }} />
            Our Mission &amp; Values
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 34, lineHeight: 1.25, color: "var(--td)", marginBottom: 18 }}>
            Genuine Advice.<br /><em style={{ color: "var(--blue)", fontStyle: "italic" }}>Real Support.</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.8, marginBottom: 14 }}>
            RACC has been regarded as one of the best Education and Migration Agents by our clients. We believe that every person deserves access to clear, honest information — not confusing jargon or upselling.
          </p>
          <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.8, marginBottom: 28 }}>
            Our priority is to help and to see our clients&apos; smiles when they get to know that their school applications or visas have been approved. That moment is the most rewarding for us.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {ABOUT_VALUES.map((v) => (
              <div key={v.title} className="val-item" style={{
                display: "flex", alignItems: "flex-start", gap: 14, padding: 16,
                borderRadius: 12, border: "1.5px solid var(--border)", transition: "all .2s",
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {v.icon}
                </div>
                <div>
                  <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: "var(--td)", marginBottom: 3 }}>{v.title}</strong>
                  <span style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.55 }}>{v.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — services card */}
        <div>
          <div style={{ background: "linear-gradient(135deg,var(--navy),var(--blue))", borderRadius: 24, padding: 36, color: "#fff", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
            <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(245,197,24,.08)" }} />
            <h3 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 22, color: "#fff", marginBottom: 6, position: "relative", zIndex: 1 }}>What We Do</h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 24, position: "relative", zIndex: 1 }}>
              A full-service migration and education consultancy based in Melbourne CBD.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, position: "relative", zIndex: 1 }}>
              {ABOUT_SERVICES_CARD.map((s) => (
                <div key={s.title} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: "12px 14px" }}>
                  <strong style={{ display: "block", fontSize: 13, color: "#fff", marginBottom: 4 }}>{s.icon} {s.title}</strong>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 3 }}>
                    {s.items.map((item) => (
                      <li key={item} style={{ fontSize: 11, color: "rgba(255,255,255,.5)", display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ color: "var(--yellow)", fontSize: 10 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.1)", fontSize: 11, color: "rgba(255,255,255,.3)", position: "relative", zIndex: 1 }}>
              Registered Migration Agents · MARN 1572962 · 1172003 · 2518802
            </div>
          </div>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            <Link href="/migration-services" style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }} className="ms-lnk">
              View all migration services →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .val-item:hover { border-color: var(--sky) !important; background: var(--off) !important; }
        .ms-lnk:hover { text-decoration: underline !important; }
        @media (max-width: 1024px) { .mission-inner { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}

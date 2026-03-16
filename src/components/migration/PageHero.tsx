import Link from "next/link";
import { MIG_HERO_STATS } from "@/lib/data";

export default function PageHero() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #0F1E45 0%, #1C3A8A 60%, #2E6DB4 100%)",
      padding: "64px 5% 72px", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: -100, right: -100, width: 500, height: 500,
        borderRadius: "50%", background: "rgba(91,163,217,.08)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: "10%", width: 300, height: 300,
        borderRadius: "50%", background: "rgba(245,197,24,.05)", pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "grid",
        gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1,
      }} className="mig-hero-inner">

        {/* Left: text */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
            color: "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 600,
            padding: "5px 14px", borderRadius: 20, marginBottom: 16,
            letterSpacing: ".5px", textTransform: "uppercase",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
            Registered Migration Agents · MARN 1572962
          </div>

          <h1 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 42, lineHeight: 1.15, color: "#fff", marginBottom: 16,
          }}>
            Australian{" "}
            <em style={{ color: "var(--yellow)", fontStyle: "normal" }}>Migration Services</em>{" "}
            You Can Trust
          </h1>

          <p style={{
            fontSize: 16, color: "rgba(255,255,255,.7)", lineHeight: 1.75,
            marginBottom: 28, maxWidth: 500,
          }}>
            From skilled migration to family reunification — our registered migration agents guide you through every visa type with genuine, personalised advice.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="https://www.racc.net.au/migration-agent-education-agent" style={{
              background: "var(--yellow)", color: "var(--navy)", padding: "13px 26px",
              borderRadius: 9, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all .2s",
            }}>
              Book Free Consultation
            </Link>
            <Link href="#visa-categories" style={{
              background: "transparent", color: "#fff", padding: "13px 26px",
              borderRadius: 9, fontSize: 15, fontWeight: 500, textDecoration: "none",
              border: "2px solid rgba(255,255,255,.3)", transition: "all .2s",
            }}>
              Explore Visa Types
            </Link>
          </div>
        </div>

        {/* Right: stat pills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {MIG_HERO_STATS.map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 14, padding: "18px 20px",
            }}>
              <strong style={{ display: "block", fontSize: 26, fontWeight: 700, color: "var(--yellow)" }}>{s.val}</strong>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 2, display: "block" }}>{s.label}</span>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.75)", marginTop: 6, lineHeight: 1.5 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mig-hero-inner { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mig-hero-inner h1 { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .mig-hero-inner h1 { font-size: 24px !important; }
        }
      `}</style>
    </section>
  );
}

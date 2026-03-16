import Link from "next/link";
import { ABOUT_HERO_STATS, ABOUT_HERO_LANGS } from "@/lib/data";

export default function AboutHero() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#0B1A3D 0%,#1C3A8A 55%,#2E6DB4 100%)",
      padding: "80px 5% 90px",
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(91,163,217,.15) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 420px", gap: 64, alignItems: "center", position: "relative", zIndex: 1 }} className="about-hero-inner">

        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
            color: "rgba(255,255,255,.85)", fontSize: 11, fontWeight: 600,
            padding: "5px 14px", borderRadius: 20, marginBottom: 18, letterSpacing: ".8px", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
            Registered Migration Agents · MARN Certified
          </div>

          <h1 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 46, lineHeight: 1.15, color: "#fff", marginBottom: 18 }}>
            Helping You Build a<br />
            <em style={{ color: "var(--yellow)", fontStyle: "italic" }}>Life in Australia</em>
          </h1>

          <p style={{ fontSize: 15, color: "rgba(255,255,255,.72)", lineHeight: 1.8, marginBottom: 28, maxWidth: 480 }}>
            RACC specialises in Migration and Education services for clients from all over the world. Our friendly, multilingual team provides genuine advice — treating every client as a friend, not a number.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {ABOUT_HERO_LANGS.map((l) => (
              <span key={l} style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)", color: "rgba(255,255,255,.75)", fontSize: 12, padding: "4px 11px", borderRadius: 20 }}>{l}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="https://www.racc.net.au/bookings-checkout/pr-pathways-and-visa-options-1/book" style={{ background: "var(--yellow)", color: "var(--navy)", padding: "13px 26px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Book a Consultation
            </a>
            <Link href="/client-reviews" style={{ background: "transparent", color: "#fff", padding: "13px 26px", borderRadius: 9, fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1.5px solid rgba(255,255,255,.3)" }}>
              Read Client Reviews
            </Link>
          </div>
        </div>

        {/* Right — stat cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="about-hstats">
          {ABOUT_HERO_STATS.map((s) => (
            <div key={s.val} className="hstat" style={{
              background: "rgba(255,255,255,.08)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,.12)", borderRadius: 16,
              padding: "20px 24px", display: "flex", alignItems: "center", gap: 18,
              transition: "all .3s",
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "var(--yellow)" }}>{s.val}</strong>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hstat:hover { background: rgba(255,255,255,.12) !important; transform: translateX(-4px); }
        @media (max-width: 1024px) {
          .about-hero-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-hstats { flex-direction: row !important; flex-wrap: wrap !important; }
          .about-hstats .hstat { flex: 1 1 calc(50% - 8px) !important; }
        }
        @media (max-width: 768px) {
          .about-hero-inner { padding: 52px 0 60px !important; }
          .about-hero-inner h1 { font-size: 30px !important; }
        }
        @media (max-width: 480px) {
          .about-hero-inner h1 { font-size: 26px !important; }
          .about-hstats .hstat { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}

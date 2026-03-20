import Link from "next/link";

const CONSULTATION_URL = "https://www.racc.net.au/migration-agent-education-agent";

export default function Hero() {
  return (
    <section className="hero-section" style={{
      background: "url('https://static.wixstatic.com/media/a50ebd_18319192d4884e8fac74b4cacf59c3f8~mv2.jpg') center 30% / cover no-repeat",
      overflow: "hidden", position: "relative",
    }}>

      {/* Overlay */}
      <div className="hero-bg-overlay" style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(90deg, rgba(11,31,74,.88) 0%, rgba(11,31,74,.72) 50%, rgba(11,31,74,.55) 100%)",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "50px 0px 5%",
        display: "grid", gridTemplateColumns: "2fr 1fr", gap: 60, alignItems: "center",
        position: "relative", zIndex: 2,
      }} className="hero-wrap">

        {/* Text */}
        <div>
          <div className="hero-badge" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.9)", fontSize: 10, fontWeight: 600,
            padding: "5px 14px", borderRadius: 20, marginBottom: 18, letterSpacing: ".5px",
            textTransform: "uppercase", border: "1px solid rgba(255,255,255,.15)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
            Registered Migration Agent · MARN 1572962 · MARN 1172003 · MARN 2518802
          </div>

          <h1 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 46, lineHeight: 1.15, color: "#fff", marginBottom: 18,
          }}>
            20 Years of Experience in Helping Apply <em style={{ color: "var(--yellow)", fontStyle: "normal" }}>Courses and Visas</em> in Australia
          </h1>

          <p className="hero-desc" style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.75, marginBottom: 6 }}>
            Genuine Advice You Can Trust
          </p>

          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 12 }}>
            <strong style={{ color: "var(--yellow)", fontWeight: 700 }}>4.8 out of 5</strong> Customer Service Satisfaction
          </p>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 28 }}>
            <strong style={{ color: "rgba(255,255,255,.85)", fontWeight: 700 }}>WE SPEAK :</strong><br />
            English, Bahasa, Mandarin, Cantonese,<br />
            Tagalog, Thai, Nepali, Malay, Sinhalese, Vietnamese, Hindi &amp; Punjabi.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 36, flexWrap: "wrap" }} className="hero-btns">
            <Link href={CONSULTATION_URL} style={{
              background: "var(--yellow)", color: "var(--navy)", padding: "13px 26px",
              borderRadius: 9, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all .2s",
            }}>
              Book Free Consultation
            </Link>
            <Link href="#services" className="hero-svc-link" style={{
              color: "rgba(255,255,255,.85)", fontSize: 15, fontWeight: 500,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 5,
            }}>
              Our Services →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }} className="hero-stats">
            {[
              { val: "20+", label: "Years Experience" },
              { val: "4.8★", label: "Client Satisfaction" },
              { val: "12+", label: "Languages Spoken" },
              { val: "600+", label: "Google Reviews" },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                paddingRight: i < arr.length - 1 ? 24 : 0,
                borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,.15)" : "none",
              }}>
                <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "#fff" }}>{s.val}</strong>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Float Cards — glassmorphic */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "24px 0 36px" }} className="hero-visual">
          {[
            { cls: "animate-float-up",   icon: "🎓", title: "Student Visa (Subclass 500)",           sub: "Course applications & full lodgement support" },
            { cls: "animate-float-up-2", icon: "🌟", title: "Skilled Migration 189 / 190 / 491",    sub: "Points-tested pathway to permanent residency", ml: 36 },
            { cls: "animate-float-up-3", icon: "📋", title: "Temporary Graduate Visa 485",          sub: "Post-study work rights for graduates in Australia" },
            { cls: "animate-float-up-4", icon: "🏢", title: "Skills in Demand Visa 482",            sub: "Employer-sponsored work visa — all streams", ml: 36 },
          ].map((c) => (
            <div key={c.title} className={c.cls} style={{
              background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 14,
              padding: "14px 18px", boxShadow: "0 8px 32px rgba(0,0,0,.15)",
              display: "flex", alignItems: "center", gap: 14, maxWidth: 310,
              marginLeft: c.ml ?? 0,
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: "rgba(255,255,255,.12)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
              }}>
                {c.icon}
              </div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600, color: "#fff", display: "block" }}>{c.title}</strong>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,.55)", margin: 0 }}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section {
            min-height: calc(100vh - 68px);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .hero-bg-overlay {
            background: linear-gradient(180deg, rgba(11,31,74,.78) 0%, rgba(11,31,74,.88) 100%) !important;
          }
          .hero-wrap {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            padding: 40px 6% 36px !important;
            text-align: center;
            flex: 1;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
          }
          .hero-wrap h1 { font-size: 28px !important; }
          .hero-visual { display: none !important; }
          .hero-btns {
            justify-content: center !important;
            gap: 10px !important;
          }
          .hero-btns a {
            font-size: 14px !important;
            padding: 12px 20px !important;
          }
          .hero-stats {
            justify-content: center !important;
            gap: 16px !important;
            padding-bottom: 8px;
          }
          .hero-stats > div { text-align: center; }
        }
        @media (max-width: 480px) {
          .hero-wrap h1 { font-size: 24px !important; }
          .hero-wrap { padding: 28px 5% 24px !important; }
          .hero-stats > div {
            padding-right: 0 !important;
            border-right: none !important;
          }
          .hero-btns {
            flex-direction: column !important;
            width: 100%;
          }
          .hero-btns a {
            width: 100% !important;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";

const CONSULTATION_URL = "https://www.racc.net.au/migration-agent-education-agent";

export default function Hero() {
  return (
    <section style={{ background: "var(--white)", overflow: "hidden" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "72px 5% 0",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
      }} className="hero-wrap">

        {/* Text */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--light)", color: "var(--blue)", fontSize: 12, fontWeight: 600,
            padding: "5px 14px", borderRadius: 20, marginBottom: 18, letterSpacing: ".5px",
            textTransform: "uppercase", border: "1px solid var(--border)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
            Registered Migration Agent · MARN 1572962
          </div>

          <h1 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 46, lineHeight: 1.15, color: "var(--td)", marginBottom: 18,
          }}>
            Your Journey to <em style={{ color: "var(--blue)", fontStyle: "normal" }}>Australia</em> Starts Here
          </h1>

          <p style={{ fontSize: 16, color: "var(--tm)", lineHeight: 1.75, marginBottom: 28 }}>
            Trusted migration and education consultancy with 20+ years of experience. We speak your language — English, Bahasa, Tagalog, Hindi, Mandarin &amp; more.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 36, flexWrap: "wrap" }}>
            <Link href={CONSULTATION_URL} style={{
              background: "var(--yellow)", color: "var(--navy)", padding: "13px 26px",
              borderRadius: 9, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all .2s",
            }}>
              Book Free Consultation
            </Link>
            <Link href="#services" style={{
              color: "var(--navy)", fontSize: 15, fontWeight: 500,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 5,
            }}>
              Our Services →
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { val: "20+", label: "Years Experience" },
              { val: "4.8★", label: "Client Satisfaction" },
              { val: "12+", label: "Languages Spoken" },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                paddingRight: i < arr.length - 1 ? 24 : 0,
                borderRight: i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <strong style={{ display: "block", fontSize: 24, fontWeight: 700, color: "var(--navy)" }}>{s.val}</strong>
                <span style={{ fontSize: 12, color: "var(--tl)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Float Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "40px 0 60px" }} className="hero-visual">
          {[
            { cls: "animate-float-up",   bg: "#EBF3FF", icon: "🎓", title: "Student Visa Approved",        sub: "University of Melbourne · 2 days ago" },
            { cls: "animate-float-up-2", bg: "#FFF8DC", icon: "✈️", title: "PR Visa Granted",              sub: "Skilled Independent 189 · 1 week ago",  ml: 36 },
            { cls: "animate-float-up-3", bg: "#E8F5F0", icon: "✅", title: "Employer Sponsored Approved",  sub: "Skills in Demand 482 · 3 days ago" },
          ].map((c) => (
            <div key={c.title} className={c.cls} style={{
              background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14,
              padding: "14px 18px", boxShadow: "0 6px 24px rgba(28,58,138,.08)",
              display: "flex", alignItems: "center", gap: 14, maxWidth: 310,
              marginLeft: c.ml ?? 0,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10, background: c.bg,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
              }}>
                {c.icon}
              </div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600, color: "var(--td)", display: "block" }}>{c.title}</strong>
                <p style={{ fontSize: 12, color: "var(--tl)", margin: 0 }}>{c.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-wrap { grid-template-columns: 1fr !important; gap: 0 !important; padding: 40px 4% 0 !important; text-align: center; }
          .hero-wrap h1 { font-size: 30px !important; }
          .hero-visual { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-wrap h1 { font-size: 26px !important; }
        }
      `}</style>
    </section>
  );
}

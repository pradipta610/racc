import Link from "next/link";
import Image from "next/image";

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

        {/* Hero Image */}
        <div style={{ position: "relative", padding: "40px 0 60px" }} className="hero-visual">
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgba(28,58,138,.12)" }}>
            <Image
              src="https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=800&q=80"
              alt="Melbourne city skyline — RACC Australia migration and education consultancy"
              width={560}
              height={400}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              priority
            />
          </div>
          {/* Overlay float cards */}
          <div style={{
            position: "absolute", bottom: 40, left: -20,
            background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12,
            padding: "10px 14px", boxShadow: "0 6px 24px rgba(28,58,138,.1)",
            display: "flex", alignItems: "center", gap: 10, zIndex: 2,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#EBF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🎓</div>
            <div>
              <strong style={{ fontSize: 12, fontWeight: 600, color: "var(--td)", display: "block" }}>Student Visa Approved</strong>
              <span style={{ fontSize: 11, color: "var(--tl)" }}>University of Melbourne · 2 days ago</span>
            </div>
          </div>
          <div style={{
            position: "absolute", top: 60, right: -10,
            background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12,
            padding: "10px 14px", boxShadow: "0 6px 24px rgba(28,58,138,.1)",
            display: "flex", alignItems: "center", gap: 10, zIndex: 2,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "#FFF8DC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>✈️</div>
            <div>
              <strong style={{ fontSize: 12, fontWeight: 600, color: "var(--td)", display: "block" }}>PR Visa Granted</strong>
              <span style={{ fontSize: 11, color: "var(--tl)" }}>Skilled Independent 189 · 1 week ago</span>
            </div>
          </div>
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

import Image from "next/image";
import LOGO from "@/lib/logo";

export default function BrandComponents() {
  return (
    <div id="components" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>05 — Components</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>UI Components</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        All UI components follow the brand&apos;s 60-30-10 rule and use the defined border-radius, spacing, and colour tokens. Never create ad-hoc styles outside this system.
      </p>

      {/* Buttons */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Buttons</p>
      <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 12 }}>
          <button style={{ background: "var(--yellow)", color: "var(--navy)", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "default" }}>Book Free Consultation</button>
          <button style={{ background: "var(--navy)", color: "#fff", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "none", cursor: "default" }}>Learn More</button>
          <button style={{ background: "transparent", color: "var(--navy)", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, border: "1.5px solid var(--border)", cursor: "default" }}>View All Services</button>
        </div>
        <div style={{ background: "var(--navy)", padding: 16, borderRadius: 10, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start", marginBottom: 16 }}>
          <button style={{ background: "#eddb3c", color: "var(--navy)", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "default" }}>Book Consultation</button>
          <button style={{ background: "transparent", color: "#fff", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, border: "1.5px solid rgba(255,255,255,.3)", cursor: "default" }}>💬 WhatsApp Us</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, color: "var(--tm)" }}>🟨 <strong>Primary CTA</strong> — Yellow (#F5C518) fill, Navy text, 700 weight. Used for the single most important action per section.</div>
          <div style={{ fontSize: 12, color: "var(--tm)" }}>🟦 <strong>Secondary</strong> — Navy fill, White text. Used for second-priority actions.</div>
          <div style={{ fontSize: 12, color: "var(--tm)" }}>⬜ <strong>Ghost/Outline</strong> — Transparent, border. Used on light backgrounds for tertiary actions.</div>
          <div style={{ fontSize: 12, color: "var(--tm)" }}>🔲 <strong>Ghost Dark</strong> — Transparent, white border. Used on dark/navy backgrounds only.</div>
        </div>
      </div>

      {/* Tags */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Category Tags &amp; Badges</p>
      <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 28 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".5px", background: "rgba(28,58,138,.85)", color: "#fff" }}>Migration</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".5px", background: "rgba(46,109,180,.85)", color: "#fff" }}>Education</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".5px", background: "rgba(27,119,70,.85)", color: "#fff" }}>Visa Update</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 5, textTransform: "uppercase", letterSpacing: ".5px", background: "rgba(212,168,0,.9)", color: "var(--navy)" }}>Event</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--tm)" }}>Tags use 85% opacity dark backgrounds for readability. Font: DM Sans 700, 10–11px, UPPERCASE, letter-spacing 0.5px. Padding: 3–4px vertical, 8–10px horizontal. Border-radius: 5–6px.</div>
      </div>

      {/* Navbar */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Navbar</p>
      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "0 24px", marginBottom: 28, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", height: 64, gap: 20 }}>
          <Image src={LOGO} alt="RACC" width={32} height={32} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>RACC Australia</span>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--tm)", padding: "5px 12px", borderRadius: 6 }}>About Us</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--tm)", padding: "5px 12px", borderRadius: 6 }}>Education ▾</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--tm)", padding: "5px 12px", borderRadius: 6 }}>Migration ▾</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", padding: "5px 12px", borderRadius: 6, background: "var(--light)" }}>News &amp; Events</span>
          </div>
          <div style={{ background: "var(--yellow)", color: "var(--navy)", fontSize: 13, fontWeight: 700, padding: "9px 18px", borderRadius: 8 }}>Book Free Consultation</div>
        </div>
      </div>

      {/* Review card */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Review Card</p>
      <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 28, display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 22, maxWidth: 320 }}>
          <div style={{ color: "var(--yellow)", fontSize: 14, letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
          <p style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.7, marginBottom: 12, fontStyle: "italic" }}>
            &ldquo;One of the best Migration &amp; Education agencies here in Melbourne. Fast, professional, and genuinely helpful.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>RO</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Richard Ongosari</div>
              <div style={{ fontSize: 11, color: "var(--tl)" }}>from Indonesia 🇮🇩</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: "var(--tm)", maxWidth: 320, alignSelf: "center", lineHeight: 1.7 }}>
          <strong style={{ display: "block", marginBottom: 8 }}>Review Card Specs:</strong>
          Background: White · Border: 1.5px #DDE4F0 · Radius: 16px<br />
          Padding: 24px · Stars: #F5C518 · Quote mark: Large decorative &ldquo;<br />
          Avatar: 42px circle, Navy bg, White initials<br />
          Hover: translateY(-2px) + shadow + border-color var(--sky)
        </div>
      </div>

      {/* Contact pills */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Contact Pills (Footer)</p>
      <div style={{ background: "#0B1F4A", borderRadius: 14, padding: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "10px 16px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(91,163,217,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>📍</div>
          <div><strong style={{ fontSize: 12, color: "#fff", display: "block" }}>343 Little Collins St, Level 7</strong><span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Melbourne VIC 3000</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: "10px 16px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(245,197,24,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>✉️</div>
          <div><strong style={{ fontSize: 12, color: "#fff", display: "block" }}>info@racc.net.au</strong><span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Email us anytime</span></div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import LOGO from "@/lib/logo";

export default function BrandLogo() {
  return (
    <div id="logo" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>03 — Logo Usage</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Logo Guidelines</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        The RACC logo is always used with sufficient clear space and on approved backgrounds only. Never alter, recolour, rotate, stretch, or add effects to the logo.
      </p>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Approved Backgrounds</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }} className="logo-grid">
        <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Image src={LOGO} alt="RACC Australia" width={56} height={56} style={{ objectFit: "contain" }} />
          <p style={{ fontSize: 12, textAlign: "center", color: "var(--tl)" }}>✅ White background<br /><code style={{ fontSize: 11 }}>#FFFFFF</code></p>
        </div>
        <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Image src={LOGO} alt="RACC Australia" width={56} height={56} style={{ objectFit: "contain" }} />
          <p style={{ fontSize: 12, textAlign: "center", color: "var(--tl)" }}>✅ Off-white / Light background<br /><code style={{ fontSize: 11 }}>#F8F9FC</code></p>
        </div>
        <div style={{ background: "var(--navy)", borderRadius: 14, padding: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <Image src={LOGO} alt="RACC Australia" width={56} height={56} style={{ objectFit: "contain" }} />
          <p style={{ fontSize: 12, textAlign: "center", color: "rgba(255,255,255,.5)" }}>✅ Deep Navy background<br /><code style={{ fontSize: 11 }}>#1C3A8A</code></p>
        </div>
      </div>

      {/* Clear space */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Clear Space Rule</p>
      <div style={{ background: "var(--white)", border: "1.5px dashed var(--border)", borderRadius: 14, padding: 48, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1 }}>↕ Minimum 1× logo height</span>
        <span style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", fontSize: 10, fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1 }}>↕ Minimum 1× logo height</span>
        <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: 10, fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1 }}>↔ 1×</span>
        <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: 10, fontWeight: 600, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1 }}>↔ 1×</span>
        <Image src={LOGO} alt="RACC Australia" width={56} height={56} style={{ objectFit: "contain" }} />
      </div>
      <p style={{ fontSize: 13, color: "var(--tl)", marginBottom: 28 }}>The minimum clear space on all sides is equal to the height of the logomark. No other elements, text, or images should appear within this space.</p>

      {/* Minimum sizes */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Minimum Sizes</p>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 28 }}>
        {[{ w: 28, label: "28px\nMinimum" }, { w: 36, label: "36px\nMobile nav" }, { w: 48, label: "48px\nStandard" }, { w: 56, label: "56px\nHero/Footer" }].map((s) => (
          <div key={s.w} style={{ textAlign: "center" }}>
            <Image src={LOGO} alt="" width={s.w} height={s.w} style={{ objectFit: "contain", display: "block", margin: "0 auto 8px" }} />
            <span style={{ fontSize: 11, color: "var(--tl)", whiteSpace: "pre-line" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Never do */}
      <div style={{ background: "#FFF5F5", border: "1.5px solid #FFCCCC", borderRadius: 14, padding: "20px 24px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#8B1A1A", marginBottom: 10 }}>🚫 Never do this with the logo:</p>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Do not recolour or apply colour overlays",
            "Do not stretch or distort proportions",
            "Do not add drop shadows, glows, or outlines",
            "Do not place on busy or low-contrast backgrounds",
            "Do not rotate or flip",
            "Do not use below 28px height",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13, color: "#8B1A1A" }}>✗ {t}</li>
          ))}
        </ul>
      </div>

      <style>{`@media(max-width:900px){.logo-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:600px){.logo-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

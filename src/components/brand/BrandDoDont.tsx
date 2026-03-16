const DO_ITEMS = [
  "Use Playfair Display for all headings and display text",
  "Use DM Sans for all body copy, UI, and labels",
  "Apply the 60-30-10 colour rule on every layout",
  "Reserve yellow (#F5C518) for CTAs and key highlights only",
  "Maintain 1× logo height as minimum clear space",
  "Use border-radius 14px for cards, 8px for buttons",
  "Use 8-point spacing increments (8, 16, 24, 32, 48, 64px)",
  "Write in warm, plain Australian English",
  "Always show MARN numbers in footer and legal contexts",
  "Use approved gradient combinations only",
  "Ensure all hover states include a visual response",
  "Test all pages for mobile responsiveness",
];

const DONT_ITEMS = [
  "Use Inter, Roboto, Arial, or system-ui as typefaces",
  "Use purple gradients or generic \"AI\" colour schemes",
  "Place yellow on navy without checking contrast",
  "Alter, stretch, rotate, or recolour the RACC logo",
  "Use random border-radius values outside the scale",
  "Use spacing values that aren't multiples of 8",
  "Add drop shadows heavier than 0 10px 32px rgba",
  "Use more than 2 typefaces on any single page",
  "Make visa outcome guarantees in any copy",
  "Use overly formal or legal-sounding language in UX copy",
  "Create new colour values outside the approved palette",
  "Place the logo below 28px height on any medium",
];

export default function BrandDoDont() {
  return (
    <div id="dont" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>09 — Do &amp; Don&apos;t</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Brand Rules Summary</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        A quick-reference checklist for anyone creating RACC branded content — whether that&apos;s a web page, social post, presentation, or printed material.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }} className="do-dont-grid2">
        {/* Do */}
        <div style={{ borderRadius: 14, overflow: "hidden" }}>
          <div style={{ background: "#1a6b3a", color: "#fff", padding: "12px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>✓ Always Do This</div>
          <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {DO_ITEMS.map((t) => (
                <li key={t} style={{ fontSize: 13, color: "var(--tm)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#1a6b3a", fontWeight: 700, flexShrink: 0 }}>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Don't */}
        <div style={{ borderRadius: 14, overflow: "hidden" }}>
          <div style={{ background: "#8B1A1A", color: "#fff", padding: "12px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>✗ Never Do This</div>
          <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {DONT_ITEMS.map((t) => (
                <li key={t} style={{ fontSize: 13, color: "var(--tm)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#8B1A1A", fontWeight: 700, flexShrink: 0 }}>✗</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CSS Variables reference */}
      <div style={{ background: "#0B1A3D", borderRadius: 14, padding: "24px 28px" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--yellow)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Quick CSS Variables Reference</p>
        <pre style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,.7)", lineHeight: 1.8, overflowX: "auto" }}>{`:root {
  --navy:   #1C3A8A;   /* Primary / 30% */
  --blue:   #2E6DB4;   /* Brand Blue */
  --sky:    #5BA3D9;   /* Sky Blue / Hover borders */
  --yellow: #F5C518;   /* CTA Accent / 10% */
  --gold:   #D4A800;   /* Yellow Hover */
  --white:  #ffffff;   /* 60% background */
  --off:    #F8F9FC;   /* Alt background */
  --light:  #EEF2F8;   /* Subtle fills */
  --td:     #0F1E45;   /* Text Dark */
  --tm:     #3D4E6B;   /* Text Mid */
  --tl:     #6B7A99;   /* Text Light */
  --border: #DDE4F0;   /* Borders */
}`}</pre>
      </div>

      <style>{`@media(max-width:900px){.do-dont-grid2{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

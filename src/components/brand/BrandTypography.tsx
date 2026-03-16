export default function BrandTypography() {
  return (
    <div id="typography" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--off)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>02 — Typography</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Type System</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        RACC uses a two-font system: <strong>Playfair Display</strong> for all editorial headings (trust, authority, warmth) and <strong>DM Sans</strong> for all UI copy (clarity, readability, approachability). Both are loaded from Google Fonts.
      </p>

      {/* Font pair cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }} className="type-pair-grid">
        <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Display Font</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, color: "var(--td)", lineHeight: 1.2, marginBottom: 12 }}>Playfair Display</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--tm)", fontStyle: "italic", marginBottom: 16 }}>&ldquo;Helping you build a life in Australia.&rdquo;</p>
          <code style={{ fontSize: 12, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>Google Fonts · Weights: 600, 700</code>
          <code style={{ fontSize: 12, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>Use: H1, H2, H3, pull quotes</code>
        </div>
        <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 28 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Body Font</p>
          <p style={{ fontSize: 36, color: "var(--td)", marginBottom: 12 }}>DM Sans</p>
          <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.7, marginBottom: 16 }}>Clear, legible, and friendly. Perfect for navigation, body copy, labels, and all UI elements.</p>
          <code style={{ fontSize: 12, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>Google Fonts · Weights: 300, 400, 500, 600</code>
        </div>
      </div>

      {/* Type scale */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Type Scale</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {[
          { sample: "Heading XL",      style: { fontFamily: "'Playfair Display',serif", fontSize: 56, lineHeight: 1.1, color: "var(--td)" } as React.CSSProperties,  meta: "H1 / Hero",        sub: ["Playfair Display 700", "56–80px · Line-height 1.1"] },
          { sample: "Heading Large",   style: { fontFamily: "'Playfair Display',serif", fontSize: 36, lineHeight: 1.2, color: "var(--td)" } as React.CSSProperties,  meta: "H2 / Section",     sub: ["Playfair Display 700", "32–40px · Line-height 1.2"] },
          { sample: "Heading Medium",  style: { fontFamily: "'Playfair Display',serif", fontSize: 24, lineHeight: 1.3, color: "var(--td)" } as React.CSSProperties,  meta: "H3 / Card Title",  sub: ["Playfair Display 600", "20–26px · Line-height 1.3"] },
          { sample: "Body text — clear, readable, friendly. RACC communicates in plain English so that every client understands their options without confusion.", style: { fontSize: 16, lineHeight: 1.75, color: "var(--tm)" } as React.CSSProperties, meta: "Body", sub: ["DM Sans 400", "15–16px · Line-height 1.75"] },
          { sample: "UI copy, nav links, card descriptions, button labels, form labels.", style: { fontSize: 14, fontWeight: 500, lineHeight: 1.6, color: "var(--tm)" } as React.CSSProperties, meta: "UI / Small Body", sub: ["DM Sans 500", "13–14px · Line-height 1.6"] },
          { sample: "Section Label / Eyebrow", style: { fontSize: 11, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" as const, color: "var(--blue)" }, meta: "Label / Tag", sub: ["DM Sans 700", "10–12px · UPPERCASE · Letter-spacing 1–2px"] },
        ].map((row) => (
          <div key={row.meta} style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "28px 32px", display: "grid", gridTemplateColumns: "1fr 200px", gap: 24, alignItems: "center" }} className="type-row">
            <div style={row.style}>{row.sample}</div>
            <div style={{ textAlign: "right" }}>
              <strong style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--td)" }}>{row.meta}</strong>
              {row.sub.map((s) => <span key={s} style={{ display: "block", fontSize: 11, color: "var(--tl)", marginTop: 3, fontFamily: "monospace" }}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:900px){.type-pair-grid{grid-template-columns:1fr!important;}.type-row{grid-template-columns:1fr!important;} .type-row>div:last-child{text-align:left!important;}}`}</style>
    </div>
  );
}

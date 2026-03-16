export default function BrandSpacing() {
  const spaces = [
    { w: 8,   label: "4px",   desc: "0.5×", note: "Micro gap (icon padding)" },
    { w: 16,  label: "8px",   desc: "1×",   note: "Tight (tag padding, small gaps)" },
    { w: 32,  label: "16px",  desc: "2×",   note: "Compact (card internal padding)" },
    { w: 48,  label: "24px",  desc: "3×",   note: "Standard (between elements)" },
    { w: 64,  label: "32px",  desc: "4×",   note: "Medium (section internal)" },
    { w: 96,  label: "48px",  desc: "6×",   note: "Large (between sections, mobile padding)" },
    { w: 128, label: "64px",  desc: "8×",   note: "XL (hero/section desktop padding)" },
    { w: 192, label: "72–80px",desc: "9–10×",note: "Section padding (desktop)" },
  ];

  const radii = [
    { r: 6,    label: "6px",   note: "Tags, badges" },
    { r: 8,    label: "8px",   note: "Buttons" },
    { r: 10,   label: "10px",  note: "Pills, inputs" },
    { r: 14,   label: "14px",  note: "Cards" },
    { r: 16,   label: "16px",  note: "Large cards" },
    { r: 24,   label: "24px",  note: "Feature cards" },
    { r: 9999, label: "50%",   note: "Avatars, icons" },
  ];

  return (
    <div id="spacing" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--off)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>04 — Spacing &amp; Grid</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Spacing Scale &amp; Layout</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        RACC uses an 8-point spacing system. All margins, paddings, and gaps should be multiples of 8px. Page content is capped at 1200px max-width and uses 5% horizontal padding on sections.
      </p>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Spacing Scale (8pt Base)</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {spaces.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ background: "var(--navy)", borderRadius: 4, height: 24, width: s.w, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "var(--tm)" }}>{s.label} — <code style={{ fontFamily: "monospace", fontSize: 12, color: "var(--blue)" }}>{s.desc}</code> {s.note}</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>Grid System</p>
      <div style={{ background: "var(--white)", borderRadius: 14, padding: 24, overflow: "hidden", marginBottom: 28 }}>
        <p style={{ fontSize: 12, color: "var(--tl)", marginBottom: 10 }}>12-column base · Gap: 20–24px · Max-width: 1200px</p>
        {[
          { cols: "1fr", items: [{ span: 12, label: "12 col — Full width hero, trust strips, CTAs" }] },
          { cols: "1fr 1fr", items: [{ span: 1, label: "6 col" }, { span: 1, label: "6 col — Two-column layouts (mission, hero, consult cards)" }] },
          { cols: "1fr 1fr 1fr", items: [{ span: 1, label: "4 col" }, { span: 1, label: "4 col" }, { span: 1, label: "4 col — Three-column (footer links, career cards, visa types)" }] },
          { cols: "repeat(4,1fr)", items: [{ span: 1, label: "3" }, { span: 1, label: "3" }, { span: 1, label: "3" }, { span: 1, label: "3 — Four-col (stat bars, language grid, process steps)" }] },
        ].map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: row.cols, gap: 12, marginBottom: 12 }}>
            {row.items.map((item, j) => (
              <div key={j} style={{ background: "var(--navy)", color: "var(--white)", borderRadius: 8, padding: "12px 8px", textAlign: "center", fontSize: 12, fontWeight: 600 }}>{item.label}</div>
            ))}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Responsive Breakpoints</p>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--white)", borderRadius: 14, overflow: "hidden", marginBottom: 28 }}>
        <thead>
          <tr>
            {["Breakpoint", "Width", "Columns", "Notes"].map((h) => (
              <th key={h} style={{ background: "var(--navy)", color: "var(--white)", fontSize: 12, fontWeight: 600, padding: "12px 16px", textAlign: "left" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["Desktop",      "> 1024px",   "2–4 cols", "Full layout, sidebar visible, max-width 1200px"],
            ["Tablet",       "769–1024px", "1–2 cols", "Most 2-col layouts stack; sidebar may hide"],
            ["Mobile",       "481–768px",  "1 col",    "Single column, full-width cards, 4% padding"],
            ["Small Mobile", "≤ 480px",    "1 col",    "Reduced font sizes, compact hero"],
          ].map(([bp, w, c, n], i) => (
            <tr key={bp}>
              {[bp, w, c, n].map((v, j) => (
                <td key={j} style={{ padding: "11px 16px", fontSize: 13, color: "var(--tm)", borderBottom: "1px solid var(--border)", background: i % 2 === 1 ? "var(--off)" : undefined }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Border Radius Scale</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
        {radii.map((r) => (
          <div key={r.label} style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, background: "var(--navy)", borderRadius: r.r, margin: "0 auto 8px" }} />
            <span style={{ fontSize: 12, color: "var(--tl)", whiteSpace: "pre-line" }}>{r.label}{"\n"}{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

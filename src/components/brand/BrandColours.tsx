export default function BrandColours() {
  return (
    <div className="section white" id="colours" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>01 — Colour Palette</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Brand Colours</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        RACC&apos;s palette is built on a Deep Navy core with blue mid-tones and a single warm yellow accent. Use the 60-30-10 rule at all times: 60% white/off-white backgrounds, 30% navy/blue accents, 10% yellow for primary CTAs and highlights only.
      </p>

      {/* Primary */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Primary Colours</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 32 }} className="color-grid">
        {[
          { bg: "#1C3A8A", role: "Primary",      roleCls: "role-primary", name: "Deep Navy",    hex: "#1C3A8A", rgb: "RGB 28, 58, 138" },
          { bg: "#2E6DB4", role: "Primary",      roleCls: "role-primary", name: "Brand Blue",   hex: "#2E6DB4", rgb: "RGB 46, 109, 180" },
          { bg: "#5BA3D9", role: "Support",      roleCls: "role-support", name: "Sky Blue",     hex: "#5BA3D9", rgb: "RGB 91, 163, 217" },
          { bg: "#F5C518", role: "Accent",       roleCls: "role-accent",  name: "Brand Yellow", hex: "#F5C518", rgb: "RGB 245, 197, 24" },
          { bg: "#D4A800", role: "Accent Dark",  roleCls: "role-accent",  name: "Amber Gold",   hex: "#D4A800", rgb: "RGB 212, 168, 0" },
        ].map((s) => (
          <div key={s.hex} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.1)" }}>
            <div style={{ height: 100, background: s.bg, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,.12))" }} />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, padding: "2px 8px", borderRadius: 4, display: "inline-block", background: s.roleCls === "role-primary" ? "#EEF2F8" : s.roleCls === "role-accent" ? "#FFFAE6" : "#F0F8FF", color: s.roleCls === "role-primary" ? "var(--blue)" : s.roleCls === "role-accent" ? "#8A6000" : "var(--sky)" }}>{s.role}</span>
              <strong style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--td)", marginBottom: 2 }}>{s.name}</strong>
              <code style={{ fontSize: 11, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>{s.hex}</code>
              <code style={{ fontSize: 11, color: "var(--tl)", fontFamily: "monospace", display: "block", marginTop: 2 }}>{s.rgb}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Neutrals */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Neutrals &amp; Backgrounds</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 32 }} className="color-grid">
        {[
          { bg: "#ffffff", border: true, role: "Background", name: "White",         hex: "#FFFFFF" },
          { bg: "#F8F9FC", role: "Background", name: "Off-White",      hex: "#F8F9FC" },
          { bg: "#EEF2F8", role: "Light",      name: "Light Blue-Grey",hex: "#EEF2F8" },
          { bg: "#DDE4F0", role: "Border",     name: "Border",         hex: "#DDE4F0" },
          { bg: "#0B1F4A", role: "Dark",       name: "Footer Navy",    hex: "#0B1F4A" },
        ].map((s) => (
          <div key={s.hex} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.1)" }}>
            <div style={{ height: 100, background: s.bg, border: s.border ? "1px solid #DDE4F0" : undefined, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,.12))" }} />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, padding: "2px 8px", borderRadius: 4, display: "inline-block", background: "#F5F5F5", color: "#555" }}>{s.role}</span>
              <strong style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--td)", marginBottom: 2 }}>{s.name}</strong>
              <code style={{ fontSize: 11, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>{s.hex}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Text colours */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Text Colours</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, marginBottom: 36 }} className="color-grid">
        {[
          { bg: "#0F1E45", name: "Text Dark",  hex: "#0F1E45", sub: "Headings, primary body" },
          { bg: "#3D4E6B", name: "Text Mid",   hex: "#3D4E6B", sub: "Body copy, labels" },
          { bg: "#6B7A99", name: "Text Light", hex: "#6B7A99", sub: "Captions, metadata" },
        ].map((s) => (
          <div key={s.hex} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,.1)" }}>
            <div style={{ height: 100, background: s.bg, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,.12))" }} />
            </div>
            <div style={{ padding: "14px 16px", background: "var(--white)", borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: 6, padding: "2px 8px", borderRadius: 4, display: "inline-block", background: "#F0F2F8", color: "var(--td)" }}>Text</span>
              <strong style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--td)", marginBottom: 2 }}>{s.name}</strong>
              <code style={{ fontSize: 11, color: "var(--tl)", fontFamily: "monospace", display: "block" }}>{s.hex}</code>
              <code style={{ fontSize: 11, color: "var(--tl)", fontFamily: "monospace", display: "block", marginTop: 2 }}>{s.sub}</code>
            </div>
          </div>
        ))}
      </div>

      {/* 60-30-10 rule */}
      <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24, marginBottom: 28 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--td)", marginBottom: 16 }}>60 – 30 – 10 Colour Rule</p>
        <div style={{ display: "flex", height: 40, borderRadius: 10, overflow: "hidden", marginBottom: 12 }}>
          <div style={{ width: "60%", background: "#fff", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--tl)" }}>60%</div>
          <div style={{ width: "30%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.7)" }}>30%</div>
          <div style={{ width: "10%", background: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--navy)" }}>10%</div>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ fontSize: 13, color: "var(--tm)" }}>⬜ <strong>60%</strong> — White/Off-white backgrounds</div>
          <div style={{ fontSize: 13, color: "var(--tm)" }}>🟦 <strong>30%</strong> — Navy &amp; Blue accents, headers, cards</div>
          <div style={{ fontSize: 13, color: "var(--tm)" }}>🟨 <strong>10%</strong> — Yellow CTAs, highlights only</div>
        </div>
      </div>

      {/* Gradients */}
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--tl)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Approved Gradients</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="color-grid">
        {[
          { grad: "linear-gradient(135deg,#0B1A3D 0%,#1C3A8A 55%,#2E6DB4 100%)", title: "Hero / Dark Gradient",   code: "135deg · #0B1A3D → #1C3A8A → #2E6DB4" },
          { grad: "linear-gradient(135deg,#1C3A8A,#2E6DB4)",                      title: "Card / Section Gradient", code: "135deg · #1C3A8A → #2E6DB4" },
          { grad: "linear-gradient(135deg,#EEF2F8,#DDE4F0)",                      title: "Light Card Gradient",     code: "135deg · #EEF2F8 → #DDE4F0" },
        ].map((g) => (
          <div key={g.title} style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,.08)" }}>
            <div style={{ height: 64, background: g.grad }} />
            <div style={{ background: "var(--white)", padding: "12px 14px", border: "1px solid var(--border)", borderTop: "none", borderRadius: "0 0 12px 12px" }}>
              <strong style={{ fontSize: 12, color: "var(--td)", display: "block" }}>{g.title}</strong>
              <code style={{ fontSize: 10, color: "var(--tl)" }}>{g.code}</code>
            </div>
          </div>
        ))}
      </div>

      <style>{`@media(max-width:900px){.color-grid{grid-template-columns:repeat(3,1fr)!important;}}@media(max-width:600px){.color-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </div>
  );
}

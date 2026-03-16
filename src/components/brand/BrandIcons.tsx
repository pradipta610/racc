const ICONS = [
  { emoji: "✈️", label: "Migration",  bg: "rgba(91,163,217,.15)" },
  { emoji: "🎓", label: "Education",  bg: "rgba(91,163,217,.15)" },
  { emoji: "📋", label: "Documents",  bg: "rgba(91,163,217,.15)" },
  { emoji: "🌏", label: "Global",     bg: "rgba(91,163,217,.15)" },
  { emoji: "⭐", label: "Rating",     bg: "rgba(245,197,24,.12)" },
  { emoji: "🏅", label: "Achievement",bg: "rgba(245,197,24,.12)" },
  { emoji: "💬", label: "WhatsApp",   bg: "rgba(245,197,24,.12)" },
  { emoji: "📅", label: "Booking",    bg: "rgba(245,197,24,.12)" },
  { emoji: "✓",  label: "Approved",  bg: "rgba(46,180,120,.15)" },
  { emoji: "🤝", label: "Trust",      bg: "rgba(46,180,120,.15)" },
  { emoji: "📍", label: "Location",   bg: "rgba(91,163,217,.15)" },
  { emoji: "📞", label: "Phone",      bg: "rgba(91,163,217,.15)" },
  { emoji: "🔒", label: "Registered", bg: "rgba(91,163,217,.15)" },
  { emoji: "⚡", label: "Fast",       bg: "rgba(91,163,217,.15)" },
  { emoji: "📊", label: "Stats",      bg: "rgba(91,163,217,.15)" },
  { emoji: "💡", label: "Advice",     bg: "rgba(245,197,24,.12)" },
];

export default function BrandIcons() {
  return (
    <div id="icons" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--off)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>06 — Icon System</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Icons &amp; Visual Accents</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        RACC uses contextual emoji-based icons for warmth and accessibility across web pages. Icon containers use rounded rectangles (10–12px radius) with semi-transparent brand-colour backgrounds. Never use generic stock icons.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
        {ICONS.map((ic) => (
          <div key={ic.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 72 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: ic.bg }}>
              {ic.emoji}
            </div>
            <span style={{ fontSize: 10, color: "var(--tl)", textAlign: "center" }}>{ic.label}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "20px 24px" }}>
        <strong style={{ fontSize: 13, color: "var(--td)", display: "block", marginBottom: 10 }}>Icon Container Specs</strong>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, color: "var(--tm)" }}>
          <div>Size: 40–52px · Border-radius: 10–12px</div>
          <div>Navy/Blue context: <code style={{ fontFamily: "monospace" }}>background: rgba(91,163,217,.15)</code> or <code style={{ fontFamily: "monospace" }}>rgba(28,58,138,.1)</code></div>
          <div>Yellow context: <code style={{ fontFamily: "monospace" }}>background: rgba(245,197,24,.12)</code></div>
          <div>Green context: <code style={{ fontFamily: "monospace" }}>background: rgba(46,180,120,.15)</code></div>
          <div>On dark: <code style={{ fontFamily: "monospace" }}>background: rgba(255,255,255,.08)</code></div>
        </div>
      </div>
    </div>
  );
}

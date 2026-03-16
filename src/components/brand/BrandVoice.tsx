const TONES = [
  {
    icon: "🤝", title: "Warm & Genuine",
    body: "We speak like a trusted friend who happens to be an expert. Empathetic, encouraging, never patronising.",
    doSay: "\"We're here to help you every step of the way — from your first question to your visa being granted.\"",
    dontSay: "\"Clients are advised to submit documentation in accordance with departmental requirements.\"",
  },
  {
    icon: "🧠", title: "Expert & Clear",
    body: "We know Australian migration law deeply. We translate complexity into plain language — no jargon, no confusion.",
    doSay: "\"The 485 visa lets you stay in Australia after graduation while you find work — most people use it as a bridge to permanent residency.\"",
    dontSay: "\"The Temporary Graduate (Subclass 485) visa, pursuant to Schedule 2, facilitates post-study transitional arrangements.\"",
  },
  {
    icon: "🌟", title: "Hopeful & Empowering",
    body: "Migration is a life-changing journey. We celebrate every approval, every step forward, every dream realised.",
    doSay: "\"That moment when you see your visa has been granted — that's what we work for.\"",
    dontSay: "\"RACC processes visa applications efficiently and at competitive rates.\"",
  },
];

const CHECKLIST = [
  { ok: true,  text: "Use \"you\" and \"we\" — speak directly" },
  { ok: true,  text: "Use active voice always" },
  { ok: true,  text: "Short sentences. Plain words." },
  { ok: true,  text: "Acknowledge that migration is stressful" },
  { ok: true,  text: "Write in Australian English (e.g. \"recognised\")" },
  { ok: true,  text: "Celebrate client successes by name" },
  { ok: false, text: "Avoid bureaucratic / legal language" },
  { ok: false, text: "Never make visa outcome guarantees" },
  { ok: false, text: "Don't over-formalise social media" },
  { ok: false, text: "Avoid excessive exclamation marks!!!" },
];

export default function BrandVoice() {
  return (
    <div id="voice" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>07 — Voice &amp; Tone</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Brand Voice</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        RACC&apos;s voice is warm, genuine, and expert — never cold, corporate, or jargon-heavy. We treat every client as a friend. Our communications are clear enough for someone new to Australia to understand completely.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 28 }} className="tone-grid">
        {TONES.map((t) => (
          <div key={t.title} style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 22 }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>{t.icon}</div>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--td)", marginBottom: 8 }}>{t.title}</h4>
            <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.65, marginBottom: 12 }}>{t.body}</p>
            <div style={{ background: "var(--off)", borderRadius: 12, padding: "16px 20px", marginBottom: 8 }}>
              <strong style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".8px", color: "var(--blue)", display: "block", marginBottom: 6 }}>✅ Do say</strong>
              <p style={{ fontSize: 13, color: "var(--tm)", fontStyle: "italic" }}>{t.doSay}</p>
            </div>
            <div style={{ background: "#FFF5F5", borderRadius: 12, padding: "16px 20px" }}>
              <strong style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: ".8px", color: "#8B1A1A", display: "block", marginBottom: 6 }}>✗ Don&apos;t say</strong>
              <p style={{ fontSize: 13, color: "#8B1A1A", fontStyle: "italic" }}>{t.dontSay}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--off)", border: "1.5px solid var(--border)", borderRadius: 14, padding: 24 }}>
        <strong style={{ fontSize: 14, color: "var(--td)", display: "block", marginBottom: 14 }}>Writing Checklist</strong>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {CHECKLIST.map((c) => (
            <div key={c.text} style={{ fontSize: 13, color: "var(--tm)" }}>
              {c.ok ? "✅" : "✗"} {c.text}
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:900px){.tone-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

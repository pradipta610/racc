export default function QuoteStrip() {
  return (
    <div style={{
      background: "var(--off)", borderBottom: "1px solid var(--border)", padding: "22px 5%",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <blockquote style={{
          fontFamily: "var(--font-playfair),'Playfair Display',serif",
          fontSize: 18, color: "var(--td)", lineHeight: 1.65, fontStyle: "italic",
        }}>
          &ldquo;Overall I believe this might be one of the best — if not THE best — Migration &amp; Education agency here in Melbourne.&rdquo;
        </blockquote>
        <cite style={{ display: "block", fontSize: 13, color: "var(--tl)", marginTop: 10, fontStyle: "normal" }}>
          — Richard Ongosari, from Indonesia
        </cite>
      </div>
    </div>
  );
}

import Image from "next/image";

const SAMPLE_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80", alt: "Diverse multicultural group — developer: replace with real client photo" },
  { src: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=400&q=80", alt: "Melbourne city life — developer: replace with real Melbourne office photo" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80", alt: "University campus — developer: replace with real education photo" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c6f6?auto=format&fit=crop&w=400&q=80", alt: "Graduation celebration — developer: replace with real client success photo" },
];

export default function BrandPhotography() {
  return (
    <div id="photography" style={{ padding: "64px 7%", borderBottom: "1px solid var(--border)", background: "var(--off)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>08 — Photography</div>
      <div style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 8, lineHeight: 1.2 }}>Image Direction</div>
      <div style={{ width: 40, height: 3, background: "var(--yellow)", margin: "0 0 28px", borderRadius: 2 }} />
      <p style={{ fontSize: 15, color: "var(--tl)", marginBottom: 36, maxWidth: 600, lineHeight: 1.7 }}>
        Photography should feel warm, real, and multicultural — reflecting RACC&apos;s diverse international client base. Avoid generic stock photography with obviously staged Western subjects.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }} className="photo-samples">
        {SAMPLE_PHOTOS.map((p) => (
          <div key={p.src} style={{ borderRadius: 12, overflow: "hidden", border: "1.5px solid var(--border)" }}>
            <Image
              src={p.src}
              alt={p.alt}
              width={400}
              height={260}
              style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }} className="do-dont-grid">
        {/* Do */}
        <div style={{ borderRadius: 14, overflow: "hidden" }}>
          <div style={{ background: "#1a6b3a", color: "#fff", padding: "12px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
            ✓ Do Use
          </div>
          <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                "Authentic photos of real clients (with permission) holding visa grant letters",
                "Diverse, multicultural subjects reflecting Asia-Pacific backgrounds",
                "Melbourne city life, office spaces, and university environments",
                "Warm, natural lighting — not harsh studio light",
                "Candid, genuine expressions over forced smiles",
                "Images that reflect celebration, progress, and hope",
              ].map((t) => (
                <li key={t} style={{ fontSize: 13, color: "var(--tm)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#1a6b3a", fontWeight: 700, flexShrink: 0 }}>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Don't */}
        <div style={{ borderRadius: 14, overflow: "hidden" }}>
          <div style={{ background: "#8B1A1A", color: "#fff", padding: "12px 18px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "flex", alignItems: "center", gap: 8 }}>
            ✗ Don&apos;t Use
          </div>
          <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 }}>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
              {[
                "Generic Western corporate stock images",
                "Low-resolution or pixelated images",
                "Heavily filtered or over-edited photos",
                "Images with visible watermarks or attribution overlays",
                "Culturally insensitive or inappropriate content",
                "Images that don't relate to migration, education, or Melbourne life",
              ].map((t) => (
                <li key={t} style={{ fontSize: 13, color: "var(--tm)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <span style={{ color: "#8B1A1A", fontWeight: 700, flexShrink: 0 }}>✗</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, padding: "20px 24px" }}>
        <strong style={{ fontSize: 13, color: "var(--td)", display: "block", marginBottom: 10 }}>Image Overlay Rules</strong>
        <div style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.7 }}>
          When placing text over images, always use a dark navy gradient overlay:<br />
          <code style={{ fontFamily: "monospace", fontSize: 12 }}>background: linear-gradient(135deg, rgba(11,26,61,.85), rgba(28,58,138,.7))</code><br />
          Minimum contrast ratio for white text over overlays: <strong>4.5:1</strong> (WCAG AA).
        </div>
      </div>

      <style>{`@media(max-width:900px){.do-dont-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}

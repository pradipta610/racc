export default function MarnStrip() {
  return (
    <div style={{ background: "var(--navy)", padding: "36px 5%" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24, flexWrap: "wrap",
      }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 20, color: "#fff", marginBottom: 4 }}>
            Registered Migration Agents
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)" }}>
            All migration advice at RACC is provided by agents registered with the Office of the Migration Agents Registration Authority (OMARA).
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {["1572962", "1172003", "2518802"].map((marn) => (
            <div key={marn} style={{
              background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)",
              color: "rgba(255,255,255,.75)", fontSize: 12, fontWeight: 600,
              padding: "8px 16px", borderRadius: 8,
            }}>
              MARN <span style={{ color: "var(--yellow)" }}>{marn}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

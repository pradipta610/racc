import Image from "next/image";
import LOGO from "@/lib/logo";

export default function BrandCover() {
  return (
    <div id="cover" style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg,#080E26 0%,#0F1E45 40%,#1C3A8A 75%,#2E6DB4 100%)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      padding: "64px 8%", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -150, right: -150, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(91,163,217,.12) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,197,24,.06) 0%,transparent 65%)", pointerEvents: "none" }} />
      {/* Grid lines */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative", zIndex: 1 }}>
        <Image src={LOGO} alt="RACC Australia" width={52} height={52} style={{ objectFit: "contain", filter: "drop-shadow(0 4px 12px rgba(0,0,0,.4))" }} />
        <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,.7)", letterSpacing: ".5px" }}>RACC Australia</span>
      </div>

      {/* Body */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--yellow)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Brand Guidelines</div>
        <h1 style={{
          fontFamily: "var(--font-playfair),'Playfair Display',serif",
          fontSize: "clamp(42px,7vw,80px)", lineHeight: 1.05, color: "#fff", marginBottom: 24,
        }}>
          Our Brand.<br /><span style={{ color: "var(--yellow)" }}>Our Identity.</span>
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", maxWidth: 480, lineHeight: 1.7 }}>
          A complete reference for colours, typography, components, voice, and usage rules for RACC Australia&apos;s visual identity.
        </p>
      </div>

      {/* Footer bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>Version 1.0 &nbsp;·&nbsp; March 2026 &nbsp;·&nbsp; racc.net.au</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--navy)", border: "1px solid rgba(255,255,255,.2)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--blue)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--sky)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--yellow)" }} />
        </div>
      </div>
    </div>
  );
}

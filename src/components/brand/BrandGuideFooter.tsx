import Image from "next/image";
import LOGO from "@/lib/logo";

export default function BrandGuideFooter() {
  return (
    <div style={{
      background: "#080E26", padding: "48px 7%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Image src={LOGO} alt="RACC" width={44} height={44} style={{ objectFit: "contain" }} />
        <div>
          <strong style={{ display: "block", color: "#fff", fontSize: 16 }}>RACC Australia</strong>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>Brand Guidelines v1.0 — March 2026</span>
        </div>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.25)", textAlign: "right" }}>
        racc.net.au &nbsp;·&nbsp; info@racc.net.au<br />
        343 Little Collins St, Melbourne VIC 3000<br />
        MARN 1572962 · 1172003 · 2518802
      </div>
    </div>
  );
}

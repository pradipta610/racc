"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LOGO from "@/lib/logo";

const NAV = [
  { section: "Brand Foundations", links: [
    { href: "colours",    label: "🎨 Colour Palette", num: "01" },
    { href: "typography", label: "🔤 Typography",     num: "02" },
    { href: "logo",       label: "🏷️ Logo Usage",     num: "03" },
  ]},
  { section: "Design System", links: [
    { href: "spacing",    label: "📐 Spacing & Grid", num: "04" },
    { href: "components", label: "🧩 Components",     num: "05" },
    { href: "icons",      label: "✦ Icon System",     num: "06" },
  ]},
  { section: "Brand Voice", links: [
    { href: "voice",       label: "💬 Voice & Tone",  num: "07" },
    { href: "photography", label: "📸 Photography",   num: "08" },
    { href: "dont",        label: "🚫 Do & Don't",    num: "09" },
  ]},
];

export default function BrandSidebar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = () => {
      const ids = ["colours","typography","logo","spacing","components","icons","voice","photography","dont"];
      let current = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <aside style={{
      background: "#0B1831", position: "sticky", top: 0, height: "100vh",
      overflowY: "auto", padding: "32px 0", display: "flex", flexDirection: "column",
      gap: 4, scrollbarWidth: "none",
    }} className="brand-sidebar">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", marginBottom: 12 }}>
        <Image src={LOGO} alt="RACC" width={36} height={36} style={{ objectFit: "contain" }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>Brand Guide</span>
      </div>

      {NAV.map((group) => (
        <div key={group.section}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: "1.5px", padding: "16px 24px 6px" }}>
            {group.section}
          </div>
          {group.links.map((l) => (
            <a key={l.href} href={`#${l.href}`} style={{
              display: "flex", alignItems: "center", gap: 9, padding: "9px 24px",
              fontSize: 13, textDecoration: "none", transition: "all .2s",
              borderLeft: `2px solid ${active === l.href ? "var(--yellow)" : "transparent"}`,
              color: active === l.href ? "var(--yellow)" : "rgba(255,255,255,.45)",
              background: active === l.href ? "rgba(245,197,24,.06)" : "transparent",
            }}>
              {l.label}
              <span style={{ fontSize: 10, opacity: .4, marginLeft: "auto" }}>{l.num}</span>
            </a>
          ))}
        </div>
      ))}

      <style>{`.brand-sidebar::-webkit-scrollbar{display:none;}`}</style>
    </aside>
  );
}

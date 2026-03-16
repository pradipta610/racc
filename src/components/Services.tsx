"use client";

import { useState } from "react";
import Link from "next/link";
import { EDU_SERVICES, MIG_SERVICES } from "@/lib/data";

const tabs = [
  { key: "edu", label: "🎓 Education", services: EDU_SERVICES },
  { key: "mig", label: "✈️ Migration", services: MIG_SERVICES },
];

export default function Services() {
  const [active, setActive] = useState("edu");
  const current = tabs.find((t) => t.key === active)!;

  return (
    <section id="services" style={{ padding: "76px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>What We Do</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>Education &amp; Migration Services</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            From finding the right course to getting your visa approved — we guide you through every step.
          </p>
          <Link href="/migration-services" style={{
            display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600,
            color: "var(--blue)", textDecoration: "none",
          }} className="svc-all-link">View all migration services →</Link>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}
          className="stabs">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setActive(t.key)} style={{
              padding: "9px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600,
              cursor: "pointer", border: `2px solid ${active === t.key ? "var(--navy)" : "var(--border)"}`,
              background: active === t.key ? "var(--navy)" : "var(--white)",
              color: active === t.key ? "var(--white)" : "var(--tm)",
              transition: "all .2s", fontFamily: "inherit",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Service cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}
          className="sgrid">
          {current.services.map((s) => (
            <Link key={s.href} href={s.href} style={{
              background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14,
              padding: 22, textDecoration: "none", color: "inherit", display: "block",
              transition: "all .25s",
            }} className="sc">
              <div style={{
                width: 46, height: 46, borderRadius: 11, background: "var(--light)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 21, marginBottom: 12,
              }}>{s.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--td)", marginBottom: 7 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--blue)" }}>Learn more →</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .sc:hover { border-color: var(--blue) !important; box-shadow: 0 8px 28px rgba(28,58,138,.09); transform: translateY(-3px); }
        @media (max-width: 768px) {
          .sgrid  { grid-template-columns: 1fr !important; }
          .stabs button { flex: 1; padding: 9px 10px !important; font-size: 13px !important; }
        }
        @media (max-width: 480px) {
          .stabs { flex-direction: column !important; }
          .stabs button { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

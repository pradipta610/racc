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
            <Link key={s.href} href={s.href} className="sc">
              <div style={{ padding: "22px 22px 20px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "rgba(28,58,138,.06)", border: "1px solid rgba(28,58,138,.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                }}>{s.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginTop: 14, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.6, marginBottom: 14 }}>
                  {s.desc}
                </p>
                <span className="sc-arrow">Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .sc {
          border-radius: 14px; overflow: hidden;
          text-decoration: none; color: inherit; display: block;
          transition: all .25s ease;
          background: rgba(255,255,255,.65);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.7);
          box-shadow: 0 2px 12px rgba(28,58,138,.06), 0 1px 3px rgba(0,0,0,.04);
          min-height: 235px;
        }
        .sc:hover {
          border-color: var(--sky); transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(28,58,138,.12), 0 2px 6px rgba(0,0,0,.06);
          background: rgba(255,255,255,.9);
        }
        .sc-arrow {
          font-size: 14px; font-weight: 600; color: var(--navy); margin-top: auto;
          transition: color .15s;
        }
        .sc:hover .sc-arrow { color: var(--blue); }
        .svc-all-link:hover { text-decoration: underline !important; }
        @media (max-width: 900px) {
          .sgrid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .sgrid { grid-template-columns: 1fr !important; gap: 12px !important; }
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

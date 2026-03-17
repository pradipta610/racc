"use client";

import { useState } from "react";
import Link from "next/link";
import { EDU_SERVICES, MIG_SERVICES } from "@/lib/data";

const CARD_BACKGROUNDS_BY_TAB: Record<string, string[]> = {
  edu: [
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80", // pathway/campus
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80", // student visa
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", // extension/docs
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80", // professional year
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80", // coaching/language
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80", // speaking/training
  ],
  mig: [
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80", // skilled migration
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80", // employer sponsored
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80", // student+graduate visa
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80", // family visa
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80", // visitor/tourist
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80", // refusal/review
  ],
};

const tabs = [
  { key: "edu", label: "🎓 Education", services: EDU_SERVICES },
  { key: "mig", label: "✈️ Migration", services: MIG_SERVICES },
];

export default function Services() {
  const [active, setActive] = useState("edu");
  const current = tabs.find((t) => t.key === active)!;
  const activeBackgrounds = CARD_BACKGROUNDS_BY_TAB[active] ?? CARD_BACKGROUNDS_BY_TAB.edu;

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
          {current.services.map((s, i) => (
            <Link key={s.href} href={s.href} style={{
              borderRadius: 14, overflow: "hidden",
              textDecoration: "none", color: "inherit", display: "block",
              transition: "all .25s", border: "1.5px solid rgba(255,255,255,.18)",
              backgroundImage: `linear-gradient(165deg, rgba(11,31,74,.84) 0%, rgba(11,31,74,.7) 45%, rgba(11,31,74,.62) 100%), url(${activeBackgrounds[i % activeBackgrounds.length]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 235,
              boxShadow: "0 8px 24px rgba(11,31,74,.14)",
            }} className="sc">
              <div style={{ padding: "20px 20px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 11,
                  background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 21, backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
                }}>{s.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 12, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.86)", lineHeight: 1.55, marginBottom: 12 }}>
                  {s.desc}
                </p>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: "auto" }}>Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .sc:hover { border-color: var(--blue) !important; box-shadow: 0 8px 28px rgba(28,58,138,.12); transform: translateY(-3px); }
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

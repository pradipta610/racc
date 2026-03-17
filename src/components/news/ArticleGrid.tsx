"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NEWS_ARTICLES, NEWS_FILTERS } from "@/lib/data";

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  migration:  { bg: "rgba(28,58,138,.85)",  color: "#fff" },
  visa:       { bg: "rgba(27,119,70,.85)",   color: "#fff" },
  education:  { bg: "rgba(46,109,180,.85)",  color: "#fff" },
  occupation: { bg: "rgba(28,58,138,.85)",   color: "#fff" },
  state:      { bg: "rgba(212,168,0,.9)",    color: "#0F1E45" },
};

const PAGES = [
  { label: "2", href: "https://www.racc.net.au/event/page/2" },
  { label: "3", href: "https://www.racc.net.au/event/page/3" },
  { label: "4", href: "https://www.racc.net.au/event/page/4" },
  { label: "5", href: "https://www.racc.net.au/event/page/5" },
];

export default function ArticleGrid() {
  const [active, setActive] = useState("all");

  const visible = NEWS_ARTICLES.filter((a) =>
    active === "all" ? true : a.cats.includes(active)
  );

  return (
    <div>
      {/* Filter bar */}
      <div style={{
        borderBottom: "1px solid var(--border)", background: "var(--white)",
        padding: "0 0", position: "sticky", top: 68, zIndex: 50,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          overflowX: "auto", padding: "14px 0", scrollbarWidth: "none",
        }}>
          {NEWS_FILTERS.map((f) => (
            <button key={f.key} onClick={() => setActive(f.key)} style={{
              background: active === f.key ? "var(--navy)" : "none",
              border: `1.5px solid ${active === f.key ? "var(--navy)" : "var(--border)"}`,
              color: active === f.key ? "#fff" : "var(--tm)",
              fontSize: 13, fontWeight: 500, padding: "7px 16px", borderRadius: 20,
              cursor: "pointer", whiteSpace: "nowrap", transition: "all .2s",
              fontFamily: "inherit",
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Article grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 28 }}
        className="ag-grid">
        {visible.map((a) => {
          const ts = TAG_STYLES[a.tagType] ?? TAG_STYLES.migration;
          return (
            <Link key={a.href + a.title} href={a.href} className="ac" style={{
              background: "var(--white)", border: "1.5px solid var(--border)",
              borderRadius: 14, overflow: "hidden", textDecoration: "none", color: "inherit",
              display: "flex", flexDirection: "column", transition: "all .2s",
            }}>
              <div style={{
                height: 140, position: "relative", overflow: "hidden",
              }}>
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span style={{
                  position: "absolute", bottom: 10, left: 10, zIndex: 1,
                  fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 5,
                  textTransform: "uppercase", letterSpacing: ".5px",
                  background: ts.bg, color: ts.color,
                }}>{a.tagLabel}</span>
              </div>
              <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--td)", lineHeight: 1.45, marginBottom: 8, flex: 1 }}>
                  {a.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</p>
                <div style={{ fontSize: 11, color: "var(--tl)", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span>📅 {a.date}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--blue)" }}>Read →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "40px 0 0" }}>
        {[
          { label: "‹", href: "#" },
          { label: "1", href: "#", active: true },
          ...PAGES.map((p) => ({ label: p.label, href: p.href, active: false })),
          { label: "›", href: "https://www.racc.net.au/event/page/2", active: false },
        ].map((p, i) => (
          <Link key={i} href={p.href} style={{
            width: 38, height: 38, borderRadius: 8, display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 14,
            fontWeight: 500, textDecoration: "none",
            color: p.active ? "#fff" : "var(--tm)",
            background: p.active ? "var(--navy)" : "none",
            border: `1.5px solid ${p.active ? "var(--navy)" : "var(--border)"}`,
            transition: "all .2s",
          }} className="pg-btn">
            {p.label}
          </Link>
        ))}
      </div>

      <style>{`
        .ac:hover { box-shadow: 0 8px 28px rgba(28,58,138,.09); transform: translateY(-2px); border-color: var(--blue) !important; }
        .pg-btn:hover { border-color: var(--blue) !important; color: var(--blue) !important; }
        @media (max-width: 768px) { .ag-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}

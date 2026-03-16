"use client";

import { useState } from "react";
import { ALL_REVIEWS, REVIEWS_COUNTRY_FILTERS } from "@/lib/data";

export default function ReviewsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    if (key !== "all") setShowAll(true);
  };

  const visible = ALL_REVIEWS.filter((r) => {
    const matchesFilter = activeFilter === "all" ? true : r.country === activeFilter;
    const visibleByLoad = activeFilter !== "all" ? true : (showAll || !r.hidden);
    return matchesFilter && visibleByLoad;
  });

  const hasHidden = !showAll && ALL_REVIEWS.some((r) => r.hidden);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 5%" }} className="rv-wrap">

      {/* Filter bar */}
      <div style={{
        borderBottom: "1px solid var(--border)", background: "var(--white)",
        marginBottom: 0, position: "sticky", top: 68, zIndex: 50,
        margin: "0 -5% 0", padding: "0 5%",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          overflowX: "auto", padding: "14px 0", scrollbarWidth: "none",
        }}>
          {REVIEWS_COUNTRY_FILTERS.map((f) => (
            <button key={f.key} onClick={() => handleFilter(f.key)} style={{
              background: activeFilter === f.key ? "var(--navy)" : "none",
              border: `1.5px solid ${activeFilter === f.key ? "var(--navy)" : "var(--border)"}`,
              color: activeFilter === f.key ? "#fff" : "var(--tm)",
              fontSize: 13, fontWeight: 500, padding: "7px 16px",
              borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap",
              transition: "all .2s", fontFamily: "inherit",
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 32,
      }} className="rv-grid">
        {visible.map((r, i) => (
          <div key={i} className="rc" style={{
            background: "var(--white)", border: "1.5px solid var(--border)",
            borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
            gap: 14, transition: "all .2s", position: "relative",
          }}>
            <div style={{
              position: "absolute", top: 18, right: 20, fontSize: 48, lineHeight: 1,
              color: "var(--light)", fontFamily: "'Playfair Display',serif", pointerEvents: "none",
            }}>&ldquo;</div>

            <div style={{ color: "var(--yellow)", fontSize: 14, letterSpacing: 2 }}>★★★★★</div>

            <span style={{
              display: "inline-block", fontSize: 11, fontWeight: 600, padding: "3px 9px",
              borderRadius: 10, background: "var(--light)", color: "var(--blue)", alignSelf: "flex-start",
            }}>{r.visa}</span>

            <p style={{ fontSize: 14, color: "var(--tm)", lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>
              {r.text}
            </p>

            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              paddingTop: 12, borderTop: "1px solid var(--border)",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%", background: "var(--navy)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 700, flexShrink: 0,
              }}>{r.initials}</div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600, color: "var(--td)", display: "block" }}>{r.name}</strong>
                <span style={{ fontSize: 12, color: "var(--tl)" }}>from {r.from}</span>
              </div>
              <span style={{ fontSize: 16, marginLeft: "auto", flexShrink: 0 }}>{r.flag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasHidden && activeFilter === "all" && (
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button onClick={() => setShowAll(true)} style={{
            background: "var(--white)", border: "2px solid var(--navy)", color: "var(--navy)",
            fontSize: 14, fontWeight: 600, padding: "12px 32px", borderRadius: 9,
            cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
          }} className="btn-load">
            Load More Reviews
          </button>
        </div>
      )}

      <style>{`
        .rc:hover { box-shadow: 0 10px 32px rgba(28,58,138,.09); transform: translateY(-2px); border-color: var(--sky) !important; }
        .btn-load:hover { background: var(--navy) !important; color: #fff !important; }
        @media (max-width: 1024px) { .rv-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px)  { .rv-grid { grid-template-columns: 1fr !important; } .rv-wrap { padding: 36px 4% !important; } }
      `}</style>
    </div>
  );
}

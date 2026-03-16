import Link from "next/link";
import { VISA_TABLE_ROWS } from "@/lib/data";

const BADGE: Record<string, { bg: string; color: string; label: string }> = {
  pr:    { bg: "#E8F5F0", color: "#1A7A52", label: "Permanent" },
  temp:  { bg: "#EBF3FF", color: "#1C4DB4", label: "Temporary" },
  fam:   { bg: "#FFF3E0", color: "#B45309", label: "Family" },
  emp:   { bg: "#F3E8FF", color: "#6B21A8", label: "Employer" },
  other: { bg: "#F3F4F6", color: "#4B5563", label: "Visitor" },
};

export default function VisaTable() {
  return (
    <section style={{ padding: "72px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Quick Reference</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 30, color: "var(--td)", marginBottom: 8,
          }}>Popular Visas at a Glance</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 600, lineHeight: 1.7 }}>
            Not sure which visa is right for you? Here&apos;s a summary of the most common visa pathways we handle.
          </p>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%", borderCollapse: "collapse", borderRadius: 12,
            overflow: "hidden", border: "1.5px solid var(--border)",
          }}>
            <thead>
              <tr>
                {["Visa", "Subclass", "Type", "Key Requirement", "Learn More"].map((h) => (
                  <th key={h} style={{
                    background: "var(--navy)", color: "#fff", fontSize: 12, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: ".8px", padding: "13px 16px", textAlign: "left",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VISA_TABLE_ROWS.map((row) => {
                const badge = BADGE[row.type];
                return (
                  <tr key={row.subclass} className="vtable-row" style={{ borderBottom: "1px solid var(--border)", transition: "background .15s" }}>
                    <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 600, color: "var(--td)" }}>{row.visa}</td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "var(--tm)" }}>{row.subclass}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{
                        display: "inline-block", fontSize: 11, fontWeight: 600,
                        padding: "3px 9px", borderRadius: 12,
                        background: badge.bg, color: badge.color,
                      }}>{badge.label}</span>
                    </td>
                    <td style={{ padding: "13px 16px", fontSize: 14, color: "var(--tm)" }}>{row.req}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <Link href={row.href} style={{
                        color: "var(--blue)", textDecoration: "none", fontWeight: 500, fontSize: 13,
                      }} className="vtable-link">View →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .vtable-row:hover { background: var(--light) !important; }
        .vtable-row:last-child { border-bottom: none !important; }
        .vtable-link:hover { text-decoration: underline !important; }
      `}</style>
    </section>
  );
}

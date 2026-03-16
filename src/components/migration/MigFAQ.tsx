"use client";

import { useState } from "react";
import { MIG_FAQS } from "@/lib/data";

export default function MigFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "72px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>FAQ</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 30, color: "var(--td)", marginBottom: 8,
          }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
            Common questions about Australian migration and working with a registered migration agent.
          </p>
        </div>

        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          {MIG_FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{
                background: "var(--white)",
                border: "1.5px solid var(--border)",
                borderLeft: isOpen ? "4px solid var(--yellow)" : "1.5px solid var(--border)",
                borderRadius: 10,
                marginBottom: 10,
                overflow: "hidden",
              }}>
                <div
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    padding: "16px 20px", fontSize: 15, fontWeight: 600, color: "var(--td)",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    cursor: "pointer", gap: 12,
                  }}
                >
                  {faq.q}
                  <span style={{
                    fontSize: 20, color: "var(--blue)", fontWeight: 300,
                    flexShrink: 0, lineHeight: 1, minWidth: 16, textAlign: "center",
                  }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </div>
                {isOpen && (
                  <div style={{ padding: "0 20px 15px", fontSize: 14, color: "var(--tm)", lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

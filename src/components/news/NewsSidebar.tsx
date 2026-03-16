import Link from "next/link";
import { NEWS_TOPICS, NEWS_RECENT } from "@/lib/data";

export default function NewsSidebar() {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 24 }} className="news-sidebar">

      {/* Newsletter */}
      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "var(--navy)", padding: "14px 18px" }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: ".8px" }}>
            📬 Stay Updated
          </h4>
        </div>
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          <p style={{ fontSize: 13, color: "var(--tm)", lineHeight: 1.6 }}>
            Get the latest migration news and visa updates delivered to your inbox.
          </p>
          <input type="email" placeholder="Your email address" style={{
            border: "1.5px solid var(--border)", borderRadius: 8, padding: "10px 14px",
            fontSize: 13, fontFamily: "inherit", color: "var(--td)", width: "100%", outline: "none",
          }} />
          <button style={{
            background: "var(--yellow)", color: "var(--navy)", fontSize: 13, fontWeight: 700,
            padding: 10, borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit",
            transition: "all .2s",
          }}>
            Subscribe to Updates
          </button>
        </div>
      </div>

      {/* Consult CTA */}
      <div style={{
        background: "linear-gradient(135deg, var(--navy), var(--blue))",
        borderRadius: 14, padding: 22, textAlign: "center",
      }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Not Sure How Updates Affect You?
        </h4>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginBottom: 16, lineHeight: 1.55 }}>
          Book a free consultation with our registered agents. We explain what the latest changes mean for your visa pathway.
        </p>
        <Link href="https://www.racc.net.au/migration-agent-education-agent" style={{
          background: "var(--yellow)", color: "var(--navy)", fontSize: 13, fontWeight: 700,
          padding: "10px 20px", borderRadius: 8, textDecoration: "none", display: "block",
          transition: "all .2s",
        }}>
          Book Free Consultation
        </Link>
      </div>

      {/* Popular Topics */}
      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "var(--navy)", padding: "14px 18px" }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: ".8px" }}>
            🏷️ Popular Topics
          </h4>
        </div>
        <div style={{ padding: "16px 18px" }}>
          {NEWS_TOPICS.map((t, i) => (
            <Link key={t.label} href={t.href} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 0", borderBottom: i < NEWS_TOPICS.length - 1 ? "1px solid var(--border)" : "none",
              textDecoration: "none", color: "var(--tm)", fontSize: 13, transition: "all .2s",
            }} className="topic-lnk">
              {t.label}
              <span style={{
                background: "var(--light)", color: "var(--blue)",
                fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
              }}>{t.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div style={{ background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ background: "var(--navy)", padding: "14px 18px" }}>
          <h4 style={{ fontSize: 13, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: ".8px" }}>
            🕐 Recent Posts
          </h4>
        </div>
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
          {NEWS_RECENT.map((r) => (
            <Link key={r.href} href={r.href} className="recent-lnk" style={{
              display: "flex", gap: 12, textDecoration: "none", color: "inherit",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 8, background: "var(--light)",
                flexShrink: 0, overflow: "hidden", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>
                {r.icon}
              </div>
              <div>
                <h5 className="recent-title" style={{
                  fontSize: 13, fontWeight: 600, color: "var(--td)",
                  lineHeight: 1.4, marginBottom: 3, transition: "color .2s",
                }}>
                  {r.title}
                </h5>
                <span style={{ fontSize: 11, color: "var(--tl)" }}>{r.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .topic-lnk:hover { color: var(--navy) !important; padding-left: 4px !important; }
        .recent-lnk:hover .recent-title { color: var(--blue) !important; }
        @media (max-width: 1024px) {
          .news-sidebar { display: grid !important; grid-template-columns: 1fr 1fr; gap: 20px; }
          .news-sidebar > div:nth-child(3) { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .news-sidebar { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </aside>
  );
}

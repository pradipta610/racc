import Link from "next/link";
import Image from "next/image";
import { NEWS_FEATURED } from "@/lib/data";

export default function NewsHero() {
  return (
    <section style={{
      background: "var(--off)", borderBottom: "1px solid var(--border)", padding: "52px 5% 56px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
      }} className="news-hero-inner">

        {/* Left */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--light)", color: "var(--blue)", fontSize: 12, fontWeight: 600,
            padding: "5px 14px", borderRadius: 20, marginBottom: 14,
            letterSpacing: ".5px", textTransform: "uppercase", border: "1px solid var(--border)",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", flexShrink: 0, display: "inline-block" }} />
            Updated Weekly
          </div>
          <h1 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 38, lineHeight: 1.2, color: "var(--td)", marginBottom: 14,
          }}>
            Migration &amp; Education{" "}
            <em style={{ color: "var(--blue)", fontStyle: "normal" }}>News</em>
          </h1>
          <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.75, maxWidth: 480 }}>
            Stay informed with the latest Australian visa changes, occupation list updates, state nomination rounds, and education news from our registered migration agents.
          </p>
        </div>

        {/* Right — featured article card */}
        <Link href={NEWS_FEATURED.href} className="news-hl" style={{
          background: "var(--white)", border: "1.5px solid var(--border)", borderRadius: 16,
          overflow: "hidden", textDecoration: "none", color: "inherit", display: "block",
          transition: "all .2s",
        }}>
          <div style={{
            height: 180, position: "relative", overflow: "hidden",
          }}>
            <Image
              src={NEWS_FEATURED.image}
              alt={NEWS_FEATURED.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <span style={{ position: "absolute", top: 14, left: 14, background: "var(--yellow)", color: "var(--navy)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, zIndex: 1 }}>Latest</span>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: ".6px", marginBottom: 8 }}>
              {NEWS_FEATURED.tag}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--td)", lineHeight: 1.4, marginBottom: 8 }}>
              {NEWS_FEATURED.title}
            </h3>
            <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.6, marginBottom: 12 }}>{NEWS_FEATURED.desc}</p>
            <div style={{ fontSize: 12, color: "var(--tl)", display: "flex", alignItems: "center", gap: 10 }}>
              <span>📅 {NEWS_FEATURED.date}</span>
              <span>⏱ {NEWS_FEATURED.readTime}</span>
            </div>
          </div>
        </Link>
      </div>

      <style>{`
        .news-hl:hover { box-shadow: 0 10px 32px rgba(28,58,138,.1); transform: translateY(-2px); }
        @media (max-width: 768px) {
          .news-hero-inner { grid-template-columns: 1fr !important; gap: 28px !important; }
          .news-hero-inner h1 { font-size: 26px !important; }
        }
        @media (max-width: 480px) {
          .news-hero-inner h1 { font-size: 22px !important; }
        }
      `}</style>
    </section>
  );
}

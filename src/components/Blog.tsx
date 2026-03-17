import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/data";

export default function Blog() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--off)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, color: "var(--blue)",
            textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 8,
            background: "var(--light)", padding: "4px 12px", borderRadius: 12,
          }}>Latest Updates</div>
          <h2 style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 33, color: "var(--td)", marginBottom: 10,
          }}>News &amp; Migration Updates</h2>
          <p style={{ fontSize: 15, color: "var(--tm)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Stay up to date with the latest Australian visa changes, occupation lists, and education news.
          </p>
          <Link href="/news-events" style={{
            display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600,
            color: "var(--blue)", textDecoration: "none",
          }} className="blog-all-link">View all news &amp; updates →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="bgrid">
          {BLOG_POSTS.map((post) => (
            <Link key={post.title} href={post.href} className="bc" style={{
              border: "1.5px solid var(--border)", borderRadius: 14, overflow: "hidden",
              textDecoration: "none", color: "inherit", display: "block",
              background: "var(--white)", transition: "all .2s",
            }}>
              <div style={{ height: 150, position: "relative", overflow: "hidden" }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: 18 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: "var(--blue)",
                  textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6,
                }}>{post.tag}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--td)", marginBottom: 6, lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--tl)", lineHeight: 1.6 }}>{post.desc}</p>
                <div style={{ marginTop: 10, fontSize: 11, color: "var(--tl)" }}>{post.meta}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .bc:hover { box-shadow: 0 8px 24px rgba(28,58,138,.09); transform: translateY(-2px); }
        .blog-all-link:hover { text-decoration: underline !important; }
        @media (max-width: 768px) { .bgrid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

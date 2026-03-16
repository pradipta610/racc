import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/migration/Breadcrumb";
import NewsHero from "@/components/news/NewsHero";
import ArticleGrid from "@/components/news/ArticleGrid";
import NewsSidebar from "@/components/news/NewsSidebar";

export const metadata: Metadata = {
  title: "Migration & Education News | RACC Australia",
  description:
    "Stay up to date with the latest Australian migration news, visa updates, occupation list changes, and education news from RACC Australia's registered migration agents.",
};

export default function NewsEventsPage() {
  return (
    <>
      <Navbar activePage="news" />
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events" },
        ]}
      />
      <main>
        <NewsHero />

        {/* Main content + sidebar */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 5%", display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}
          className="news-content-wrap">
          <ArticleGrid />
          <NewsSidebar />
        </div>

        {/* CTA */}
        <section style={{ padding: "72px 5%", background: "var(--navy)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "#fff", marginBottom: 12 }}>
            Have Questions About a Recent Update?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", marginBottom: 24, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
            Our registered migration agents monitor visa changes daily. Book a free consultation to find out how the latest news affects your pathway.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.racc.net.au/migration-agent-education-agent" style={{
              background: "var(--yellow)", color: "var(--navy)", padding: "13px 28px",
              borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}>Book Free Consultation</a>
            <a href="https://wa.me/61420746705" style={{
              background: "transparent", color: "#fff", padding: "13px 28px",
              borderRadius: 9, fontSize: 14, fontWeight: 500, textDecoration: "none",
              border: "2px solid rgba(255,255,255,.3)",
            }}>💬 WhatsApp Us</a>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 1024px) { .news-content-wrap { grid-template-columns: 1fr !important; gap: 32px !important; } }
        @media (max-width: 768px)  { .news-content-wrap { padding: 36px 4% !important; } }
      `}</style>
    </>
  );
}

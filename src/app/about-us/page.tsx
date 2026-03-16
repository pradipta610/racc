import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/migration/Breadcrumb";
import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import TeamLanguages from "@/components/about/TeamLanguages";
import ConsultTypes from "@/components/about/ConsultTypes";
import MarnStrip from "@/components/about/MarnStrip";

export const metadata: Metadata = {
  title: "About Us – Registered Migration Agents & Education Consultants | RACC Australia",
  description:
    "RACC Australia has 20+ years of experience in migration and education services in Melbourne. Registered migration agents, 4.9/5 satisfaction, multilingual team speaking 12+ languages.",
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar activePage="about" />
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />
      <main>
        <AboutHero />
        <Mission />
        <TeamLanguages />
        <ConsultTypes />
        <MarnStrip />

        {/* CTA */}
        <section style={{ padding: "72px 5%", background: "var(--off)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-playfair),'Playfair Display',serif", fontSize: 32, color: "var(--td)", marginBottom: 12 }}>
            Ready to Start Your Australian Journey?
          </h2>
          <p style={{ fontSize: 15, color: "var(--tm)", marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Our friendly team is here to help — whether you&apos;re just exploring options or ready to lodge your application.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://www.racc.net.au/migration-agent-education-agent" style={{ background: "var(--yellow)", color: "var(--navy)", padding: "13px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Book Free Consultation
            </a>
            <a href="https://wa.me/61420746705" style={{ background: "transparent", color: "var(--td)", padding: "13px 28px", borderRadius: 9, fontSize: 14, fontWeight: 500, textDecoration: "none", border: "1.5px solid var(--border)" }}>
              💬 WhatsApp Us
            </a>
            <a href="/client-reviews" style={{ background: "var(--navy)", color: "#fff", padding: "13px 28px", borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
              Read Our Reviews
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

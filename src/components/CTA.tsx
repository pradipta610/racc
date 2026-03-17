import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section style={{ padding: "80px 5%", background: "var(--navy)", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <Image
        src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1600&q=80"
        alt="Australian landscape — developer: replace with real photo"
        fill
        style={{ objectFit: "cover", opacity: 0.15 }}
        sizes="100vw"
      />
      <h2 style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
        fontSize: 36, color: "var(--white)", marginBottom: 12, position: "relative", zIndex: 1,
      }}>
        Ready to Start Your Australian Journey?
      </h2>
      <p style={{
        fontSize: 16, color: "rgba(255,255,255,.75)", marginBottom: 28,
        maxWidth: 480, marginLeft: "auto", marginRight: "auto", position: "relative", zIndex: 1,
      }}>
        Book a free consultation with our registered migration agents. No obligation, genuine advice you can trust.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <Link href="https://www.racc.net.au/migration-agent-education-agent" style={{
          background: "var(--yellow)", color: "var(--navy)", padding: "14px 32px",
          borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "all .2s",
        }}>
          Book Free Consultation
        </Link>
        <Link href="https://wa.me/61420746705" style={{
          background: "transparent", color: "var(--white)", padding: "14px 32px",
          borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none",
          border: "2px solid rgba(255,255,255,.4)", transition: "all .2s",
        }}>
          💬 WhatsApp Us
        </Link>
      </div>
    </section>
  );
}

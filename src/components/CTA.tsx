import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-sec" style={{ padding: "80px 5%", background: "var(--navy)", textAlign: "center" }}>
      <h2 style={{
        fontFamily: "var(--font-playfair), 'Playfair Display', serif",
        fontSize: 36, color: "var(--white)", marginBottom: 12,
      }}>
        Ready to Start Your Australian Journey?
      </h2>
      <p style={{
        fontSize: 16, color: "rgba(255,255,255,.75)", marginBottom: 28,
        maxWidth: 480, marginLeft: "auto", marginRight: "auto",
      }}>
        Book a free consultation with our registered migration agents. No obligation, genuine advice you can trust.
      </p>
      <div className="cta-btns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
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
      <style>{`
        @media (max-width: 768px) {
          .cta-sec h2 { font-size: 26px !important; }
          .cta-sec p { font-size: 14px !important; }
          .cta-sec { padding: 56px 5% !important; }
          .cta-btns { flex-direction: column !important; gap: 10px !important; }
          .cta-btns a { width: 100%; text-align: center; padding: 14px 20px !important; }
        }
        @media (max-width: 480px) {
          .cta-sec h2 { font-size: 22px !important; }
        }
      `}</style>
    </section>
  );
}

import Link from "next/link";

export default function CTAV2() {
  return (
    <div className="v2-cta-banner">
      <h2>Ready to Start Your Australian Journey?</h2>
      <p>Book a free, no-obligation consultation with our registered migration agents.</p>
      <div className="v2-cta-btns">
        <Link href="https://www.racc.net.au/migration-agent-education-agent" className="v2-btn v2-btn-navy">
          Book Free Consultation
        </Link>
        <Link href="https://wa.me/61420746705" className="v2-btn v2-btn-ghost">
          💬 WhatsApp
        </Link>
      </div>

      <style>{`
        .v2-cta-banner {
          padding: 60px 5%; text-align: center;
          background: var(--off); border-top: 1px solid var(--border);
        }
        .v2-cta-banner h2 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 3vw, 30px); color: var(--td); margin-bottom: 10px; font-weight: 600;
        }
        .v2-cta-banner p {
          font-size: 14px; color: var(--tm); margin-bottom: 24px;
          max-width: 440px; margin-left: auto; margin-right: auto;
        }
        .v2-cta-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .v2-btn {
          padding: 12px 26px; border-radius: 8px; font-size: 14px;
          font-weight: 600; text-decoration: none; transition: all .15s;
        }
        .v2-btn-navy { background: var(--navy); color: var(--white); }
        .v2-btn-navy:hover { background: var(--blue); }
        .v2-btn-ghost {
          border: 1.5px solid var(--border); color: var(--tm); background: var(--white);
        }
        .v2-btn-ghost:hover { border-color: var(--navy); color: var(--navy); }
        @media (max-width: 520px) {
          .v2-cta-btns { flex-direction: column; }
          .v2-btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}

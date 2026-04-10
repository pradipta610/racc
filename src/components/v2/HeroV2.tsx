import Link from "next/link";

const CONSULTATION_URL = "https://www.racc.net.au/migration-agent-education-agent";

export default function HeroV2() {
  return (
    <section className="v2-hero">
      <div className="v2-hero-bg-slot" />
      <div className="v2-hero-inner">
        <h1>
          20 Years of Experience in Helping Apply<br />
          <em>Courses and Visas</em> in Australia
        </h1>
        <p className="v2-hero-sub">Genuine Advice You Can Trust</p>
        <p className="v2-hero-rating"><b>4.8 out of 5</b> Customer Service Satisfaction</p>
        <p className="v2-hero-langs">
          <b>WE SPEAK:</b> English · Bahasa · Mandarin · Cantonese ·<br />
          Tagalog · Malay · Sinhalese · Hindi &amp; Punjabi
        </p>
        <Link href={CONSULTATION_URL} className="v2-hero-cta">Book Consultation</Link>
      </div>

      <style>{`
        .v2-hero {
          position: relative; min-height: 560px;
          display: flex; align-items: center; justify-content: center;
          background: #0B1933;
          overflow: hidden;
        }
        .v2-hero-bg-slot {
          position: absolute; inset: 0;
          background:
            linear-gradient(135deg, rgba(11,25,51,.55) 0%, rgba(28,58,138,.4) 55%, rgba(36,86,160,.35) 100%),
            radial-gradient(ellipse at 25% 65%, rgba(91,163,217,.18) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 25%, rgba(245,197,24,.08) 0%, transparent 45%),
            url('https://static.wixstatic.com/media/a50ebd_18319192d4884e8fac74b4cacf59c3f8~mv2.jpg');
          background-position: center 35%;
          background-size: cover;
        }
        @keyframes v2fu { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .v2-hero-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; padding: 80px 5%; text-align: center; }
        .v2-hero-inner > * { animation: v2fu .5s ease both; }
        .v2-hero-inner > *:nth-child(2) { animation-delay: .07s; }
        .v2-hero-inner > *:nth-child(3) { animation-delay: .14s; }
        .v2-hero-inner > *:nth-child(4) { animation-delay: .21s; }
        .v2-hero-inner > *:nth-child(5) { animation-delay: .28s; }
        .v2-hero-inner > *:nth-child(6) { animation-delay: .34s; }
        .v2-hero h1 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(30px, 5vw, 48px); line-height: 1.15;
          color: var(--white); margin-bottom: 18px; font-weight: 600;
        }
        .v2-hero h1 em { color: var(--yellow); font-style: normal; }
        .v2-hero-sub { font-size: 20px; color: rgba(255,255,255,.8); margin-bottom: 8px; font-weight: 500; }
        .v2-hero-rating { font-size: 17px; color: rgba(255,255,255,.65); margin-bottom: 22px; }
        .v2-hero-rating b { color: var(--yellow); font-weight: 700; }
        .v2-hero-langs { font-size: 15px; color: rgba(255,255,255,.6); line-height: 1.75; margin-bottom: 36px; }
        .v2-hero-langs b { color: rgba(255,255,255,.85); font-weight: 600; }
        .v2-hero-cta {
          display: inline-block; background: #eddb3c; color: var(--navy);
          padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 700;
          text-decoration: none; transition: all .15s;
        }
        .v2-hero-cta:hover {
          background: #e2cf35;
          transform: translateY(-0.5px);
          box-shadow: 0 6px 16px rgba(11, 31, 74, .16);
        }
      `}</style>
    </section>
  );
}

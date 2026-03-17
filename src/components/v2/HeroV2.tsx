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
          Tagalog · Thai · Nepali · Malay · Sinhalese · Vietnamese · Hindi &amp; Punjabi
        </p>
        <Link href={CONSULTATION_URL} className="v2-hero-cta">Book Consultation</Link>
      </div>

      <style>{`
        .v2-hero {
          position: relative; min-height: 560px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #0B1933 0%, #1C3A8A 55%, #2456A0 100%);
          overflow: hidden;
        }
        .v2-hero-bg-slot {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 25% 65%, rgba(91,163,217,.2) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 25%, rgba(245,197,24,.07) 0%, transparent 45%);
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
          font-size: clamp(26px, 4.5vw, 46px); line-height: 1.18;
          color: var(--white); margin-bottom: 14px; font-weight: 600;
        }
        .v2-hero h1 em { color: var(--yellow); font-style: normal; }
        .v2-hero-sub { font-size: 16px; color: rgba(255,255,255,.75); margin-bottom: 6px; }
        .v2-hero-rating { font-size: 14px; color: rgba(255,255,255,.6); margin-bottom: 20px; }
        .v2-hero-rating b { color: var(--yellow); }
        .v2-hero-langs { font-size: 13px; color: rgba(255,255,255,.55); line-height: 1.75; margin-bottom: 32px; }
        .v2-hero-langs b { color: rgba(255,255,255,.8); font-weight: 500; }
        .v2-hero-cta {
          display: inline-block; background: var(--yellow); color: var(--navy);
          padding: 14px 36px; border-radius: 8px; font-size: 15px; font-weight: 700;
          text-decoration: none; transition: all .15s;
        }
        .v2-hero-cta:hover { background: var(--gold); transform: translateY(-1px); }
      `}</style>
    </section>
  );
}

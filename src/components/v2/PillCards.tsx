import Link from "next/link";

interface PillItem {
  label: string;
  href: string;
  image: string;
  tall?: boolean;
}

interface PillCardsProps {
  title: string;
  subtitle: string;
  titleHref: string;
  pills: PillItem[];
}

export default function PillCards({ title, subtitle, titleHref, pills }: PillCardsProps) {
  return (
    <section className="v2-svc-section" style={{ background: "var(--white)", padding: "72px 5%" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="v2-svc-header" style={{ marginBottom: 24 }}>
          <h2 className="v2-svc-title">
            <Link href={titleHref} style={{ textDecoration: "none", color: "inherit" }}>{title}</Link>
          </h2>
          <p style={{ fontSize: 13, color: "var(--tl)" }}>{subtitle}</p>
        </div>

        <div className="v2-pills-grid v2-pills-cols-3">
          {pills.map((p) => (
            <Link
              key={p.href + p.label}
              href={p.href}
              className={`v2-pill-card${p.tall ? " v2-pill-tall" : ""}`}
              style={{ "--pill-bg": `url(${p.image})` } as React.CSSProperties}
            >
              <div className="v2-pill-body">
                <span className="v2-pill-label">{p.label}</span>
                <span className="v2-pill-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link href="https://www.racc.net.au/migration-agent-education-agent" className="v2-svc-cta-btn">
            Book Consultation
          </Link>
        </div>
      </div>

      <style>{`
        .v2-svc-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(20px, 2.5vw, 28px); color: var(--td); font-weight: 600; margin-bottom: 6px;
        }
        .v2-pills-grid { display: grid; gap: 10px; }
        .v2-pills-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .v2-pill-card {
          position: relative; border-radius: 12px; overflow: hidden;
          text-decoration: none; display: flex; align-items: flex-end;
          min-height: 100px; border: 1.5px solid var(--border);
          transition: all .2s; background: var(--light);
        }
        .v2-pill-card:hover {
          border-color: var(--sky); transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(28,58,138,.12);
        }
        .v2-pill-card::before {
          content: ''; position: absolute; inset: 0;
          background: var(--pill-bg, var(--light));
          background-size: cover; background-position: center;
          transition: transform .3s;
        }
        .v2-pill-card:hover::before { transform: scale(1.04); }
        .v2-pill-card::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(11,26,61,.82) 0%, rgba(11,26,61,.45) 50%, rgba(11,26,61,.1) 100%);
          transition: opacity .2s;
        }
        .v2-pill-card:hover::after {
          background: linear-gradient(to top, rgba(11,26,61,.9) 0%, rgba(11,26,61,.5) 50%, rgba(11,26,61,.15) 100%);
        }
        .v2-pill-tall { min-height: 140px; }
        .v2-pill-body {
          position: relative; z-index: 1; width: 100%; padding: 14px 16px;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
        }
        .v2-pill-label { font-size: 13.5px; font-weight: 600; color: var(--white); line-height: 1.3; }
        .v2-pill-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(255,255,255,.15); border: 1px solid rgba(255,255,255,.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--white); flex-shrink: 0; transition: all .2s;
        }
        .v2-pill-card:hover .v2-pill-arrow {
          background: var(--yellow); border-color: var(--yellow); color: var(--navy);
        }
        .v2-svc-cta-btn {
          display: inline-block; padding: 13px 32px; border-radius: 8px;
          font-size: 14px; font-weight: 700; text-decoration: none; transition: all .15s;
          background: var(--navy); color: var(--white);
        }
        .v2-svc-cta-btn:hover { background: var(--blue); }
        @media (max-width: 900px) {
          .v2-pills-cols-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .v2-pills-cols-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

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
          <p style={{ fontSize: 16, color: "var(--tl)", lineHeight: 1.6 }}>{subtitle}</p>
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
          font-size: clamp(26px, 3vw, 38px); color: var(--td); font-weight: 600; margin-bottom: 8px;
        }
        .v2-pills-grid { display: grid; gap: 10px; }
        .v2-pills-cols-3 { grid-template-columns: repeat(3, 1fr); }
        .v2-pill-card {
          position: relative; border-radius: 14px; overflow: hidden;
          text-decoration: none; display: flex; align-items: center;
          min-height: 72px;
          background: rgba(255,255,255,.65);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,.7);
          box-shadow: 0 2px 12px rgba(28,58,138,.06), 0 1px 3px rgba(0,0,0,.04);
          transition: all .25s ease;
        }
        .v2-pill-card:hover {
          border-color: var(--sky); transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(28,58,138,.12), 0 2px 6px rgba(0,0,0,.06);
          background: rgba(255,255,255,.85);
        }
        .v2-pill-tall { min-height: 80px; }
        .v2-pill-body {
          position: relative; z-index: 1; width: 100%; padding: 16px 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }
        .v2-pill-label { font-size: 15px; font-weight: 600; color: var(--navy); line-height: 1.3; }
        .v2-pill-arrow {
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--light); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; color: var(--navy); flex-shrink: 0; transition: all .2s;
        }
        .v2-pill-card:hover .v2-pill-arrow {
          background: var(--navy); border-color: var(--navy); color: var(--white);
        }
        .v2-svc-cta-btn {
          display: inline-block; padding: 14px 36px; border-radius: 8px;
          font-size: 16px; font-weight: 700; text-decoration: none; transition: all .15s;
          background: #eddb3c; color: var(--navy);
        }
        .v2-svc-cta-btn:hover {
          background: #e2cf35;
          transform: translateY(-0.5px);
          box-shadow: 0 6px 16px rgba(11, 31, 74, .16);
        }
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

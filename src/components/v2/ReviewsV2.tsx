import Link from "next/link";
import { V2_REVIEWS } from "@/lib/data";

export default function ReviewsV2() {
  return (
    <section className="v2-reviews-sec">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 className="v2-rv-title">
          <Link href="https://www.racc.net.au/client-reviews" style={{ textDecoration: "none", color: "inherit" }}>
            CLIENT REVIEWS
          </Link>
        </h2>

        <div className="v2-reviews-grid">
          {V2_REVIEWS.map((r) => (
            <div key={r.name} className="v2-rv">
              <div className="v2-rv-q">&ldquo;</div>
              <div className="v2-rv-stars">★★★★★</div>
              <p className="v2-rv-text">{r.text}</p>
              <div className="v2-rv-foot">
                <div className="v2-rv-av">{r.initials}</div>
                <div>
                  <div className="v2-rv-name">{r.name}</div>
                  <div className="v2-rv-from">{r.from}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="https://www.racc.net.au/client-reviews" className="v2-rv-all-link">
            See all client reviews →
          </Link>
        </div>
      </div>

      <style>{`
        .v2-reviews-sec { background: var(--off); padding: 72px 5%; }
        .v2-rv-title {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: clamp(26px, 3vw, 38px); color: var(--td); font-weight: 600; margin-bottom: 8px;
        }
        .v2-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 32px; }
        .v2-rv {
          border: 1.5px solid var(--border); border-radius: 12px;
          padding: 20px; background: var(--white); transition: all .2s; position: relative;
        }
        .v2-rv:hover { border-color: var(--sky); box-shadow: 0 6px 20px rgba(28,58,138,.08); transform: translateY(-2px); }
        .v2-rv-q {
          position: absolute; top: 12px; right: 14px;
          font-size: 44px; line-height: 1; color: var(--light);
          font-family: var(--font-playfair), 'Playfair Display', serif; pointer-events: none;
        }
        .v2-rv-stars { color: var(--yellow); font-size: 15px; letter-spacing: 1.5px; margin-bottom: 10px; }
        .v2-rv-text { font-size: 14px; color: var(--tm); line-height: 1.7; font-style: italic; margin-bottom: 14px; }
        .v2-rv-foot {
          display: flex; align-items: center; gap: 9px;
          padding-top: 10px; border-top: 1px solid var(--border);
        }
        .v2-rv-av {
          width: 36px; height: 36px; border-radius: 50%; background: var(--navy);
          color: var(--white); display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .v2-rv-name { font-size: 14px; font-weight: 600; color: var(--td); }
        .v2-rv-from { font-size: 12px; color: var(--tl); }
        .v2-rv-all-link {
          font-size: 15px; font-weight: 600; color: var(--navy); text-decoration: none;
          border-bottom: 1.5px solid var(--yellow); padding-bottom: 2px; transition: color .15s;
        }
        .v2-rv-all-link:hover { color: var(--blue); }
        @media (max-width: 768px) {
          .v2-reviews-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .v2-reviews-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

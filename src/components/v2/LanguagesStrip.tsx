import { V2_LANGUAGES } from "@/lib/data";

export default function LanguagesStrip() {
  return (
    <div className="v2-langs-strip">
      <h3>WE SPEAK</h3>
      <p>Our multilingual team is here to help you in your own language</p>
      <div className="v2-lang-pills">
        {V2_LANGUAGES.map((lang) => (
          <span key={lang} className="v2-lang-pill">{lang}</span>
        ))}
      </div>

      <style>{`
        .v2-langs-strip { background: var(--navy); padding: 40px 5%; text-align: center; }
        .v2-langs-strip h3 {
          font-family: var(--font-playfair), 'Playfair Display', serif;
          font-size: 20px; font-weight: 600; color: var(--white); margin-bottom: 6px;
        }
        .v2-langs-strip p { font-size: 13px; color: rgba(255,255,255,.5); margin-bottom: 20px; }
        .v2-lang-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .v2-lang-pill {
          background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.78); font-size: 12.5px; padding: 6px 14px;
          border-radius: 20px; transition: all .15s;
        }
        .v2-lang-pill:hover { background: rgba(255,255,255,.14); }
      `}</style>
    </div>
  );
}

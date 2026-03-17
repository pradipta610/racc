import Image from "next/image";

const HIGHLIGHTS = [
  "Prepare & lodge your visa application",
  "Police Check preparation",
  "Insurance & Medical Checkup advice",
  "Apply from inside or outside Australia",
  "Skilled Migration (189, 190, 491)",
  "Student & Graduate Visas",
  "Employer Sponsored (482, 186)",
  "Diploma, Bachelor & Master Courses",
];

export default function Intro() {
  return (
    <section style={{ padding: "76px 5%", background: "var(--white)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
          className="intro-grid">

          <div>
            <h2 style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: 31, color: "var(--td)", marginBottom: 14, lineHeight: 1.3,
            }}>
              Genuine Advice for Your Migration &amp; Education Journey
            </h2>
            <p style={{
              fontSize: 15, color: "var(--tm)", lineHeight: 1.8, marginBottom: 12,
              borderLeft: "3px solid var(--yellow)", paddingLeft: 14, fontStyle: "italic",
            }}>
              Small careless mistakes may result in visa rejection. Booking a FREE consultation with our Registered Migration Agents ensures your application is done right — without the headaches.
            </p>
            <p style={{ fontSize: 15, color: "var(--tm)", lineHeight: 1.8 }}>
              RACC Australia is a registered migration agency and education consultancy based in Melbourne, VIC. For over 20 years we have helped international students, skilled workers, and families navigate the Australian visa system with confidence.
            </p>
          </div>

          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20, boxShadow: "0 8px 24px rgba(28,58,138,.08)" }}>
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80"
              alt="RACC consultation meeting — developer: replace with real team photo"
              width={560}
              height={300}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="hi-grid">
            {HIGHLIGHTS.map((h) => (
              <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)",
                  marginTop: 5, flexShrink: 0,
                }} />
                <p style={{ fontSize: 13, color: "var(--tm)" }}>{h}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intro-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hi-grid    { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

import NavbarV2 from "@/components/v2/NavbarV2";
import HeroV2 from "@/components/v2/HeroV2";
import PillCards from "@/components/v2/PillCards";
import ReviewsV2 from "@/components/v2/ReviewsV2";
import CTAV2 from "@/components/v2/CTAV2";
import Footer from "@/components/Footer";
import { V2_EDU_PILLS, V2_MIG_PILLS } from "@/lib/data";

export function RaccHomepage({ employer = false }: { employer?: boolean }) {
  return (
    <div className="v3-page">
      <NavbarV2 />
      <main>
        <HeroV2 brandName="RACC Australia" concise combined={employer} />
        <aside className="v3-language-bar" aria-label="Languages spoken by the RACC team">
          <div className="v3-language-inner">
            <strong>WE SPEAK:</strong>
            <span>English · Bahasa · Mandarin · Cantonese · Tagalog · Malay · Sinhalese · Hindi &amp; Punjabi</span>
          </div>
        </aside>
        <section className="v3-trust-strip" aria-label="RACC credentials">
          <div className="v3-trust-inner">
            <div className="v3-trust-item"><strong>20+</strong><span>Years of Experience</span></div>
            <div className="v3-trust-item"><strong>MARN</strong><span>Registered Migration Agent</span></div>
            <div className="v3-trust-item"><strong>4.8/5</strong><span>Client Satisfaction</span></div>
            <div className="v3-trust-item"><strong>9</strong><span>Languages Spoken</span></div>
          </div>
        </section>
        {employer && (
          <section className="v4-audience">
            <div className="v4-section-heading">
              <span>ONE TRUSTED ADVISORY TEAM</span>
              <h2>How Can We Help You?</h2>
              <p>Choose the pathway that best describes what you need today.</p>
            </div>
            <div className="v4-audience-grid">
              <Link href="#individual-services" className="v4-audience-card">
                <small>FOR INDIVIDUALS</small>
                <h3>Study, migrate or bring your family to Australia</h3>
                <p>Education pathways, skilled migration, family visas and personal visa strategy.</p>
                <strong>Explore individual services →</strong>
              </Link>
              <Link href="#employer-services" className="v4-audience-card v4-audience-employer">
                <small>FOR EMPLOYERS</small>
                <h3>Build and manage your skilled workforce</h3>
                <p>Sponsorship strategy, visa management, workforce planning and compliance support.</p>
                <strong>Explore employer solutions →</strong>
              </Link>
            </div>
          </section>
        )}
        <div id="individual-services">
        <PillCards
          title="EDUCATION SERVICES"
          subtitle="Click a service to read more"
          titleHref="https://www.racc.net.au/education-services"
          pills={V2_EDU_PILLS}
        />
        <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: 0 }} />
        <PillCards
          title="MIGRATION SERVICES"
          subtitle="Click a service to read more"
          titleHref="https://www.racc.net.au/migration-services"
          pills={V2_MIG_PILLS}
        />
        </div>
        {employer && (
          <section className="v4-employer" id="employer-services">
            <div className="v4-section-heading v4-section-heading-light">
              <span>WORKFORCE SOLUTIONS FOR AUSTRALIAN EMPLOYERS</span>
              <h2>Secure Global Talent. Stay Compliant. Keep Growing.</h2>
              <p>RACC helps Australian organisations plan, sponsor and manage international talent through a clear, compliance-driven framework.</p>
            </div>
            <div className="v4-employer-grid">
              <Link href="https://www.racc.net.au/workforce-solutions" className="v4-employer-card">
                <b>01</b><h3>Workforce Strategy</h3>
                <p>Align skilled migration pathways with immediate vacancies and long-term workforce needs.</p>
              </Link>
              <Link href="https://www.racc.net.au/visa-management-for-employers" className="v4-employer-card">
                <b>02</b><h3>Visa Management</h3>
                <p>Coordinate sponsorship, nomination and visa applications across the employee lifecycle.</p>
              </Link>
              <Link href="https://www.racc.net.au/visa-management-for-employers" className="v4-employer-card">
                <b>03</b><h3>Compliance & Risk</h3>
                <p>Maintain sponsor obligations, accurate records and defensible migration processes.</p>
              </Link>
              <Link href="https://www.racc.net.au/workforce-solutions" className="v4-employer-card">
                <b>04</b><h3>Labour Agreements</h3>
                <p>Explore industry, regional and company-specific frameworks for specialised workforce gaps.</p>
              </Link>
            </div>
            <div className="v4-industries">
              <strong>SECTORS WE SUPPORT</strong>
              <span>Healthcare & Aged Care</span><span>Childcare & Education</span>
              <span>Hospitality</span><span>Construction & Engineering</span><span>Agribusiness</span>
            </div>
            <div className="v4-employer-actions">
              <Link href="https://www.racc.net.au/workforce-solutions" className="v4-primary-link">Explore Workforce Solutions</Link>
              <Link href="https://www.racc.net.au/visa-management-for-employers" className="v4-secondary-link">Visa Management for Employers</Link>
            </div>
          </section>
        )}
        <ReviewsV2 />
        <CTAV2 />
      </main>
      <Footer />

      <style>{`
        .v3-page {
          --v3-avenir-heavy: avenir-lt-w01_85-heavy1475544, "Avenir Next", Avenir, "Helvetica Neue", sans-serif;
          --v3-avenir-medium: avenir-lt-w01_65-medium1475532, "Avenir Next", Avenir, "Helvetica Neue", sans-serif;
          --v3-avenir-regular: avenir-lt-w01_35-light1475496, "Avenir Next", Avenir, "Helvetica Neue", sans-serif;
          font-family: var(--v3-avenir-regular);
          font-style: normal;
          font-variant: normal;
        }

        .v3-page main h1,
        .v3-page main h2,
        .v3-page main h3 {
          font-family: var(--v3-avenir-heavy);
          font-style: normal;
          font-variant: normal;
          font-weight: bold;
          font-size: 38px;
          line-height: 1.6em;
        }

        .v3-page nav,
        .v3-page footer,
        .v3-page p,
        .v3-page a,
        .v3-page span,
        .v3-page button {
          font-family: var(--v3-avenir-regular);
        }

        .v3-page b,
        .v3-page strong,
        .v3-page button,
        .v3-page [class*="cta"],
        .v3-page [class*="label"] {
          font-family: var(--v3-avenir-medium);
        }

        .v3-page .v2-hero {
          min-height: 620px;
          justify-content: center;
          border-bottom: 6px solid var(--yellow);
        }

        .v3-page .v2-hero-bg-slot {
          background:
            linear-gradient(90deg, rgba(11,25,51,.78), rgba(11,25,51,.58), rgba(11,25,51,.78)),
            url('https://static.wixstatic.com/media/a50ebd_18319192d4884e8fac74b4cacf59c3f8~mv2.jpg');
          background-position: center 35%;
          background-size: cover;
        }

        .v3-page .v2-hero-inner {
          width: 100%; max-width: 1180px; margin: 0 auto;
          padding: 90px 5%; text-align: center;
        }

        .v3-page .v2-hero h1 {
          max-width: 900px; font-size: 56px; line-height: 1.14em;
          letter-spacing: -.02em; margin: 0 auto 20px;
        }

        .v3-page .v2-hero-brand {
          display: inline-block; color: var(--yellow);
          font-size: 16px; line-height: 1.2;
          letter-spacing: .16em; text-transform: uppercase;
          margin-bottom: 18px;
        }

        .v3-page .v2-hero-sub {
          max-width: 620px; margin-left: auto; margin-right: auto;
          font-size: 23px; line-height: 1.4; color: #fff;
          font-family: var(--v3-avenir-medium);
          letter-spacing: .01em;
        }

        .v3-page .v2-hero-rating,
        .v3-page .v2-hero-langs { max-width: 610px; margin-left: auto; margin-right: auto; }

        .v3-page .v2-hero-rating {
          display: inline-block; margin-top: 8px; margin-bottom: 30px;
          padding: 7px 12px; border: 1px solid rgba(255,255,255,.24);
          font-size: 14px; letter-spacing: .01em;
        }

        @keyframes v3-bar-enter {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .v3-language-bar {
          position: relative; z-index: 2; background: #12295f;
          border-bottom: 1px solid rgba(255,255,255,.12);
          padding: 15px 5%; animation: v3-bar-enter .55s ease .2s both;
        }

        .v3-language-inner {
          max-width: 1100px; margin: 0 auto;
          display: flex; align-items: center; justify-content: center;
          gap: 12px; text-align: center;
        }

        .v3-language-inner strong {
          flex-shrink: 0; color: var(--yellow);
          font-family: var(--v3-avenir-heavy);
          font-size: 13px; letter-spacing: .1em;
        }

        .v3-language-inner span {
          color: rgba(255,255,255,.82);
          font-size: 14px; line-height: 1.5;
        }

        .v3-page .v2-hero-cta,
        .v3-page .v2-svc-cta-btn {
          border-radius: 4px; padding: 15px 34px;
          border: 2px solid var(--yellow); box-shadow: none;
        }

        .v3-trust-strip {
          background: var(--white); border-bottom: 1px solid var(--border);
          padding: 30px 5%;
        }

        .v3-trust-inner {
          max-width: 1100px; margin: 0 auto; display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .v3-trust-item {
          min-height: 82px; padding: 8px 24px;
          display: flex; flex-direction: column; justify-content: center;
          border-right: 1px solid var(--border);
        }

        .v3-trust-item:first-child { padding-left: 0; }
        .v3-trust-item:last-child { border-right: 0; }
        .v3-trust-item strong {
          color: var(--navy); font-family: var(--v3-avenir-heavy);
          font-size: 30px; line-height: 1.1; margin-bottom: 7px;
        }
        .v3-trust-item span { color: var(--tm); font-size: 14px; line-height: 1.35; }

        .v3-page .v2-svc-section,
        .v3-page .v2-reviews-sec {
          padding-top: 80px !important; padding-bottom: 80px !important;
        }

        .v3-page .v2-svc-title,
        .v3-page .v2-rv-title {
          letter-spacing: -.01em; line-height: 1.3em;
        }

        .v3-page .v2-svc-title::after,
        .v3-page .v2-rv-title::after {
          content: ""; display: block; width: 68px; height: 5px;
          margin-top: 10px; background: var(--yellow);
        }

        .v3-page .v2-pills-grid { gap: 16px; }
        .v3-page .v2-pill-card {
          min-height: 94px; border: 1px solid #cbd5e5;
          border-left: 5px solid var(--navy); border-radius: 4px;
          background: var(--white); backdrop-filter: none; box-shadow: none;
        }
        .v3-page .v2-pill-card:hover {
          border-color: var(--navy); border-left-color: var(--yellow);
          background: var(--light); transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(15,30,69,.1);
        }
        .v3-page .v2-pill-label {
          font-family: var(--v3-avenir-medium); font-size: 17px;
        }
        .v3-page .v2-pill-arrow { border-radius: 3px; }

        .v3-page .v2-rv {
          border: 1px solid #cbd5e5; border-radius: 4px;
          border-top: 5px solid var(--navy); padding: 26px; box-shadow: none;
        }

        .v3-page .v2-langs-strip {
          border-top: 6px solid var(--yellow);
          padding-top: 52px; padding-bottom: 52px;
        }
        .v3-page .v2-langs-strip h3 { font-size: 38px; line-height: 1.3em; }
        .v3-page .v2-lang-pill { border-radius: 3px; padding: 10px 18px; }

        .v3-page .v2-cta-banner { padding-top: 72px; padding-bottom: 72px; }
        .v3-page .v2-btn { border-radius: 4px; padding: 15px 30px; }

        .v4-audience { padding: 84px 5%; background: var(--off); }
        .v4-section-heading { max-width: 820px; margin: 0 auto 36px; text-align: center; }
        .v4-section-heading > span {
          color: var(--blue); font-family: var(--v3-avenir-heavy);
          font-size: 13px; letter-spacing: .12em;
        }
        .v4-section-heading h2 { margin: 8px 0; line-height: 1.25em !important; }
        .v4-section-heading p { color: var(--tm); font-size: 17px; line-height: 1.65; }
        .v4-audience-grid {
          max-width: 1100px; margin: 0 auto; display: grid;
          grid-template-columns: 1fr 1fr; gap: 18px;
        }
        .v4-audience-card {
          min-height: 290px; padding: 38px; background: #fff;
          border: 1px solid #cbd5e5; border-top: 6px solid var(--navy);
          border-radius: 4px; color: var(--td); text-decoration: none;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .v4-audience-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(15,30,69,.12); }
        .v4-audience-card small { color: var(--blue); font-weight: 700; letter-spacing: .1em; }
        .v4-audience-card h3 { margin: 15px 0 10px; font-size: 29px !important; line-height: 1.3em !important; }
        .v4-audience-card p { color: var(--tm); font-size: 16px; line-height: 1.65; margin-bottom: 26px; }
        .v4-audience-card strong { color: var(--navy); font-size: 15px; }
        .v4-audience-employer {
          background: var(--navy); border-color: var(--navy);
          border-top-color: var(--yellow); color: #fff;
        }
        .v4-audience-employer small, .v4-audience-employer strong { color: var(--yellow); }
        .v4-audience-employer p { color: rgba(255,255,255,.72); }

        .v4-employer { padding: 88px 5%; background: #0f1e45; border-top: 6px solid var(--yellow); }
        .v4-section-heading-light h2 { color: #fff; }
        .v4-section-heading-light > span { color: var(--yellow); }
        .v4-section-heading-light p { color: rgba(255,255,255,.68); }
        .v4-employer-grid {
          max-width: 1100px; margin: 0 auto; display: grid;
          grid-template-columns: repeat(4,1fr); border: 1px solid rgba(255,255,255,.18);
        }
        .v4-employer-card {
          min-height: 275px; padding: 30px 24px; color: #fff; text-decoration: none;
          border-right: 1px solid rgba(255,255,255,.18); transition: background .2s ease;
        }
        .v4-employer-card:last-child { border-right: 0; }
        .v4-employer-card:hover { background: rgba(255,255,255,.07); }
        .v4-employer-card b { color: var(--yellow); font-size: 14px; }
        .v4-employer-card h3 { margin: 18px 0 10px; font-size: 23px !important; line-height: 1.3em !important; }
        .v4-employer-card p { color: rgba(255,255,255,.65); font-size: 15px; line-height: 1.65; }
        .v4-industries {
          max-width: 1100px; margin: 30px auto 0; display: flex; flex-wrap: wrap;
          align-items: center; justify-content: center; gap: 9px;
        }
        .v4-industries strong { color: var(--yellow); font-size: 12px; letter-spacing: .1em; margin-right: 8px; }
        .v4-industries span {
          padding: 8px 13px; border: 1px solid rgba(255,255,255,.22);
          border-radius: 3px; color: rgba(255,255,255,.78); font-size: 13px;
        }
        .v4-employer-actions { margin-top: 34px; display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .v4-employer-actions a { padding: 14px 24px; border-radius: 4px; font-weight: 700; text-decoration: none; }
        .v4-primary-link { background: var(--yellow); color: var(--navy); }
        .v4-secondary-link { color: #fff; border: 1px solid rgba(255,255,255,.45); }

        @media (max-width: 640px) {
          .v3-page main h1,
          .v3-page main h2,
          .v3-page main h3 {
            font-size: 30px;
            line-height: 1.35em;
          }

          .v3-page .v2-hero { min-height: 580px; }
          .v3-page .v2-hero-bg-slot {
            background:
              linear-gradient(90deg, rgba(11,25,51,.94), rgba(11,25,51,.74)),
              url('https://static.wixstatic.com/media/a50ebd_18319192d4884e8fac74b4cacf59c3f8~mv2.jpg');
            background-position: 62% center; background-size: cover;
          }
          .v3-page .v2-hero-inner { padding: 72px 6%; }
          .v3-page .v2-hero h1 { font-size: 40px; line-height: 1.16em; }
          .v3-page .v2-hero-brand { font-size: 13px; margin-bottom: 14px; }
          .v3-page .v2-hero-sub { font-size: 20px; }

          .v3-language-inner {
            flex-direction: column; gap: 5px;
          }
          .v3-language-bar { padding-top: 13px; padding-bottom: 13px; }

          .v3-trust-inner { grid-template-columns: 1fr 1fr; }
          .v3-trust-item,
          .v3-trust-item:first-child {
            padding: 18px 14px; border-right: 1px solid var(--border);
            border-bottom: 1px solid var(--border);
          }
          .v3-trust-item:nth-child(2n) { border-right: 0; }
          .v3-trust-item:nth-last-child(-n + 2) { border-bottom: 0; }
          .v3-trust-item strong { font-size: 25px; }
          .v4-audience-grid, .v4-employer-grid { grid-template-columns: 1fr; }
          .v4-audience-card { min-height: auto; padding: 28px 24px; }
          .v4-employer-card {
            min-height: auto; border-right: 0;
            border-bottom: 1px solid rgba(255,255,255,.18);
          }
          .v4-employer-card:last-child { border-bottom: 0; }
        }
      `}</style>
    </div>
  );
}

export default function HomePageV3() {
  return <RaccHomepage />;
}
import Link from "next/link";

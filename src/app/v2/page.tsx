import NavbarV2 from "@/components/v2/NavbarV2";
import HeroV2 from "@/components/v2/HeroV2";
import PillCards from "@/components/v2/PillCards";
import ReviewsV2 from "@/components/v2/ReviewsV2";
import LanguagesStrip from "@/components/v2/LanguagesStrip";
import CTAV2 from "@/components/v2/CTAV2";
import Footer from "@/components/Footer";
import { V2_EDU_PILLS, V2_MIG_PILLS } from "@/lib/data";

export default function HomePageV2() {
  return (
    <>
      <NavbarV2 />
      <main>
        <HeroV2 />
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
        <ReviewsV2 />
        <LanguagesStrip />
        <CTAV2 />
      </main>
      <Footer />
    </>
  );
}

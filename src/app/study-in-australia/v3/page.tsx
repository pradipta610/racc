import type { Metadata } from "next";
import Footer from "@/components/Footer";
import EduNav from "@/components/education/EduNav";
import EduV3 from "@/components/education/v3/EduV3";
import { V3_LINKS } from "@/components/education/v3/v3Data";

export const metadata: Metadata = {
  title: "Study in Australia – Free Study Plan, Intakes & Student Visa Help | RACC",
  description:
    "Plan your studies in Australia with RACC: free course applications, registered migration agents in-house, advice in 12+ languages and clear timelines for the next February and July intakes.",
};

export default function StudyInAustraliaV3Page() {
  return (
    <>
      <EduNav links={V3_LINKS} ctaLabel="Get a free plan" ctaHref="#plan-form" />
      <main id="top">
        <EduV3 />
      </main>
      <Footer />
    </>
  );
}

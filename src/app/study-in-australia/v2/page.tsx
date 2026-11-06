import type { Metadata } from "next";
import Footer from "@/components/Footer";
import EduNav from "@/components/education/EduNav";
import EduV2 from "@/components/education/v2/EduV2";
import { V2_LINKS } from "@/components/education/v2/v2Data";

export const metadata: Metadata = {
  title: "Study in Australia – Build Your Study Plan in 30 Seconds | RACC",
  description:
    "Not sure where to start? Build a personal study plan for Australia: course route, study time, rough yearly costs and your next intake. Then check it with a RACC advisor for free.",
};

export default function StudyInAustraliaV2Page() {
  return (
    <>
      <EduNav links={V2_LINKS} ctaLabel="Talk to an advisor" />
      <main id="top">
        <EduV2 />
      </main>
      <Footer />
    </>
  );
}

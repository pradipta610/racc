import type { Metadata } from "next";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import EduNav from "@/components/education/EduNav";
import EduLanding from "@/components/education/EduLanding";

export const metadata: Metadata = {
  title: "Study in Australia – Courses, Cities, Costs & Pathways | RACC",
  description:
    "Your complete guide to studying in Australia: pick a pathway, explore courses and cities, see costs and intakes, and get help with your student visa 500 from RACC.",
};

export default function StudyInAustraliaPage() {
  return (
    <>
      <EduNav />
      <main id="top">
        <EduLanding />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

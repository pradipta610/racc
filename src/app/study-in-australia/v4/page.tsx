import type { Metadata } from "next";
import Footer from "@/components/Footer";
import EduV4 from "@/components/education/v4/EduV4";

export const metadata: Metadata = {
  title: "Study in Australia – Free Consultation | RACC",
  description:
    "Want to study in Australia? RACC handles your course, application and student visa. One team, advice in 12+ languages, and your first consultation is free.",
};

export default function StudyInAustraliaV4Page() {
  return (
    <>
      <EduV4 />
      <Footer />
    </>
  );
}

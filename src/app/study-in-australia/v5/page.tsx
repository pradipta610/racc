import type { Metadata } from "next";
import EduNav from "@/components/education/EduNav";
import EduV5 from "@/components/education/v5/EduV5";
import EduFooter from "@/components/education/v5/EduFooter";
import { V5_LINKS } from "@/components/education/v5/v5Data";

export const metadata: Metadata = {
  title: "RACC – Honest Study Advice for Students Coming to Australia",
  description:
    "Melbourne education agency: course advice, free course applications and student visas prepared by registered agents (MARN 1572961, 1172003). 4.8 on Google, advice in 12+ languages. Get a free profile check.",
};

export default function StudyInAustraliaV5Page() {
  return (
    <>
      <EduNav links={V5_LINKS} ctaLabel="Free profile check" ctaHref="#check" />
      <main id="top">
        <EduV5 />
      </main>
      <EduFooter />
    </>
  );
}

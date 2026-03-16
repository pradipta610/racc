import type { Metadata } from "next";
import BrandCover from "@/components/brand/BrandCover";
import BrandSidebar from "@/components/brand/BrandSidebar";
import BrandColours from "@/components/brand/BrandColours";
import BrandTypography from "@/components/brand/BrandTypography";
import BrandLogo from "@/components/brand/BrandLogo";
import BrandSpacing from "@/components/brand/BrandSpacing";
import BrandComponents from "@/components/brand/BrandComponents";
import BrandIcons from "@/components/brand/BrandIcons";
import BrandVoice from "@/components/brand/BrandVoice";
import BrandPhotography from "@/components/brand/BrandPhotography";
import BrandDoDont from "@/components/brand/BrandDoDont";
import BrandGuideFooter from "@/components/brand/BrandGuideFooter";

export const metadata: Metadata = {
  title: "Brand Guidelines — RACC Australia",
  description: "RACC Australia brand guidelines: colours, typography, logo usage, spacing, components, voice, and usage rules.",
};

export default function BrandGuidelinesPage() {
  return (
    <>
      <BrandCover />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", minHeight: "100vh" }} className="brand-layout">
        <BrandSidebar />
        <main style={{ padding: 0 }}>
          <BrandColours />
          <BrandTypography />
          <BrandLogo />
          <BrandSpacing />
          <BrandComponents />
          <BrandIcons />
          <BrandVoice />
          <BrandPhotography />
          <BrandDoDont />
          <BrandGuideFooter />
        </main>
      </div>
      <style>{`
        @media(max-width:900px){
          .brand-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

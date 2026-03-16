import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumb from "@/components/migration/Breadcrumb";
import PageHero from "@/components/migration/PageHero";
import VisaCategories from "@/components/migration/VisaCategories";
import WhyStrip from "@/components/migration/WhyStrip";
import VisaTable from "@/components/migration/VisaTable";
import MigProcess from "@/components/migration/MigProcess";
import MigFAQ from "@/components/migration/MigFAQ";

export const metadata: Metadata = {
  title: "Migration Services Australia – Skilled, Family & Employer Sponsored Visas | RACC",
  description:
    "RACC Australia offers expert migration services including skilled migration (189, 190, 491), employer sponsored visas (482, 186), family visas, visitor visas and more. Registered migration agents in Melbourne.",
};

export default function MigrationServicesPage() {
  return (
    <>
      <Navbar activePage="migration" />
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "https://www.racc.net.au" },
          { label: "Migration Services" },
        ]}
      />
      <main>
        <PageHero />
        <VisaCategories />
        <WhyStrip />
        <VisaTable />
        <MigProcess />
        <MigFAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

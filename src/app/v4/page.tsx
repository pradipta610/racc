import type { Metadata } from "next";
import { RaccHomepage } from "@/app/v3/page";

export const metadata: Metadata = {
  title: "RACC Australia | Migration, Education & Workforce Solutions",
  description:
    "RACC Australia provides migration and education services for individuals, plus workforce strategy, employer sponsorship, visa management and compliance support for Australian businesses.",
};

export default function HomePageV4() {
  return <RaccHomepage employer />;
}

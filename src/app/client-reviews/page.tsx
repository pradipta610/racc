import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Breadcrumb from "@/components/migration/Breadcrumb";
import ReviewsHero from "@/components/reviews/ReviewsHero";
import QuoteStrip from "@/components/reviews/QuoteStrip";
import ReviewsGrid from "@/components/reviews/ReviewsGrid";
import GoogleRating from "@/components/reviews/GoogleRating";

export const metadata: Metadata = {
  title: "Client Reviews – RACC Australia Migration & Education Agent",
  description:
    "Read real client reviews from RACC Australia. 4.9/5 customer satisfaction from clients across Indonesia, India, Philippines, Vietnam, Hong Kong, Spain and more.",
};

export default function ClientReviewsPage() {
  return (
    <>
      <Navbar activePage="reviews" />
      <Breadcrumb
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Client Reviews" },
        ]}
      />
      <main>
        <ReviewsHero />
        <QuoteStrip />
        <ReviewsGrid />
        <GoogleRating />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

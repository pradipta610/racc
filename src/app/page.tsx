import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import WhyRacc from "@/components/WhyRacc";
import Process from "@/components/Process";
import PopularLinks from "@/components/PopularLinks";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Intro />
        <Services />
        <WhyRacc />
        <Process />
        <PopularLinks />
        <Blog />
        <FAQ />
        <Reviews />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

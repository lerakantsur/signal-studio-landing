import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import MacbookScene from "@/components/MacbookScene";
import BeFirst from "@/components/BeFirst";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <WhyUs />
      <HowItWorks />
      <MacbookScene />
      <BeFirst />
      <Contact />
      <Footer />
    </>
  );
}

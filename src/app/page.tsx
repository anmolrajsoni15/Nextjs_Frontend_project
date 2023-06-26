import React from "react";
import CTA from "./components/ui/CTA"
import FAQs from "./components/ui/FAQs";
// import Features from "./components/ui/Features";
// import Hero from "./components/ui/Hero";
import Pricing from "./components/ui/Pricing";
import Globe from "./components/ui/Globe";
import Hero from './components/v2/Hero';
import Middle from './components/v2/Middle';
import Features from './components/v2/Features';
import Team from './components/ui/Team';
// import Navbar from "./components/ui/Navbar/Navbar";
import Navbar from "./components/landing_page/Navbar"
import Footer from "./components/ui/Footer/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white ">
      <Navbar />
      <Hero />
      <Middle />
      <Features />
      <Pricing />
      <FAQs />
      {/* <Globe /> */}
      <Team />
      <Footer />

    </div>
  );
}
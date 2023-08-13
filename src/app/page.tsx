import React from "react";
import CTA from "./components/ui/CTA"
import FAQs from "./components/ui/FAQs";
// import Features from "./components/ui/Features";
// import Hero from "./components/ui/Hero";
import Pricing from "./components/ui/Pricing";
import Hero from './components/v2/Hero';
import Middle from './components/v2/Middle';
import Features from './components/v2/Features';
import Team from './components/ui/Team';
// import Navbar from "./components/ui/Navbar/Navbar";
// import Navbar from "./components/landing_page/Navbar"
import NewNavbar from "./components/common/NewNavbar";
import Footer from "./components/ui/Footer/Footer";
import Sponser from "./components/v2/Sponser";

export default function Home() {
  return (
    <div className="bg-[#121212] text-[#ffffffcc] ">
      <div className="px-[4%] md:px-[7%]">
      <NewNavbar />
      </div>
      <Hero />
      <Sponser />
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
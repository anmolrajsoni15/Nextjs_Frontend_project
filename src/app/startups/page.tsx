import React from "react";
import Header from "../components/landing_page/Header";
import BlocDemo from "../components/landing_page/BlocDemo";
import Features from "../components/landing_page/Features";
import VidoSec from "../components/landing_page/VideoSec";
import Bottom from "../components/landing_page/Bottom";

const featuresData = [
  {
    icon: "/icons/icon4.png",
    title: "One Stop Solution",
    desc: "With an internal knowledge base chatbot your entire company can find up-to-date information in one place.",
  },
  {
    icon: "/icons/icon1.png",
    title: "Faster Employee Training an onboarding",
    desc: "Bloc can fast track new employee training and allow new starters to become more effective more quickly. Now everything they want to know, related to the product, the tech or the policies is just a question away.",
  },
  {
    icon: "/icons/icon2.png",
    title: "Optimised Inventory Management",
    desc: "Optimize inventory management by providing real-time access to inventory data. Teams can inquire about stock availability. Managers can find information quicker, reduce the risk of stockouts.",
  },
];

function startupPage() {
  return (
    <main className="flex flex-col items-center w-full justify-center gap-[90px] py-8">
      <Header
        initial={"Founders & Managers"}
        Heading={
          <span>
            Supercharge Your{" "}
            <span className="text-primary">Startup’s Knowledge</span> Management!
          </span>
        }
        Subheading={
          "Revolutionize your employee experience with Bloc. Empower your team with instant access to information through chat, transforming the way knowledge flows."
        }
      />
      <BlocDemo
        Heading={
          <span>
            Revolutionize Internal <span className="text-primary">Team Communication</span>
          </span>
        }
        Subheading={
          <span>
            Not just knowledge-sharing, improve{" "}
            <span className="text-white">
            cross team collaboration Bloc will improve the visibility of what other teams{" "}
            </span>{" "}
            are doing, leading to better understanding, greater collaboration and new perspectives.
          </span>
        }
        BotName={"StartUp Bot"}
      />
      <Features featuresData={featuresData} />
      <VidoSec />
      <Bottom />
    </main>
  );
}

export default startupPage;

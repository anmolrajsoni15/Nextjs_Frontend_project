import React from "react";
import Header from "../components/landing_page/Header";
import BlocDemo from "../components/landing_page/BlocDemo";
import Features from "../components/landing_page/Features";
import VidoSec from "../components/landing_page/VideoSec";
import Bottom from "../components/landing_page/Bottom";

const featuresData = [
  {
    icon: "/icons/icon4.png",
    title: "Compliance and Policy Management",
    desc: "Bloc ensures HR policies and compliance requirements are readily accessible to employees.Our platform is designed to provide prompt answers to their inquiries with just a simple click.",
  },
  {
    icon: "/icons/icon6.png",
    title: "Streamlined Onboarding",
    desc: "Simplify the onboarding process by providing instant access to essential information and resources. New hires can ask questions and receive immediate answers, reducing the time and effort required for training and ensuring a smooth transition.",
  },
  {
    icon: "/icons/icon2.png",
    title: "Knowledge Base and Self Serving",
    desc: "A centralized knowledge base allows employees to easily find answers to frequently asked questions, policies, and procedures. This frees up HR professionals' time to focus on strategic initiatives.",
  },
];

function hrPage() {
  return (
    <main className="flex flex-col items-center w-full justify-center gap-[90px] py-8">
      <Header
        initial={"HR & L&D TEAMS"}
        Heading={
          <span>
            Revolutionize Your{" "}
            <span className="text-primary">HR Processes</span> with AI Chatbots
          </span>
        }
        Subheading={
          "Empower your HR team with Bloc,an innovative knowledge management solution that transforms your employee policies into an interactive chat experience, fostering efficient communication and a modern workplace culture."
        }
      />
      <BlocDemo
        Heading={
          <span>
            Get started with <span className="text-primary">Bloc</span>
          </span>
        }
        Subheading={
          <span>
            Streamline Onboarding, empower{" "}
            <span className="text-white">
              employees with self serving knowledge, and gain valuable{" "}
            </span>{" "}
            insights for data driven decisions. Revolutionize HR with automation
            and enhanced employee experiences.
          </span>
        }
        BotName={"Hr Bot"}
      />
      <Features featuresData={featuresData} />
      <VidoSec />
      <Bottom />
    </main>
  );
}

export default hrPage;

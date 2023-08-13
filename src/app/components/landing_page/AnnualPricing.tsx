import React from "react";
import LayoutEffect from "../LayoutEffect";
import Button from "../ui/Button";

const AnnualPricing = () => {
  const plans = [
    {
      name: "Starter plan",
      desc: "For people understanding and exploring",
      price: 0,
      isMostPop: false,
      features: [
        "Upto 3 Blocs",
        "300 Total Questions/ month",
        "Both QA Bots and Chatbots",
        "Email support",
        "All filetypes with Web Scraping",
      ],
    },
    {
      name: "Growth Plan",
      desc: "Ideal for growing businesses and startups",
      price: 50,
      isMostPop: true,
      features: [
        "Everything in Starter Plan",
        "Upto 10 Active Blocs",
        "3000 Total Questions/ month",
        "Custom Branding and Domain",
        "Support via Email & Chat",
      ],
    },
    {
      name: "Enterprise Plan",
      desc: "Built for 50+ employee organisations",
      price: "Custom",
      isMostPop: false,
      features: [
        "Everything in Growth Plan",
        "Unlimited Active Blocs",
        "Unlimited Total Questions",
        "Custom Integrations",
        "Enterprise-grade Security",
        "Support via Email, Chat and Calls",
      ],
    },
  ];

  const mostPopPricingBg =
    "radial-gradient(130.39% 130.39% at 51.31% -0.71%, #1F2937 0%, rgba(31, 41, 55, 0) 100%)";

  return (
    <div id="pricing" className="w-full mx-auto">
      <LayoutEffect
        className="duration-1000 delay-300"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 w-full mx-auto">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`${idx == 1 && "text-white"} relative font-roboto hover-bg text-[#666666] hover:text-white flex-1 flex items-stretch flex-col rounded-xl border border-[#303030] mt-6 sm:mt-0`}
            >
              <div className="p-8 px-6 space-y-4 border-b border-[#303030] text-center">
                <span className="text-[#28A1FF] font-medium">{item.name}</span>
                <div className="text-white text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl text-white font-normal">/mo</span>
                </div>
                <p className="text-gray-400">{item.desc}</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 h-[230px]">
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#28A1FF]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      {featureItem}
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <Button
                    text={"Get Started"}
                    className={`w-full rounded-md text-white ring-offset-2 bg-[#0784C6] hover:bg-[#2793cd] focus:ring-0 focus:ring-offset-0`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutEffect>
    </div>
  );
};

export default AnnualPricing;

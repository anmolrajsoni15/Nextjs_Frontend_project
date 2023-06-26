'use client'

import React, {useEffect, useState} from "react";
import Subcomp from "./Subcomp";
import icon1 from "../../../../public/icons/icon1.png";
import icon2 from "../../../../public/icons/icon2.png";
import icon3 from "../../../../public/icons/icon3.png";
import icon4 from "../../../../public/icons/icon4.png";
import icon5 from "../../../../public/icons/icon5.png";
import icon6 from "../../../../public/icons/icon6.png";
import GradientWrapper from "../GradientWrapper";

function Qualities() {
  const qualities = [
    {
      icon: icon1,
      title: "Natural language processing (NLP)",
      desc:
        "questions in plain language and quickly find the information they need from uploaded knowledge base.",
    },
    {
      icon: icon2,
      title: "Flexible document and file uploads",
      desc:
        "Bloc allows users to upload a wide variety of file types, including slack, google documents, spreadsheets.",
    },
    {
      icon: icon3,
      title: "Integrations with your favorite apps",
      desc:
        "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma and slack we have it all.",
    },
    {
      icon: icon4,
      title: "Powerful search",
      desc:
        "questions in plain language and quickly find the information they need from uploaded knowledge base.",
    },
    {
      icon: icon5,
      title: "Collaboration",
      desc:
        "Deliver dynamic, personalized content, while ensuring users only see the best version of your site.",
    },
    {
      icon: icon6,
      title: "Integrations with your favorite apps",
      desc:
        "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma and slack we have it all.",
    },
  ];

  const [columnCount, setColumnCount] = useState(getColumnCount());

  const getBorderRadiusStyles = (index, length, columns) => {
    if (columns === 1) {
      return "rounded-lg";
    } else if (columns === 2) {
      if (index % columns === 0) {
        return "rounded-s-lg";
      } else if (index % columns === columns - 1) {
        return "rounded-e-lg";
      }
    } else {
      if (index % columns === 0) {
        return "rounded-s-lg";
      } else if (index % columns === columns - 1) {
        return "rounded-e-lg";
      }
    }
    return "";
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setColumnCount(getColumnCount());
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleWindowResize);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  }, []);

  function getColumnCount() {
    if (typeof window !== "undefined") {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 766) {
        return 1;
      } else if (windowWidth < 1025 && windowWidth > 766) {
        return 2;
      } else if (windowWidth >= 1025) {
        return 3;
      }
    }
    return 1; 
  }


  return (
    <div className="w-5/6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mb-16 md:gap-x-0 lg:gap-y-10 lg:gap-x-0">
      {qualities.map((quality, index) => (
        <div
          key={index}
          className={`w-full border-[1px] border-solid border-[#ffffff50] ${getBorderRadiusStyles(
            index,
            qualities.length,
            columnCount
          )}`}
        >
          <Subcomp
            icon={quality.icon}
            title={quality.title}
            desc={quality.desc}
          />
        </div>
      ))}
    </div>
  );
}

export default Qualities;

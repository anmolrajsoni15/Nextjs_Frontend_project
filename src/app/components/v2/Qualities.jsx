'use client'

import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
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
        "Questions in plain language and quickly find the information they need from the uploaded knowledge base.",
    },
    {
      icon: icon2,
      title: "Flexible document and file uploads",
      desc:
        "Bloc allows users to upload a wide variety of file types, including Slack, Google Documents, spreadsheets.",
    },
    {
      icon: icon3,
      title: "Integrations with your favorite apps",
      desc:
        "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma, and Slack, we have it all.",
    },
    {
      icon: icon4,
      title: "Powerful search",
      desc:
        "Questions in plain language and quickly find the information they need from the uploaded knowledge base.",
    },
    {
      icon: icon5,
      title: "Collaboration",
      desc:
        "Deliver dynamic, personalized content while ensuring users only see the best version of your site.",
    },
    {
      icon: icon6,
      title: "Integrations with your favorite apps",
      desc:
        "Bloc can be integrated with a lot of apps, so you never miss anything. Notion, Google Drive, Figma, and Slack, we have it all.",
    },
  ];

  const [columnCount, setColumnCount] = useState(1);
  const containerRef = useRef(null);

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

  useLayoutEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let columns;

        if (containerWidth <= 765) {
          columns = 1;
        } else if (containerWidth < 1025 && containerWidth > 765) {
          columns = 2;
        } else if (containerWidth >= 1025) {
          columns = 3;
        }

        setColumnCount(columns);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    const containerElement = containerRef.current;

    if (containerElement) {
      resizeObserver.observe(containerElement);
    }

    return () => {
      if (containerElement) {
        resizeObserver.unobserve(containerElement);
      }
    };
  }, []);

  return (
    <div
      className="w-5/6 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mb-16 md:gap-x-0 lg:gap-y-10 lg:gap-x-0"
      id="qualities"
      ref={containerRef}
    >
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


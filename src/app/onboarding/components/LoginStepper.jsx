"use client";

import React, { useState } from "react";
import "../globals.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

function LoginStepper({ activeStep }) {
  const [active, setActive] = useState(0);
  const steps = [
    {
      icon: <AccountCircleOutlinedIcon />,
    },
    {
      icon: <PieChartOutlineOutlinedIcon />,
    },
    {
      icon: <AutoAwesomeOutlinedIcon />,
    },
  ];

  const stepStyles = {
    display: "flex",
  };

  return (
    <div activeStep={activeStep} className="w-[90%] lg:w-1/3 flex flex-row items-center justify-center">
      {steps.map((item, index) => (
        <div key={index} className={`flex flex-row items-center ${index === steps.length-1 ? "justify-start w-fit":"justify-evenly w-full"}`}>
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-evenly ${
              activeStep > index
                ? "bg-[#1F6532]"
                : activeStep === index
                ? "bg-[#066CA2]"
                : "bg-[#283B41]"
            }`}
          >
            {item.icon}
          </div>
          {index !== steps.length - 1 ? (
            <div className="w-[50%] md:w-[70%] h-[2px] bg-slate-400"></div>
          ):null}
        </div>
      ))}
    </div>
  );
}

export default LoginStepper;

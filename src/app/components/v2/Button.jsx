"use client";

import React from "react";

function Button({ text, ...props }) {
  return (
    <button
      {...props}
      className={`${
        props.className || ""
      } w-44 h-12 bg-[#1C1C1C] hover:bg-[#232323] hover:shadow-lg hover:shadow-[#8e8e8e6a] transition-all ease-in-out duration-300 rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-lg leading-6`}
    >
      {text}
    </button>
  );
}

export default Button;

"use client";

import React from "react";

function Button({ text, ...props }) {
  return (
    <button
      {...props}
      className={`${
        props.className || ""
      } mt-5 w-44 h-12 bg-[#1C1C1C] rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-lg leading-6`}
    >
      {text}
    </button>
  );
}

export default Button;

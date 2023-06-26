"use client";

import React from "react";

function Button({ text, classProperties }) {
  return (
    <button
      className={`${classProperties} w-44 h-12 transition-all ease-in-out duration-300 rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-lg leading-6`}
    >
      {text}
    </button>
  );
}

export default Button;

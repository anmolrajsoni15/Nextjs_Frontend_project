'use client'

import React, { ReactNode } from "react";

interface ButtonProps {
  text: ReactNode;
  classProperty?: string;
}

const Button: React.FC<ButtonProps> = ({text, classProperty}) => {
  return (
    <button
      className={`w-44 h-12 transition-all ease-in-out duration-300 rounded-md border-2 border-[#ffffff1a] font-spacegrotesk text-lg leading-6 ${classProperty}`}
    >
      {text}
    </button>
  );
}

export default Button;
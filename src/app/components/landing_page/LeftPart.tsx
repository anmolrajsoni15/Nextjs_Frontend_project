"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  Heading: React.ReactNode;
  Subheading: React.ReactNode;
  className?: string;
}

const LeftPart: React.FC<Props> = ({ Heading, Subheading }) => {
  const [fileName, setFileName] = React.useState("No file chosen");

  const handleFileInput = (e: any) => {
    setFileName(e.target.files[0].name);
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      className="flex flex-col gap-5 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className='font-semibold font-poppins text-5xl leading-[60px]'>{Heading}</div>
      <div className="font-normal font-inter text-xl leading-8 text-[#888888] max-w-[90%]">{Subheading}</div>
      <label htmlFor="input_file" className='flex max-w-[90%] rounded-lg border border-solid p-2 py-1 border-[#A7A7A7]' onChange={handleFileInput}>
        <div className="bg-white text-black rounded font-inter font-medium text-xs leading-6 text-center py-1 px-8">Choose File</div>
        <div className="px-4 mt-1 text-[#9B9B9B] font-inter font-normal text-sm">{fileName}</div>
        <input type="file" id="input_file" className='hidden' />
      </label>
    </motion.div>
  );
};

export default LeftPart;

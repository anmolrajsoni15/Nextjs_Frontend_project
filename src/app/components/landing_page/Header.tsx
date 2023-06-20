'use client'

import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  initial: React.ReactNode;
  Heading: React.ReactNode;
  Subheading: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ initial, Heading, Subheading }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      className='flex flex-col w-4/5 items-center justify-center gap-6 my-12'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col items-center justify-center max-w-[920px] gap-3">
        <motion.div className="font-spacegrotesk font-normal text-base leading-6 text-primary text-center">
          {initial}
        </motion.div>
        <motion.div className="font-poppins font-semibold text-5xl leading-[60px] text-center">
          {Heading}
        </motion.div>
      </motion.div>
      <motion.div className="max-w-3xl font-inter font-normal text-xl leading-7 text-white text-center">
        {Subheading}
      </motion.div>
    </motion.div>
  );
};

export default Header;

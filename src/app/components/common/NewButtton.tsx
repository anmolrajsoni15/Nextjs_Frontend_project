'use client'

import React, { ReactNode, useEffect, useState } from 'react';
import './style.css'

interface ButtonProps {
    text: ReactNode;
    loading?: boolean;
    classProperty?: string;
    buttonFunction?: any;
}

const NewButton:React.FC<ButtonProps> = ({text, loading, classProperty, buttonFunction}) => {
  const [clicked, setClicked] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const rippleEffect = (event: any) => {
    const posX = (event.pageX - event.target.offsetLeft) - 50;
    const posY = (event.pageY / event.target.offsetHeight) - 25;
    setPosX(posX);
    setPosY(posY);
  };

  const handleOnClick = (event: any) => {
    rippleEffect(event);
    setClicked(true); // Toggle the 'clicked' state to true on every click
    buttonFunction();
    setTimeout(() => {
      setClicked((prevClicked) => !prevClicked); // Toggle the 'clicked' state back after 500ms
    }, 500);
  };
    

  return (
      <button disabled={loading} onClick={handleOnClick} className={`inline-block appearance-none rounded-[5px] bg-primary relative overflow-hidden hover:bg-[#1f8cc7] py-3 text-[#FFFFFFD9] font-spacegrotesk font-medium text-base text-center ${classProperty} btn`}>
        {text}
        { clicked && <span className="ink" style={{ top: `-20px`, left: `30%` }} ></span> }
      </button>
  );
};

export default NewButton;
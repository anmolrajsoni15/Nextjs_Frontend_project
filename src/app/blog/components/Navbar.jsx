"use client";

import React, { useState } from "react";
import Logo from "../../../../public/images/blog_images/bloc_logo.png";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Button from "./Button";

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className=" justify-between w-5/6 h-24 mx-auto bg-transparent hidden md:flex">
        <div className="flex flex-col pl-1 pt-5 w-16">
          <Image src={Logo} alt="logo" />
          <span className="leading-6 font-roboto">Bloc</span>
        </div>
        <div className="flex flex-row flex-1 justify-evenly">
          <ul className="flex flex-row list-none text-center items-center md:w-1/2 lg:w-2/6 justify-evenly font-roboto text-sm">
            <li>Features</li>
            <li>Testimonials</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="h-full">
          <Button text={"Join the Waitlist"} />
        </div>
      </div>
      {/* Mobile Button */}
      <div className="flex md:hidden flex-row w-full z-10 fixed bg-transparent backdrop-blur-sm">
        <div className="flex flex-row w-full items-center justify-between h-12">
          <div className="flex flex-row items-center justify-around w-1/3">
            <Image src={Logo} alt="logo" className="ml-4" />
            <span className="text-2xl leading-6 font-roboto -translate-x-2">
              Bloc
            </span>
          </div>
          <div
            onClick={handleNav}
            className="block relative sm:hidden z-10 w-[15%]"
          >
            {nav ? (
              <AiOutlineClose size={30} style={{ color: "white" }} />
            ) : (
              <AiOutlineMenu size={30} style={{ color: "white" }} />
            )}
          </div>
        </div>
        <div
          className={
            nav
              ? "sm:hidden z-[5] py-28 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 animate-bouncing"
              : "sm:hidden z-[5] py-28 absolute top-[-2000%] left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <div className="flex flex-col w-full items-center gap-2 justify-center h-1/6">
            <Image src={Logo} width={50} height={50} alt="logo" />
            <span className="text-xl font-semibold leading-10 font-roboto">
              Bloc
            </span>
          </div>
          <div className="flex flex-col justify-evenly h-4/6">
            <ul className="flex flex-col gap-10 list-none text-center items-center w-full justify-evenly font-roboto text-lg">
              <li>Features</li>
              <li>Testimonials</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="h-1/6">
            <Button text={"Join the Waitlist"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

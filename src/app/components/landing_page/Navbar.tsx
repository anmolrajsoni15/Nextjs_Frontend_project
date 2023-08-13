"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Button from "../common/Button";
import Link from "next/link";
import LoginButton from "../../components/ui/LoginButton";

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="justify-between w-[86%] h-24 mx-auto bg-transparent hidden md:flex z-10 relative">
        <div className="flex flex-col pl-1 pt-5 w-16">
          <Image src='/images/logo.png' alt="logo" width={45} height={45} />
          <span className="leading-6 font-roboto">Bloc</span>
        </div>
        <div className="flex flex-row flex-1 justify-evenly">
          <ul className="flex scroll-smooth flex-row list-none text-center items-center md:w-2/3 lg:w-2/5 justify-evenly font-roboto text-sm">
            <li>
              <Link href="/#qualities">Features</Link>
            </li>
            <li>
              <Link href="/#teams">Testimonials</Link>
            </li>
            <li>
              <Link href="/#faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/blog">Resources</Link>
            </li>
          </ul>
        </div>
        <div className="h-full">
          {/* <Link href={"https://nsbxei0ai38.typeform.com/to/fd3UK76K"}>
            <Button
              text={"Join the WaitList"}
              classProperty="my-5 bg-[#0784C6] hover:bg-[#2793cd]"
            />
          </Link> */}
          <LoginButton text={'Login with Google'} />
        </div>
      </div>
      {/* Mobile Button */}
      <div className="flex md:hidden flex-row w-full z-10 fixed bg-transparent backdrop-blur-sm">
        <div className="flex flex-row w-full items-center justify-between h-12">
          <div className="flex flex-row items-center justify-around w-fit gap-4">
            <Image src='/images/logo.png' alt="logo" width={40} height={40} className="ml-4" />
            <span className="text-2xl leading-6 font-roboto -translate-x-2">
              Bloc
            </span>
          </div>
          <div
            onClick={handleNav}
            className="block relative md:hidden z-10 w-[15%]"
          >
            {nav ? (
              <AiOutlineClose size={30} style={{ color: "white" }} />
            ) : (
              <AiOutlineMenu size={30} style={{ color: "white" }} />
            )}
          </div>
        </div>
        <div
          onClick={handleNav}
          className={
            nav
              ? "md:hidden z-[5] py-28 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 animate-bouncing"
              : "md:hidden z-[5] py-28 absolute top-[-2000%] left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <div className="flex flex-col w-full items-center gap-2 justify-center h-1/6">
            <Image src='/images/logo.png' width={45} height={45} alt="logo" />
            <span className="text-xl font-semibold leading-10 font-roboto">
              Bloc
            </span>
          </div>
          <div className="flex flex-col justify-evenly h-4/6">
            <ul className="flex flex-col gap-10 list-none text-center items-center w-full justify-evenly font-roboto text-lg">
            <li>
              <Link href="/#qualities">Features</Link>
            </li>
            <li>
              <Link href="/#teams">Testimonials</Link>
            </li>
            <li>
              <Link href="/#faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/blog">Resources</Link>
            </li>
            </ul>
          </div>
          <div className="h-1/6 w-11/12">
            {/* <Link href={"https://nsbxei0ai38.typeform.com/to/fd3UK76K"}>
              <Button
                text={"Join the WaitList"}
                classProperty="my-5 bg-[#0784C6] hover:bg-[#2793cd]"
              />
            </Link> */}
            <LoginButton text={'Login with Google'} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

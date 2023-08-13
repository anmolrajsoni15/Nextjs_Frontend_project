"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import LoginButton from "../../components/ui/LoginButton";
import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  const [nav, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen2, setIsOpen2] = useState<boolean>(false);
  const [rotateDegree, setRotateDegree] = useState(0);
  const [rotateDegree2, setRotateDegree2] = useState(0);

  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref1.current && !ref1.current.contains(event.target)) {
      setIsOpen(false);
      setRotateDegree(0);
    }
    if (ref2.current && !ref2.current.contains(event.target)) {
      setIsOpen2(false);
      setRotateDegree2(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setRotateDegree2(isOpen2 ? 0 : 180);
  };

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="justify-between w-full h-24 mx-auto bg-transparent hidden md:flex z-10 text-[#D1D5DB] relative">
        <div className="flex items-center justify-center gap-10">
          <div onClick={()=>router.push('/')} className="flex flex-col pl-1 pt-5 w-16 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={45} height={45} />
            <span className="leading-6 font-roboto">Bloc</span>
          </div>
          <div className="flex flex-row flex-1 justify-evenly">
            <ul className="flex scroll-smooth flex-row list-none text-center items-center w-full gap-8 justify-evenly font-inter text-base font-semibold">
              <li>
                <Link href="/upgradePlan">Pricing</Link>
              </li>
              <li>
                <div
                  ref={ref1}
                  onClick={toggleDropdown}
                  className="cursor-pointer relative flex items-center justify-center gap-2"
                >
                  <div className="">Solutions</div>
                  <FiChevronDown
                    style={{
                      transform: `rotate(${rotateDegree}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  {isOpen && (
                    <div className="absolute top-[25px] left-[-30px] flex flex-col items-start justify-start w-[300px] bg-[#181818] border border-solid border-[#343434] rounded-xl shadow-lg p-3 gap-2">
                      <div
                        onClick={() => router.push(`/hr`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution1.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            HR & L&D Teams
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            The latest industry news, updates and info.
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/startups`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution2.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Founders and Managers
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our customers are making big changes.
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution3.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            D2C and E-Commerce
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our customers are making big changes.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link href="/blog">Resources</Link>
              </li>
              <li>
                <div
                  ref={ref2}
                  onClick={toggleDropdown2}
                  className="cursor-pointer relative flex items-center justify-center gap-2"
                >
                  <div className="">Legal</div>
                  <FiChevronDown
                    style={{
                      transform: `rotate(${rotateDegree2}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  {isOpen2 && (
                    <div className="absolute top-[25px] left-[-30px] flex flex-col items-start justify-start w-[300px] bg-[#181818] border border-solid border-[#343434] rounded-xl shadow-lg p-3 gap-2">
                      <div
                        onClick={() => router.push(`/dataAndPrivacy`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/book-closed.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Privacy Policy
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our system works securely
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/termsAndcondition`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/folder.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Terms & Condition
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Have a review on our Terms and Condition
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-full">
          {/* <Link href={"https://nsbxei0ai38.typeform.com/to/fd3UK76K"}>
            <Button
              text={"Join the WaitList"}
              classProperty="my-5 bg-[#0784C6] hover:bg-[#2793cd]"
            />
          </Link> */}
          <LoginButton text={"Login with Google"} />
        </div>
      </div>
      {/* Mobile Button */}
      <div className="flex text-[#D1D5DB] md:hidden flex-row w-full z-10 fixed bg-transparent backdrop-blur-sm">
        <div className="flex flex-row w-full items-center justify-between h-12">
          <div onClick={()=>router.push('/')} className="flex flex-row items-center justify-around w-fit gap-4 cursor-pointer">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="ml-4"
            />
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
          //   onClick={handleNav}
          className={
            nav
              ? "md:hidden z-[5] py-28 absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 animate-bouncing overflow-auto"
              : "md:hidden z-[5] py-28 absolute top-[-2000%] left-0 right-0 bottom-0 flex flex-col justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 overflow-auto"
          }
        >
          <div onClick={()=>router.push('/')} className="flex flex-col w-full items-center gap-2 justify-center h-1/6 cursor-pointer">
            <Image src="/images/logo.png" width={45} height={45} alt="logo" />
            <span className="text-xl font-semibold leading-10 font-roboto">
              Bloc
            </span>
          </div>
          <div className="flex flex-col justify-evenly h-4/6">
            <ul className="flex flex-col gap-10 list-none text-center items-center w-full justify-evenly font-roboto text-lg">
              <li>
                <Link href="/updatePlan">Pricing</Link>
              </li>
              <li>
                <div
                  onClick={toggleDropdown}
                  className="cursor-pointer z-50 relative flex items-center justify-center gap-2"
                >
                  <div className="">Solutions</div>
                  <FiChevronDown
                    style={{
                      transform: `rotate(${rotateDegree}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  {isOpen && (
                    <div className="absolute top-[25px] left-[-30px] flex flex-col items-start justify-start w-[300px] bg-[#181818] border border-solid border-[#343434] rounded-xl shadow-lg p-3 gap-2">
                      <div
                        onClick={() => router.push(`/hr`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution1.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            HR & L&D Teams
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            The latest industry news, updates and info.
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/startups`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution2.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Founders and Managers
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our customers are making big changes.
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/solution3.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            D2C and E-Commerce
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our customers are making big changes.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
              <li>
                <Link href="/blog">Resources</Link>
              </li>
              <li>
                <div
                  onClick={toggleDropdown2}
                  className="cursor-pointer relative flex items-center justify-center gap-2"
                >
                  <div className="">Legal</div>
                  <FiChevronDown
                    style={{
                      transform: `rotate(${rotateDegree2}deg)`,
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />
                  {isOpen2 && (
                    <div className="absolute top-[25px] left-[-30px] flex flex-col items-start justify-start w-[300px] bg-[#181818] border border-solid border-[#343434] rounded-xl shadow-lg p-3 gap-2">
                      <div
                        onClick={() => router.push(`/dataAndPrivacy`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/book-closed.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Privacy Policy
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Learn how our system works securely
                          </div>
                        </div>
                      </div>
                      <div
                        onClick={() => router.push(`/termsAndCondition`)}
                        className="flex items-start justify-start p-3 gap-4 hover:bg-[#292929] rounded-[8px] transition-all duration-100"
                      >
                        <Image
                          src="/icons/folder.svg"
                          width={24}
                          height={24}
                          alt="icons"
                        />
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="font-inter text-base font-semibold text-[#FFFFFFCC]">
                            Terms & Condition
                          </div>
                          <div className="font-inter text-sm text-left font-normal text-[#717171]">
                            Have a review on our Terms and Condition
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
            <LoginButton text={"Login with Google"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

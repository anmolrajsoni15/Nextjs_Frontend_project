"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import { deleteCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, logoutSuccess } from "../../Redux/features/userSlice";
import { refreshBloc } from "src/app/Redux/features/blocSlice";

interface Props {
  userData: any;
}

const Sidebar: React.FC<Props> = ({ userData }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedIcon, setSelectedIcon] = useState("dashboard");

  const [inside, setInside] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false)

  useEffect(() => {
    if (inside) {
      const timeout = setTimeout(() => {
        setTransitionComplete(true)
      }, 300)
      return () => clearTimeout(timeout)
    } else {
      setTransitionComplete(false)
    }
  }, [inside])

  useEffect(() => {
    setSelectedIcon(window.location.pathname.split("/")[2]);
  }, []);

  const handleClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  const gotoResources = () => {
    router.push("/blog");
  };

  const handleLogout = async () => {
    dispatch(logoutRequest());
    await signOut(auth);
    dispatch(refreshBloc());
    deleteCookie("user");
    deleteCookie("blocId");
    deleteCookie("jwt");
    deleteCookie("chatId");
    dispatch(logoutSuccess());
    router.push("/");
  };

  return (
    <div>
      <div onMouseEnter={()=>setInside(true)} onMouseLeave={()=>setInside(false)} className={`fixed z-50 flex flex-col items-start justify-between h-screen ${inside ? "w-52" : "w-20"} transition-width duration-500 ease-in-out bg-[#121212] border-r border-solid border-borderColor`}>
        <div className="icon_corner flex flex-col gap-4 mt-10 w-full">
          <Link onClick={() => handleClick("dashboard")} href="/new/dashboard" className={`flex items-center justify-start py-2 relative w-full hover:bg-[#272727]`}>
            <div
              className={`icon p-2 md:p-[10px] rounded-md translate-x-[15px] ${
                selectedIcon === "dashboard" && !inside ? "selected" : ""
              }`}
            >
              <Image
                src="/icons/icon-outline-home.svg"
                alt="dashboard"
                width={24}
                height={24}
              />
            </div>
            {
              transitionComplete && (
                <div className={`absolute ${inside ? "flex !opacity-100" : "hidden !opacity-0"} transition-all duration-500 ease-in-out delay-500 left-[68px] top-4 font-inter text-[#B0B0B0] text-[20px]`}>Home</div>
              )
            }
          </Link>
          <Link onClick={() => handleClick("dashboard")} href="/new/creates" className={`flex items-center justify-start py-2 relative w-full hover:bg-[#272727]`}>
            <div
              className={`icon p-2 md:p-[10px] rounded-md translate-x-[15px] ${
                selectedIcon === "creates" && !inside ? "selected" : ""
              }`}
              onClick={() => handleClick("creates")}
            >
              <Image src="/icons/plus.svg" alt="add" width={24} height={24} />
            </div>
            {
              transitionComplete && (
                <div className={`absolute ${inside ? "flex !opacity-100" : "hidden !opacity-0"} transition-all duration-500 ease-in-out delay-500 left-[68px] top-4 font-inter text-[#B0B0B0] text-[20px]`}>New Bloc</div>
              )
            }
          </Link>
          <div
            onClickCapture={gotoResources}
            className={`cursor-pointer p-2 md:p-[10px] !py-4 rounded-md w-full relative flex items-center justify-start hover:bg-[#272727]`}
          >
            <Image
              src="/icons/help-octagon.svg"
              alt="help"
              width={24}
              height={24}
              className="translate-x-[15px]"
            />
            {
              transitionComplete && (
                <div className={`absolute ${inside ? "flex !opacity-100" : "hidden !opacity-0"} transition-all duration-500 ease-in-out delay-500 left-[68px] top-[12px] font-inter text-[#B0B0B0] text-[20px]`}>Resources</div>
              )
            }
          </div>
        </div>
        <div className="my-4 rounded-full w-full translate-x-[15px] relative group">
          <Image
            src={
              userData && userData?.photo
                ? userData.photo
                : "/images/User-Profile.png"
            }
            alt="dummy"
            width={50}
            height={50}
            className="rounded-full"
          />
          {
              transitionComplete && (
                <div onClick={handleLogout} className={`cursor-pointer p-3 w-fit pr-10 bg-gradient-to-l hover:from-[#272727] absolute ${inside ? "flex !opacity-100" : "hidden !opacity-0"} transition-all duration-500 ease-in-out delay-500 left-[68px] top-0 font-inter text-[#B0B0B0] text-[20px]`}>Log out</div>
              )
            }
        </div>

        <style jsx>{`
          .icon {
            transition: background-color 0.3s ease;
          }
          .selected {
            background-color: #272727;
            border: 0.7px solid rgba(255, 255, 255, 0.1);
          }
        `}</style>
      </div>
    </div>
  );
};

export default Sidebar;

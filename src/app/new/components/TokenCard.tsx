"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { deleteCookie, getCookie } from "cookies-next";
import { getCredits } from "../../services/apiServices";
import { useDispatch } from "react-redux";
import { logoutRequest, logoutSuccess } from "../../Redux/features/userSlice";
import { auth } from "../../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { refreshBloc } from "../../Redux/features/blocSlice";
import { useRouter } from "next/navigation";

interface Props {
  userData: any;
}

const TokenCard: React.FC<Props> = ({ userData }) => {
    const dispatch = useDispatch();
    const router = useRouter();
  const [show, setShow] = React.useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleShow = () => {
    setShow(!show);
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
    <div className="relative" ref={wrapperRef}>
      <div
        onClick={toggleShow}
        className="flex flex-row items-center justify-center gap-2 px-3 py-2 pl-4 bg-[#333333] border border-solid border-[#CDCCCCCC] rounded-3xl cursor-pointer"
      >
        <div className="">
          <Image src={"/icons/ep-coin.svg"} width={18} height={18} alt="coin" />
        </div>
        <div className="text-center font-spacegrotesk text-sm">
          <span>{userData && userData.credits ? userData.credits : 0}</span>{" "}
        </div>
        <div className="">
          <Image
            src={
              userData && userData?.photo ? userData.photo : "/images/User-Profile.png"
            }
            width={35}
            height={35}
            alt="dummy"
            className="rounded-full"
          />
        </div>
      </div>
      {show ? (
        <div className="absolute flex flex-col cursor-pointer shadow-md bg-[#292929] w-[270px] right-0 top-16 rounded-md z-50">
          <div className="flex items-center justify-start gap-3 px-4 py-3 border-b border-solid border-[#494949] ">
            <Image
              src={
                userData && userData?.photo
                  ? userData.photo
                  : "/images/User-Profile.png"
              }
              width={40}
              height={40}
              alt="dummy"
              className="rounded-full"
            />
            <div className="flex flex-col items-start justify-center">
              <div className="font-spacegrotesk font-medium text-base text-[#FFFFFFCC]">{userData.name}</div>
              <div className="font-spacegrotesk font-normal text-xs">{userData.email}</div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center py-3 w-full font-spacegrotesk text-sm font-medium  border-b border-solid border-[#494949]">
            <div onClick={()=>router.push(`/upgradePlan`)} className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]">
              <Image
                src={"/icons/ep-coin.svg"}
                width={20}
                height={20}
                alt="coin"
              />
              <div className="">Buy More Credits</div>
            </div>
            <div className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]">
              <Image
                src={"/icons/mail-05.svg"}
                width={20}
                height={20}
                alt="coin"
              />
              <div className="">Support</div>
            </div>
          </div>
          <div className="">
          <div onClick={handleLogout} className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]">
              <Image
                src={"/icons/log-out.svg"}
                width={20}
                height={20}
                alt="coin"
              />
              <div className="">Log out</div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TokenCard;

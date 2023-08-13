"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "./CircularProgress";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  logoutRequest,
  logoutSuccess,
} from "../../../Redux/features/userSlice";
import { auth } from "../../../Firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { refreshBloc } from "../../../Redux/features/blocSlice";
import { deleteCookie } from "cookies-next";
import ProfileCard from "./ProfileCard";
import Tooltip from "../../../Notifications/Tooltip";

interface Props {
  page: string;
  progress: number;
  setProgress: any;
  userData: any;
}

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    opacity: 1,
    border: "1.75px solid rgba(0, 0, 0, 0.83)",
    borderRadius: "15px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const NewSidebar: React.FC<Props> = ({
  page,
  progress,
  setProgress,
  userData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  // const [showProfileCompletion, setShowProfileCompletion] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // const wrapperRef2 = useRef<HTMLDivElement>(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setShowUserProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleShow = () => {
    setShowUserProfile(!showUserProfile);
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

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [tooltipId, setTooltipId] = useState("");

  const handleInfoMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    text: string,
    id: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width + 10,
      y: rect.top + rect.height / 5,
    });
    setTooltipText(text);
    setTooltipId(id);
    setTooltipTimeout(setTimeout(() => setShowTooltip(true), 300));
  };

  const handleInfoMouseLeave = () => {
    if (tooltipTimeout) clearTimeout(tooltipTimeout);
    setShowTooltip(false);
  };

  return (
    <div className="fixed w-[85px] h-screen flex flex-col items-center justify-between border-r border-solid border-[#595959] bg-compColor2">
      <div className="flex flex-col gap-5">
        <Link
          href="/new/dashboard"
          className={`${
            page === "dashboard" ? "bg-gray" : "bg-transparent"
          } rounded-[7px] mt-6`}
        >
          <div
            id="dashboard_icon"
            onMouseEnter={(e) =>
              handleInfoMouseEnter(e, "Dashboard", "dashboard_icon")
            }
            onMouseLeave={handleInfoMouseLeave}
            className="p-3 relative z-50"
          >
            <Image
              src="/icons/v3icons/home.svg"
              width={30}
              height={30}
              alt="dashboard"
              className=""
            />
            {showTooltip && tooltipId === "dashboard_icon" && (
              <Tooltip text={tooltipText} position="top-[10px] left-[65px]" />
            )}
          </div>
        </Link>
        <Link
          href="/new/creates"
          className={`${
            page === "create" ? "bg-gray" : "bg-transparent"
          } rounded-[7px] mt-6 relative`}
        >
          <div
            id="create_icon"
            onMouseEnter={(e) =>
              handleInfoMouseEnter(e, "Create New Bloc", "create_icon")
            }
            onMouseLeave={handleInfoMouseLeave}
            className="p-3 relative z-50"
          >
            <Image
              src="/icons/v3icons/plus.svg"
              width={30}
              height={30}
              alt="dashboard"
              // className="m-[12px]"
            />
            {showTooltip && tooltipId === "create_icon" && (
              <Tooltip text={tooltipText} position="top-[10px] left-[65px]" />
            )}
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* <div className="cursor-pointer">
          <CircularProgress progress={progress} />
        </div> */}
        <div className="flex flex-col items-center justify-center gap-3">
          <Link href="/new/dashboard" className={`hover:bg-gray rounded-[7px]`}>
            <div
              id="demo"
              onMouseEnter={(e) =>
                handleInfoMouseEnter(e, "Schedule a Demo", "demo")
              }
              onMouseLeave={handleInfoMouseLeave}
              className="relative z-50 p-2"
            >
              <Image
                src="/icons/v3icons/headphones.svg"
                width={24}
                height={24}
                alt="demo"
                className=""
              />
              {showTooltip && tooltipId === "demo" && (
                <Tooltip text={tooltipText} position="top-[7px] left-[50px]" />
              )}
            </div>
          </Link>
          <Link href="/new/dashboard" className={`hover:bg-gray rounded-[7px]`}>
            <div
              id="support"
              onMouseEnter={(e) =>
                handleInfoMouseEnter(e, "Support Message", "support")
              }
              onMouseLeave={handleInfoMouseLeave}
              className="relative z-50 p-2"
            >
              <Image
                src="/icons/v3icons/mail.svg"
                width={24}
                height={24}
                alt="support"
                className=""
              />
              {showTooltip && tooltipId === "support" && (
                <Tooltip text={tooltipText} position="top-[7px] left-[50px]" />
              )}
            </div>
          </Link>
          <Link href="/upgradePlan" className={`hover:bg-gray rounded-[7px]`}>
            <div
              id="credits"
              onMouseEnter={(e) =>
                handleInfoMouseEnter(e, "Buy more credits", "credits")
              }
              onMouseLeave={handleInfoMouseLeave}
              className="relative z-50 p-2"
            >
              <Image
                src="/icons/v3icons/coins.svg"
                width={24}
                height={24}
                alt="dashboard"
                className=""
              />
              {showTooltip && tooltipId === "credits" && (
                <Tooltip text={tooltipText} position="top-[7px] left-[50px]" />
              )}
            </div>
          </Link>
          <Link href="/blog" className={`hover:bg-gray rounded-[7px]`}>
            <div
              id="blog"
              onMouseEnter={(e) => handleInfoMouseEnter(e, "Resources", "blog")}
              onMouseLeave={handleInfoMouseLeave}
              className="relative z-50 p-2"
            >
              <Image
                src="/icons/v3icons/help-octagon.svg"
                width={24}
                height={24}
                alt="dashboard"
                className=""
              />
              {showTooltip && tooltipId === "blog" && (
                <Tooltip text={tooltipText} position="top-[7px] left-[50px]" />
              )}
            </div>
          </Link>
        </div>
        <div
          onClick={toggleShow}
          ref={wrapperRef}
          className="relative z-50 my-4 rounded-full w-full group"
        >
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
          {showUserProfile ? (
            <div className="absolute flex flex-col cursor-pointer shadow-md bg-[#292929] w-[270px] left-[4rem] -top-[13rem] rounded-md">
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
                  <div className="font-spacegrotesk font-medium text-base text-[#FFFFFFCC]">
                    {userData.name}
                  </div>
                  <div className="font-spacegrotesk font-normal text-xs">
                    {userData.email}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-center py-3 w-full font-spacegrotesk text-sm font-medium  border-b border-solid border-[#494949]">
                <div
                  onClick={openModal}
                  className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]"
                >
                  <div className="">Account Settings</div>
                </div>
                <div className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]">
                  <div className="">Give Feedback</div>
                </div>
                <div className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]">
                  <div className="">Refer & Earn Credits</div>
                </div>
              </div>
              <div className="">
                <div
                  onClick={handleLogout}
                  className="flex w-full py-3 px-4 items-center justify-start gap-2 hover:bg-[#3f3f3f]"
                >
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
      </div>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bloc Name"
        ariaHideApp={false}
        onAfterOpen={() => {
          customStyles.content.opacity = 1;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <ProfileCard closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default NewSidebar;

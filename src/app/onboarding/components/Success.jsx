"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icon from "../images/Icon.png";
import Button from "./Button";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/navigation";
import Modal from "react-modal";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setNewUser, setShowTutorial } from "../../Redux/features/Tutorial";

const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "none",
  },
};

const Success = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [blocName, setBlocName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCreatingBloc, setIsCreatingBloc] = useState(false); // Added state for button disable

  const handleBlocName = (e) => {
    setBlocName(e.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createNewBloc = async () => {
    setIsCreatingBloc(true); // Disable the button
    const token = getCookie("jwt");

    const data = {
      name: blocName,
      photo: "",
      initialMessage: "Hey, I am bloc! How can I help you?",
      subHeading: "",
      isPublic: true,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network Response was not ok!");
      }

      const result = await response.json();
      console.log(result);
      localStorage.setItem("blocId", result.blocId);
      setCookie("blocId", result.blocId);

      router.push("/new/creates");
    } catch (error) {
      console.log("There is a problem with your fetching operations: ", error);
    }
  };

  const gotoDashboard = () => {
    dispatch(setNewUser());

    setTimeout(() => {
    router.push("/new/dashboard");
    }, 1000);
  };


  return (
    <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-10 md:py-12 lg:p-20 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f] items-center text-white">
      <Image src={Icon} alt="success_icon" width={73} height={73} />
      <div className="flex flex-col w-full text-center mb-4">
        <div className="w-full font-spacegrotesk text-3xl leading-9 font-medium tracking-[-0.03em] text-white">
          congratulations, you&apos;re set up!
        </div>
        <div className="font-spacegrotesk font-medium text-sm leading-5">
          time to create your bloc
        </div>
      </div>
      <div>
        <div
          className="w-full my-3"
          onClick={gotoDashboard}
        >
          <Button value="Create new bloc" />
        </div>
          {" "}
          <div onClick={gotoDashboard} className="font-spacegrotesk font-medium text-sm leading-5 text-white cursor-pointer">
            Let me look around first
            <span className="px-1">
              <EastIcon style={{ fontSize: "small" }} />
            </span>
          </div>
      </div>
    </div>
  );
};

export default Success;

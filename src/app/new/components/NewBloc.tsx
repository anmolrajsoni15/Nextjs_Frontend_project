"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Link from "next/link";
import Modal from "react-modal";
import { getCookie, setCookie } from "cookies-next";
import { createBloc, updateBloc } from "../../services/apiServices";
// import {Notify} from "../../Notifications/Notify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { clearErrors } from "../../Redux/features/blocSlice";
import { AiOutlineCamera } from "react-icons/ai";
import { showNotification } from "src/app/Notifications/NotificationManager";
import { setCloseTutorial, setOldUser } from "src/app/Redux/features/Tutorial";
import TutorialContent from "./TutorialComponent/TutorialContent";

const customStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "8px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
  },
};

const tutorialStyles = {
  insidePart: {
    width: "413px",
    height: "457px",
    top: "50px",
    left: "20px",
  },
  messageBox: {
    width: "500px",
    top: "-207px",
    left: "-225px",
  },
  message: {
    step: 2,
    messageText:
      "Let's name your Bloc first. If you want you can also add a photo to it by hovering over the blocs and clicking on it. Once done click on the 'Create New Bloc' button to create your first Bloc.",
  },
};

const NewBloc = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { error, loading, blocData, message } = useSelector(
    (state: RootState) => state.newBlocState
  );
  const { error: blocError } = useSelector(
    (state: RootState) => state.newBlocState
  );
  const { newUser, showTutorial } = useSelector(
    (state: RootState) => state.tutorial
  );

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);
  const [blocName, setBlocName] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    "where will you host the bloc?"
  );

  const [photo, setPhoto] = useState("/images/group-122.png");
  const [binaryPhoto, setBinaryPhoto] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (showTutorial) {
      setShow(true);
    }
  }, [showTutorial, setShow]);

  useEffect(() => {
    setBlocName(blocData.name);
    if (blocData.photo) {
      setPhoto(blocData.photo);
    }
  }, [blocData]);

  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
        if (reader.readyState === 2) {
          setPhoto(reader.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const token = getCookie("jwt");

  const handleFileInput = async (e: any) => {
    const file = (e.target as HTMLInputElement)?.files?.[0];
    console.log(file?.name);
    const base64String = await imageToBase64(file);

    setBinaryPhoto(base64String as string);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleOption = (value: string) => {
    setSelectedOption(value);
  };

  const handleClick = () => {
    setIsOpen(false);
    router.push("/new/dashboard");
  };

  const createNewBloc = async () => {
    await setShow(false);

    if (Object.keys(blocData).length !== 0) {
      const newblocData = {
        name: blocName,
        photo: binaryPhoto,
      };
      await dispatch(updateBloc(token, blocData.blocId, newblocData));
    } else {
      const blocDatas = {
        name: blocName,
        photo: binaryPhoto,
        initialMessage: "Hey, I am bloc! How can I help you?",
        subHeading: "",
        isPublic: true,
        useCase:
          selectedOption !== "where will you host the bloc?"
            ? selectedOption
            : "",
      };
      await dispatch(createBloc(blocDatas, token));
    }
  };

  useEffect(() => {
    if (error && error !== "Too Many Requests") {
      // Notify("error", error);
      if (error === "Bloc Limit Exceeded") {
        console.log("This the current error\n", error);
        openModal();
        if (modalIsOpen === false) {
          dispatch(clearErrors());
        }
      } else if (error === "Please enter a valid bloc name") {
        showNotification("error", error);
        setTimeout(() => {
          dispatch(clearErrors());
        }, 2000);
      }
    }
    if (message === "success") {
      router.push("/new/creates/add");
    }

    console.log(blocData.length);
  }, [message, success, error]);

  function handleCloseTutorial() {
    dispatch(setCloseTutorial());
    dispatch(setOldUser());
  }

  return (
    <div>
      {newUser && show && (
        <div className="absolute w-[500px]">
          <TutorialContent
            width={150}
            height={80}
            top={60}
            left={0}
            customStyles={tutorialStyles}
            handleClose={handleCloseTutorial}
          />
        </div>
      )}
      <div
        className={` ${
          show ? "z-[6000]" : ""
        } w-[452px] h-[560px] flex flex-col items-center justify-center p-16 gap-4 mb-24 relative`}
      >
        {/* <div className="w-[120px] h-[120px] relative flex items-center justify-center rounded-full group"> */}
          <Image src="/images/group-122.png" width={100} height={100} alt="group" />
          {/* <div className="absolute w-full h-full inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center">
            <label
              htmlFor="input_file"
              onChange={handleFileInput}
              className="bg-[#555555] w-full h-full flex items-center justify-center bg-opacity-60 rounded-full p-2"
            >
              <input
                type="file"
                accept="image/*"
                id="input_file"
                className="hidden"
              />

              <AiOutlineCamera className="text-[#ffffffc2] text-4xl" />
            </label>
          </div> */}
        {/* </div> */}
        <div className="w-full text-center font-poppins font-semibold text-[28px] text-[#FFFFFFCC]">
          Create a New Bloc
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-3">
          <div className="w-full">
            <label
              htmlFor=""
              className="font-spacegrotesk text-sm text-[#FFFFFFCC]"
            >
              let&apos;s name it first
            </label>
            <div className="w-full h-12 flex flex-row justify-start items-center border-2 border-solid border-[#ffffff2f] rounded-md bg-[#292929]">
              <Image
                src="/icons/cube.svg"
                width={20}
                height={20}
                alt="block"
                className="mx-3"
              />
              <input
                type="text"
                placeholder={
                  blocData && blocData.name ? blocData.name : "Name your Bloc"
                }
                onChange={(e) => {
                  setBlocName(e.target.value);
                }}
                className="bg-transparent border-none outline-none w-full text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor=""
              className="font-spacegrotesk text-sm text-[#FFFFFFCC]"
            >
              how do you want to host it?
            </label>
            <Dropdown
              icon="/icons/bulb.svg"
              setValue={handleOption}
              value={selectedOption}
            />
          </div>
        </div>
        <div className="my-5">
          <button
            onClick={createNewBloc}
            disabled={loading}
            className={`${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } font-spacegrotesk font-medium text-sm text-[#FFFFFFD9] bg-[#0784C6] rounded-md px-8 py-2`}
          >
            {loading ? `creating...` : `create new bloc`}
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Bloc Name"
          ariaHideApp={false}
          closeTimeoutMS={300}
        >
          <div className={`flex flex-col ${modalIsOpen ? "w-[544px] h-fit" : "w-[5px]"} overflow-hidden transition-all delay-300 duration-300 ease-linear p-8 gap-8 items-center justify-center bg-[#181818] text-white rounded-lg`}>
            {error || blocError ? (
              <div className="">{error}</div>
            ) : (
              <>
                <div className="text-center font-inter text-2xl text-[#28A1FF] font-medium">
                  Plan Limit Reached
                </div>
                <div className="w-full flex items-center justify-center">
                  <Image src="/icons/v3icons/blue_warning.svg" width={80} height={80} alt="warning" />
                </div>
                <div className="flex flex-col w-full items-center justify-center text-center text-[#F1F1F1] font-inter text-base font-medium">
                  <div className="">We appreciate your enthusiasm!</div>
                  <div className="">You&apos;ve reached the maximum usage for your current plan. To continue, consider Upgrading for more Features or Purchasing Additional Credits.</div>
                </div>
                <div className="flex items-center justify-center gap-7 w-full">
                  <button
                    onClick={handleClick}
                    className="bg-[#292929] text-sm font-spacegrotesk font-medium rounded px-9 py-3"
                  >
                    Cancel
                  </button>
                  <button className="bg-[#0784C6] text-sm font-spacegrotesk font-medium rounded px-9 py-3">
                    Upgrade
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NewBloc;

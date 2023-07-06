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

const customStyles = {
  content: {
    top: "35%",
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

const NewBloc = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { error, loading, blocData } = useSelector(
    (state: RootState) => state.newBlocState
  );
  const { error: blocError } = useSelector(
    (state: RootState) => state.newBlocState
  );

  const [modalIsOpen, setIsOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);
  const [blocName, setBlocName] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    "where will you host the bloc?"
  );

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
    router.push('/new/dashboard');
  }

  const token = getCookie("jwt");
  const createNewBloc = async () => {
    if(Object.keys(blocData).length !== 0){
      const newblocData = {
        name: blocName,
      }
      await dispatch(updateBloc(token, blocData.blocId, newblocData));
      setSuccess(true);
    }
    else{
    const blocDatas = {
      name: blocName,
      photo: "",
      initialMessage: "Hey, I am bloc! How can I help you?",
      subHeading: "",
      isPublic: false,
    };
    await dispatch(createBloc(blocDatas, token));
    setSuccess(true);
  }
  
};

  useEffect(() => {
    if (error && error !== "Too Many Requests") {
      // Notify("error", error);
      console.log("This the current error\n", error);
      openModal();
      if(modalIsOpen === false){
        dispatch(clearErrors());
      }
    }
    if(success){
      router.push("/new/creates/add");
    }

    console.log(blocData.length);

  }, [success, error]);

  return (
    <div>
      <div className="w-[452px] h-[473px] flex flex-col items-center justify-center p-16 gap-4 mb-24">
        <div className="w-full flex items-center justify-center">
          <Image
            src="/images/group-122.png"
            width={100}
            height={100}
            alt="group"
          />
        </div>
        <div className="w-full text-center font-poppins font-semibold text-[28px] text-[#FFFFFFCC]">
          Create a New Bloc
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-3">
          <div className="w-full">
            <label
              htmlFor=""
              className="font-spacegrotesk text-sm text-[#FFFFFFCC]"
            >
              lets name it first
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
                placeholder={blocData && blocData.name ? blocData.name : "Name you Bloc"}
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
            className="font-spacegrotesk font-medium text-sm text-[#FFFFFFD9] bg-[#0784C6] rounded-md px-8 py-2"
          >
            create new bloc
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          //   onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Bloc Name"
          ariaHideApp={false}
        >
          <div className="flex flex-col w-[50vw] p-8 py-10 gap-6 items-center justify-center bg-[#181818] text-white rounded-lg">
              {
                error || blocError ? (
                  <div className="">{error}</div>
                ) : (
                  <>
                  <div className="font-poppins text-3xl font-semibold">Blocs Limit Exceeded</div>
              <div className="font-spacegrotesk text-lg text-[#FFFFFFCC] text-center">
                Please upgrade your plans to create more blocs
              </div>
              <div className="flex items-center justify-center gap-7 w-full">
                <button onClick={handleClick} className="bg-[#292929] text-sm font-spacegrotesk font-medium rounded px-9 py-3">Go Back</button>
                <button className="bg-[#0784C6] text-sm font-spacegrotesk font-medium rounded px-9 py-3">Upgrade your Plan</button>
              </div>
              </>
                )
              }
            </div>

        </Modal>
      </div>
    </div>
  );
};

export default NewBloc;

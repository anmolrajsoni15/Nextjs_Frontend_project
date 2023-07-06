"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import {showNotification} from "../../Notifications/NotificationManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/app/Redux/store";
import { getCookie } from "cookies-next";
import { updateBloc } from "src/app/services/apiServices";

const options = [
  {
    name: "GPT-3.5 Turbo",
    value: "gpt3.5-turbo",
  },
  {
    name: "GPT-4",
    value: "gpt4",
  }
];

const UpdateBlocData = () => {
  const dispatch = useDispatch();
  const {blocData} = useSelector((state: RootState) => state.newBlocState);

  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "Open Ai Model"
  );
  const [rotateDegree, setRotateDegree] = useState(0);
  
  const [blocName, setBlocName] = useState("");
  const [subheading, setSubheading] = useState("");
  const [baseprompt, setBaseprompt] = useState("");
  const [initialmessage, setInitialmessage] = useState("");
  const [openaimodel, setOpenaimodel] = useState("");
  const [ispublic, setIspublic] = useState(false);
  const [paused, setPaused] = useState(false);
  const [photo, setPhoto] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputRef2 = useRef<HTMLTextAreaElement>(null);

  let blocId = getCookie("blocId");
  useEffect(() => {
    if (blocData) {
      setBlocName(blocData.name);
      setSubheading(blocData.subHeading);
      setBaseprompt(blocData.basePrompt);
      setInitialmessage(blocData.initialMessage);
      setOpenaimodel(blocData.openAiModel);
      setIspublic(blocData.isPublic);
      setPaused(blocData.isPaused);
      setPhoto(blocData.photo);
      blocId = blocData.blocId;
    }
    
  }
  , [blocData]);

  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFileInput = async(e: any) => {
    setFileName(e.target.files[0].name);
      const file = (e.target as HTMLInputElement)?.files?.[0];
      const base64String = await imageToBase64(file);
      setPhoto(base64String as string);
  };

  const handleRemove = () => {
    setFileName("");
  };

  const handleOptionClick = (value: string, names: string) => {
    setSelectedOption(names);
    setOpenaimodel(value);
    setIsOpen(false);
    setRotateDegree(0);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      inputRef.current.style.maxHeight = "100px";
      inputRef.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef.current.style.overflowY = inputRef.current.scrollHeight > 300 ? "scroll" : "hidden";

    }
    if (inputRef2.current) {
      inputRef2.current.style.height = "auto";
      inputRef2.current.style.height = inputRef2.current.scrollHeight + "px";
      inputRef2.current.style.maxHeight = "100px";
      inputRef2.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef2.current.style.overflowY = inputRef2.current.scrollHeight > 300 ? "scroll" : "hidden";

    }
  };

  const handleNotify = () => {
    
    showNotification("Cleared!", 3000);
  };

  
  const token = getCookie("jwt");

  const applySettings = async() => {
    const updatedData = JSON.stringify({
      name: blocName,
      subHeading: subheading,
      basePrompt: baseprompt,
      initialMessage: initialmessage,
      openAiModel: openaimodel,
      isPublic: ispublic,
      isPaused: paused,
      photo: photo
    })

    dispatch(updateBloc(token, blocId, updatedData));
    console.log(updatedData);
  } 


  return (
    <div className="flex flex-col w-full items-start justify-start gap-8">
      <div className="flex items-center justify-start gap-2">
        <Image src="/icons/adjustments.svg" width={30} height={30} alt="plus" />
        <div className="font-poppins font-semibold text-2xl text-[#FFFFFFCC]">
          Chat Interface
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex items-center justify-between w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            Bloc Name
          </div>
          <button onClick={() => setBlocName("")} className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]">
            reset
          </button>
        </div>
        <input
          type="text"
          value={blocName}
          onChange={(e) => setBlocName(e.target.value)}
          className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
            rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
            focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0
            "
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex items-center justify-between w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            Subheading
          </div>
          <button onClick={()=>setSubheading("")} className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]">
            reset
          </button>
        </div>
        <input
          type="text"
          value={subheading}
          onChange={(e) => setSubheading(e.target.value)}
          className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
            rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
            focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0
            "
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex items-center justify-between w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            initial message
          </div>
          <button onClick={()=>setInitialmessage("")} className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]">
            reset
          </button>
        </div>
        <textarea
          ref={inputRef2}
          value={initialmessage}
          onChange={(e) => setInitialmessage(e.target.value)}
          className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12 rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
          rows={1}
          style={{ resize: "none", height: "48px" }}
          onInput={handleInputChange}
        />
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex items-center justify-between w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            base prompt
          </div>
          <button onClick={()=>setBaseprompt("")} className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]">
            reset
          </button>
        </div>
        <textarea
          ref={inputRef}
          value={baseprompt}
          onChange={(e) => setBaseprompt(e.target.value)}
          className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12 rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
          rows={1}
          style={{ resize: "none", height: "48px" }}
          onInput={handleInputChange}
        />
      </div>
      <div className="flex flex-col w-full items-start justify-center">
        <div className="flex items-center justify-start w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            Model
          </div>
        </div>
        <div
          className="w-3/5 flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
        rounded-lg px-4 py-2
        text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
        "
        >
          <div className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
            {selectedOption}
          </div>
          <button className="bg-transparent w-[10%]" onClick={toggleDropdown}>
            <FiChevronDown
              style={{
                transform: `rotate(${rotateDegree}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </button>
        </div>
        {isOpen && (
          <ul className=" relative mt-2 top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 w-3/5 flex flex-col">
            {options.map((option) => (
              <li
                key={option.name}
                value={option.name}
                className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                onClick={() => handleOptionClick(option.value, option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col w-full items-start justify-start">
        <div className="flex items-center justify-start w-full px-1">
          <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
            update chat icon
          </div>
        </div>
        <div
          className="flex w-3/5 bg-[#292929] border border-solid border-[#FFFFFF1A] h-14
          rounded-lg px-4 py-2 gap-2"
        >
          <label
            htmlFor="input_file"
            onChange={handleFileInput}
            className="flex items-center justify-center bg-[#1C1C1C] text-white rounded font-spacegrotesk font-medium text-[10px] text-center py-1 px-8"
          >
            Choose File
            <input type="file" accept='image/*' id="input_file" className="hidden" />
          </label>
          {fileName === "" ? (
            <div className="flex items-center justify-center text-white font-spacegrotesk font-medium text-[10px] text-center">
              No file chosen
            </div>
          ) : (
            <div className="flex rounded-[5px] border-[0.7px] border-solid border-[#FFFFFF1A] bg-transparent w-[51%] items-center justify-center gap-3 p-3">
              <Image src="/icons/file.svg" alt="title" width={18} height={18} />
              <div className="text-xs font-spacegrotesk font-medium text-[#FFFFFFCC] w-9/12 truncate">
                {fileName}
              </div>
              <div onClick={handleRemove} className="">
                <Image
                  src="/icons/cross.svg"
                  alt="delete"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <button onClick={applySettings} className="font-spacegrotesk text-sm font-medium bg-[#0784C6] rounded px-8 ml-2 py-3 my-4">
        Save Changes
      </button>

    </div>
  );
};

export default UpdateBlocData;

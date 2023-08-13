"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import ColorPicker from "../../ColorPicker";

const themes = [
  {
    name: "Dark",
    value: true,
  },
  {
    name: "Light",
    value: false,
  },
];

interface Props {
  blocName: string;
  setBlocName: any;
  subheading: string;
  setSubheading: any;
  theme: boolean;
  setTheme: any;
  photo: string;
  setPhoto: any;
  isModified: boolean;
  setIsModified: any;
}

const HeaderComp: React.FC<Props> = ({
  blocName,
  setBlocName,
  subheading,
  setSubheading,
  theme,
  setTheme,
  photo,
  setPhoto,
  isModified,
  setIsModified,
}) => {
  const [samplePhoto, setSamplePhoto] = useState<any>("");
  const [isOpen3, setIsOpen3] = useState(false);
  const [rotateDegree3, setRotateDegree3] = useState(0);

  React.useEffect(() => {
    if (samplePhoto !== "") {
      setPhoto(samplePhoto);
    }
  }, [photo, samplePhoto, setSamplePhoto, setPhoto]);

  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
        if (reader.readyState === 2) {
          setSamplePhoto(reader.result as string);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFileInput = async (e: any) => {
    const file = e.target?.files?.[0];
    if (file) {
      console.log(file.name);
      try {
        const base64String = await imageToBase64(file);
        setSamplePhoto(base64String as string);
        setPhoto(base64String as string); // Update photo state after conversion is complete
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
    setRotateDegree3(isOpen3 ? 0 : 180);
  };

  const handleThemeClick = (value: boolean, names: string) => {
    setTheme(value);
    setIsOpen3(false);
    setRotateDegree3(0);
    setIsModified(true);
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="font-spacegrotesk text-whitey text-lg font-bold">Header & Theme</div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-6 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col items-start justify-between gap-2">
          <div className="font-normal font-spacegrotesk text-base text-whitey">
            Logo
          </div>
          <div className="w-[100px] h-[100px] relative flex items-center justify-center rounded-full group">
            <Image
              src={photo}
              width={90}
              height={90}
              alt="group"
              className="rounded-full"
            />
            <div className="absolute w-full h-full inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center">
              <label
                htmlFor="bot_img"
                onChange={handleFileInput}
                className="bg-[#555555] w-full h-full flex items-center justify-center bg-opacity-60 rounded-full p-2"
              >
                <input
                  type="file"
                  accept="image/*"
                  id="bot_img"
                  className="hidden"
                />

                {/* <Image src="/icons/edit.svg" alt="edit" width={50} height={50} /> */}
                <AiOutlineCamera className="text-[#ffffffc2] text-4xl" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <div className="flex items-center justify-between w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-whitey">
              Bloc Name
            </div>
            <button
              onClick={() => setBlocName("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <input
            type="text"
            value={blocName}
            placeholder="Name your Bloc"
            onChange={(e) => {
              setBlocName(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
            rounded-lg px-4 py-2
            placeholder:text-[#FFFFFF33]
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
            focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0
            "
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <div className="flex items-center justify-between w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Subheading
            </div>
            <button
              onClick={() => setSubheading("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <input
            type="text"
            value={subheading}
            placeholder="e.g. A chatbot that assist you"
            onChange={(e) => {
              setSubheading(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
            rounded-lg px-4 py-2
            placeholder:text-[#FFFFFF33] 
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
            focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0
            "
          />
        </div>
        <div className="flex flex-col w-full items-start justify-center gap-2">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Theme
            </div>
          </div>
          <div
            onClick={toggleDropdown3}
            className="w-[40%] flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
              rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base"
          >
            <div className=" w-[75%] text-[#ffffffcc] flex items-center justify-start gap-4">
              <div className="">
                {theme ? (
                  <Image
                    src="/icons/moon.svg"
                    alt="dark"
                    width={16}
                    height={16}
                  />
                ) : (
                  <Image
                    src="/icons/sun.svg"
                    alt="light"
                    width={16}
                    height={16}
                  />
                )}
              </div>
              <div className="text-[13px] leading-4 font-medium font-spacegrotesk ">
                {theme ? "Dark" : "Light"}
              </div>
            </div>
            <button
              className="bg-transparent w-[10%]"
              onClick={toggleDropdown3}
            >
              <FiChevronDown
                style={{
                  transform: `rotate(${rotateDegree3}deg)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
          {isOpen3 && (
            <ul className=" relative mt-2 top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 w-[30%] pb-0 flex flex-col">
              {themes.map((item) => (
                <li
                  key={item.name}
                  value={item.name}
                  className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                  onClick={() => handleThemeClick(item.value, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col w-full items-start justify-center gap-2">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Color
            </div>
          </div>
          <ColorPicker />
        </div>
      </div>
    </div>
  );
};

export default HeaderComp;

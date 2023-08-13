"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import { showNotification } from "../../Notifications/NotificationManager";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { getCookie, setCookie } from "cookies-next";
import { updateBloc } from "../../services/apiServices";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import ColorPicker from "../components/ColorPicker";
import {
  clearMessage,
  updateSampleQuestions,
} from "../../Redux/features/blocSlice";
import Modal from "react-modal";
import UpdateConfirmModal from "./UpdateConfirmModal";
import InfoTooltip from "../components/InfoTooltip";

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
    borderRadius: "18px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
    zIndex: 9999,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

const options = [
  {
    name: "GPT-3.5 Turbo",
    value: "gpt3.5-turbo",
  },
  {
    name: "GPT-4",
    value: "gpt4",
  },
];

const state = [
  {
    name: "Public",
    value: true,
  },
  {
    name: "Private",
    value: false,
  },
];

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

const UpdateBlocData = () => {
  const dispatch = useDispatch();
  const { blocData, message } = useSelector(
    (state: RootState) => state.newBlocState
  );

  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Open Ai Model");
  const [rotateDegree, setRotateDegree] = useState(0);
  const [rotateDegree2, setRotateDegree2] = useState(0);
  const [rotateDegree3, setRotateDegree3] = useState(0);

  const [blocName, setBlocName] = useState("");
  const [subheading, setSubheading] = useState("");
  const [baseprompt, setBaseprompt] = useState("");
  const [initialmessage, setInitialmessage] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [openaimodel, setOpenaimodel] = useState("");
  const [ispublic, setIspublic] = useState(false);
  const [theme, setTheme] = useState(true);
  const [paused, setPaused] = useState(false);
  const [photo, setPhoto] = useState("");
  const [questionList, setQuestionList] = useState<any>([""]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [isModified, setIsModified] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputRef2 = useRef<HTMLTextAreaElement>(null);
  const inputRef3 = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  let blocId = getCookie("blocId");
  useEffect(() => {
    if (blocData) {
      setBlocName(blocData.name);
      setSubheading(blocData.subHeading);
      setBaseprompt(blocData.basePrompt);
      setInitialmessage(blocData.initialMessage);
      setSupportMessage(blocData.supportMessage);
      setOpenaimodel(blocData.openAiModel);
      setIspublic(blocData.isPublic);
      setPaused(blocData.isPaused);
      setPhoto(blocData.photo);
      setTheme(blocData.isDark);
      if (blocData?.sampleQuestions?.length > 0) {
        setQuestionList(blocData.sampleQuestions);
        dispatch(updateSampleQuestions(blocData.sampleQuestions));
      } else {
        dispatch(updateSampleQuestions([""]));
      }
      blocId = blocData.blocId;
    }
  }, [blocData]);

  function imageToBase64_2(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFileInput2 = async (e: any) => {
    setFileName(e.target.files[0].name);
    const file = (e.target as HTMLInputElement)?.files?.[0];
    const base64String = await imageToBase64_2(file);
    setPhoto(base64String as string);
    setIsModified(true);
  };

  const handleRemove = () => {
    setFileName("");
  };

  const handleOptionClick = (value: string, names: string) => {
    setSelectedOption(names);
    setOpenaimodel(value);
    setIsOpen(false);
    setRotateDegree(0);
    setIsModified(true);
  };

  const handleStateClick = (value: boolean, names: string) => {
    setIspublic(value);
    setIsOpen2(false);
    setRotateDegree2(0);
    setIsModified(true);
  };

  const handleThemeClick = (value: boolean, names: string) => {
    setTheme(value);
    setIsOpen3(false);
    setRotateDegree3(0);
    setIsModified(true);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setRotateDegree(isOpen ? 0 : 180);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setRotateDegree2(isOpen2 ? 0 : 180);
  };

  const toggleDropdown3 = () => {
    setIsOpen3(!isOpen3);
    setRotateDegree3(isOpen3 ? 0 : 180);
  };

  const addQuestionList = () => {
    setQuestionList([...questionList, ""]);
    setIsModified(true);
  };

  const deleteQuestionList = (index: number) => {
    const newQuestion = [...questionList];
    newQuestion.splice(index, 1);
    if (newQuestion.length === 0) {
      newQuestion.push("");
      setQuestionList(newQuestion);
      dispatch(updateSampleQuestions(newQuestion));
      setIsModified(false);
    } else {
      setIsModified(true);
      setQuestionList(newQuestion);
      dispatch(updateSampleQuestions(newQuestion));
    }
  };

  const updateQuestionList = (index: number, newContent: string) => {
    const newQuestion = [...questionList];
    newQuestion[index] = newContent;
    setQuestionList(newQuestion);
    dispatch(updateSampleQuestions(newQuestion));
    setIsModified(true);
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      inputRef.current.style.maxHeight = "100px";
      inputRef.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef.current.style.overflowY =
        inputRef.current.scrollHeight > 300 ? "scroll" : "hidden";
    }
    if (inputRef2.current) {
      inputRef2.current.style.height = "auto";
      inputRef2.current.style.height = inputRef2.current.scrollHeight + "px";
      inputRef2.current.style.maxHeight = "100px";
      inputRef2.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef2.current.style.overflowY =
        inputRef2.current.scrollHeight > 300 ? "scroll" : "hidden";
    }
    if (inputRef3.current) {
      inputRef3.current.style.height = "auto";
      inputRef3.current.style.height = inputRef3.current.scrollHeight + "px";
      inputRef3.current.style.maxHeight = "100px";
      inputRef3.current.style.minHeight = "48px";
      // inputRef.current.style.overflow = "auto";
      inputRef3.current.style.overflowY =
        inputRef3.current.scrollHeight > 300 ? "scroll" : "hidden";
    }
  };

  const token = getCookie("jwt");

  const applySettings = async () => {
    const updatedData = JSON.stringify({
      name: blocName,
      subHeading: subheading,
      basePrompt: baseprompt,
      initialMessage: initialmessage,
      supportMessage: supportMessage,
      openAiModel: openaimodel,
      isPublic: ispublic,
      isPaused: paused,
      isDark: theme,
      photo: photo,
      primaryColor: blocData.primaryColor,
      secondaryColor: blocData.secondaryColor,
      sampleQuestions: questionList,
    });

    setIsModified(false);

    dispatch(updateBloc(token, blocId, updatedData));
    setCookie("isPublic", ispublic);
  };

  useEffect(() => {
    if (message === "success") {
      showNotification("success", "Bloc Updated Successfully!");
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }

    if (message === "error") {
      showNotification("error", "Something went wrong!");
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [message]);

  function openModal() {
    if (isModified) {
      setModalIsOpen(true);
    } else {
      router.push(`/new/bloc/${blocId}`);
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
    <div className="flex flex-col w-full items-start justify-start gap-8">
      <div className="flex items-center justify-start gap-2 relative">
        <Image src="/icons/adjustments.svg" width={30} height={30} alt="plus" />
        <div className="font-poppins font-semibold text-2xl text-[#FFFFFFCC]">
          Chat Interface
        </div>
        <div
          onClick={openModal}
          className="absolute top-[-123.5%] flex flex-row items-center justify-center rounded p-1 px-5 pl-1 gap-2 hover:shadow-md hover:bg-[#1f1f1f] hover:shadow-[#a1a1a172]"
        >
          <BsArrowLeft className="text-white text-2xl animate-shivering " />
          <span className="cursor-pointer font-spacegrotesk">{`Back`}</span>
        </div>
      </div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-8 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
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
        <div className="flex flex-col w-full items-center justify-center">
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
      </div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-8 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center justify-start gap-2 relative">
              <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
                initial message
              </div>
              <Image
                id="initial-message"
                onMouseEnter={(e) =>
                  handleInfoMouseEnter(
                    e,
                    "Shows the initial message when the chatbot is loaded",
                    "initial-message"
                  )
                }
                onMouseLeave={handleInfoMouseLeave}
                src="/icons/info.svg"
                alt="info"
                width={16}
                height={16}
                className="opacity-75"
              />
              {showTooltip && tooltipId === "initial-message" && (
                <InfoTooltip
                  text={tooltipText}
                  position="top-[-50px] left-[123px]"
                />
              )}
            </div>
            <button
              onClick={() => setInitialmessage("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <textarea
            ref={inputRef2}
            value={initialmessage}
            onChange={(e) => {
              setInitialmessage(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12 rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
            rows={1}
            style={{ resize: "none", minHeight: "48px", height: "auto" }}
            onInput={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center justify-start gap-2 relative">
              <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
                support message
              </div>
              <Image
                id="support-message"
                onMouseEnter={(e) =>
                  handleInfoMouseEnter(
                    e,
                    "Add your custom support message when chatbot is not able to answer the question",
                    "support-message"
                  )
                }
                onMouseLeave={handleInfoMouseLeave}
                src="/icons/info.svg"
                alt="info"
                width={16}
                height={16}
                className="opacity-75"
              />
              {showTooltip && tooltipId === "support-message" && (
                <InfoTooltip
                  text={tooltipText}
                  position="top-[-50px] left-[140px]"
                />
              )}
            </div>
            <button
              onClick={() => setSupportMessage("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <textarea
            ref={inputRef3}
            value={supportMessage}
            onChange={(e) => {
              setSupportMessage(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12 rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
            rows={1}
            style={{ resize: "none", minHeight: "48px", height: "auto" }}
            onInput={handleInputChange}
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-full px-1">
            <div className="flex items-center justify-start gap-2 relative">
              <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
                suggested questions
              </div>
              <Image
                id="suggested-questions"
                onMouseEnter={(e) =>
                  handleInfoMouseEnter(
                    e,
                    "Sample question which will be displayed to the user when the chatbot is loaded",
                    "suggested-questions"
                  )
                }
                onMouseLeave={handleInfoMouseLeave}
                src="/icons/info.svg"
                alt="info"
                width={16}
                height={16}
                className="opacity-75"
              />
              {showTooltip && tooltipId === "suggested-questions" && (
                <InfoTooltip
                  text={tooltipText}
                  position="top-[-50px] left-[165px]"
                />
              )}
            </div>
          </div>
          {questionList.map((question: string, index: number) => {
            return (
              <div
                key={index}
                className="w-full flex items-center justify-start my-[8px] gap-2"
              >
                <input
                  type="text"
                  value={question}
                  onChange={(e) => {
                    updateQuestionList(index, e.target.value);
                  }}
                  className="w-full bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
            rounded-lg px-4 py-2
            placeholder:text-[#FFFFFF33] 
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base
            focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0
            "
                />
                <button
                  onClick={() => {
                    deleteQuestionList(index);
                  }}
                  className={`${
                    question.trim().length > 0 ? "block" : "hidden"
                  } `}
                >
                  <Image
                    src="/icons/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            );
          })}
          <div
            onClick={addQuestionList}
            className="flex cursor-pointer ml-1 w-full items-center justify-start gap-2"
          >
            <Image src="/icons/plus.svg" alt="add" width={14} height={14} />
            <div className="font-spacegrotesk text-xs text-white">
              Add more Questions
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <div className="flex items-center justify-between w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              base prompt
            </div>
            <button
              onClick={() => setBaseprompt("")}
              className="font-spacegrotesk font-medium text-[10px] border border-solid border-[#FFFFFF1A] bg-[#292929] px-2 py-[0.5] rounded-sm text-[#FFFFFFCC]"
            >
              reset
            </button>
          </div>
          <textarea
            ref={inputRef}
            value={baseprompt}
            onChange={(e) => {
              setBaseprompt(e.target.value), setIsModified(true);
            }}
            className="w-full bg-[#292929] border border-solid border-[#FF878780] h-auto min-h-[48px] rounded-lg px-4 py-2 text-[#FFFFFFCC] font-spacegrotesk font-normal text-base focus:outline-none focus:border-[#FFFFFF1A] focus:ring-0 transition-all duration-300 ease-in-out"
            rows={2}
            style={{ resize: "none", minHeight: "48px", height: "auto" }}
            onInput={handleInputChange}
          />
          <div className="flex items-start justify-start gap-3 mt-2">
            <Image
              src="/icons/warning-sign.svg"
              width={24}
              height={24}
              alt="warning"
            />
            <div className="text-[#FFFFFF66] font-spacegrotesk font-normal text-xs">
              Changing the base prompt can significantly impact the chatbot’s
              accuracy and behavior. Proceed with caution and review the changes
              carefully. Unexpected or misleading responses may occur.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-8 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col w-full items-start justify-center">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              State
            </div>
          </div>
          <div
            className="w-3/5 flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
              rounded-lg px-4 py-2
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base"
          >
            <div className=" w-[75%] text-[13px] leading-4 font-medium font-spacegrotesk text-[#ffffffcc]">
              {ispublic ? "Public" : "Private"}
            </div>
            <button
              className="bg-transparent w-[10%]"
              onClick={toggleDropdown2}
            >
              <FiChevronDown
                style={{
                  transform: `rotate(${rotateDegree2}deg)`,
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </button>
          </div>
          {isOpen2 && (
            <ul className=" relative mt-2 top-[100%] bg-[#3d3c3c] gap-2 shadow-md rounded-md p-2 w-3/5 flex flex-col">
              {state.map((item) => (
                <li
                  key={item.name}
                  value={item.name}
                  className="p-2 cursor-pointer hover:bg-[#3e3e3e] border-b border-solid border-zinc-500"
                  onClick={() => handleStateClick(item.value, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
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
            text-[#FFFFFFCC] font-spacegrotesk font-normal text-base"
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
      </div>
      <div className="flex flex-col w-full bg-[#121212] items-start justify-start gap-8 border border-solid border-borderColor rounded-xl p-6">
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
              htmlFor="input_file_2"
              onChange={handleFileInput2}
              className="flex items-center justify-center bg-[#1C1C1C] text-white rounded font-spacegrotesk font-medium text-[10px] text-center py-1 px-8"
            >
              Choose File
              <input
                type="file"
                accept="image/*"
                id="input_file_2"
                className="hidden"
              />
            </label>
            {fileName === "" ? (
              <div className="flex items-center justify-center text-white font-spacegrotesk font-medium text-[10px] text-center">
                No file chosen
              </div>
            ) : (
              <div className="flex rounded-[5px] border-[0.7px] border-solid border-[#FFFFFF1A] bg-transparent w-[51%] items-center justify-center gap-3 p-3">
                <Image
                  src="/icons/file.svg"
                  alt="title"
                  width={18}
                  height={18}
                />
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
        <div className="flex flex-col w-full items-start justify-center">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Theme
            </div>
          </div>
          <div
            onClick={toggleDropdown3}
            className="w-[33%] flex items-center justify-between bg-[#292929] border border-solid border-[#FFFFFF1A] h-12
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
        <div className="flex flex-col w-full items-start justify-center">
          <div className="flex items-center justify-start w-full px-1">
            <div className="font-normal font-spacegrotesk text-base text-[#FFFFFFCC]">
              Color
            </div>
          </div>
          <ColorPicker />
        </div>
      </div>
      <button
        onClick={applySettings}
        className="font-spacegrotesk text-sm font-medium bg-[#0784C6] rounded px-8 ml-2 py-3 my-4"
      >
        Save Changes
      </button>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bloc Name"
        ariaHideApp={false}
        onAfterOpen={() => {
          customStyles.content.opacity = 1;
          customStyles.content.zIndex = 1000;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <UpdateConfirmModal closeModal={closeModal} BlocId={blocData.blocId} />
      </Modal>
    </div>
  );
};

export default UpdateBlocData;

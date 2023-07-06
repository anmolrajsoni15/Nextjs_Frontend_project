"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { addMessage, clearMessage } from "../../Redux/features/Message";
import { MessageState } from "../../Redux/features/Message";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { BlocState, setInitialMessage } from "../../Redux/features/blocState";
import { getBlocData } from "../../services/apiServices";

interface Props {
  colorMode?: boolean;
}

const NewChatBot: React.FC<Props> = ({colorMode}) => {
  const blocState: BlocState = useSelector(
    (store: RootState) => store.blocState
  );
  const { blocData } = useSelector((store: RootState) => store.newBlocState);
  const [InitialMsg, setInitialMsg] = useState();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [botImg, setBotImg] = useState("/landing_images/bloc_logo.svg");
  const dispatch: AppDispatch = useDispatch();
  const messages: MessageState = useSelector(
    (store: RootState) => store.Message
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const token = getCookie("jwt");
  const chatId = getCookie("chatId");
  const blocId = getCookie("blocId");

  const getBloc = async () => {
    await dispatch(getBlocData(token, blocId));
    console.log(blocData);
  };

  const getChatId = async () => {
    try {
      if (typeof blocId == "string") {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "BLOC-ID": blocId,
            },
          }
        );
        if (!res.ok) {
          console.log("Network response for bloc Initial msg was not ok!");
        }
        if (res.ok) {
          const data = await res.json();
          setCookie("chatId", data.chatId);
        }
      }
    } catch (err) {
      console.log("");
    }
  };

  useEffect(() => {
    // getBloc();
    if (blocData) {
      setInitialMsg(blocData.initialMessage);
      dispatch(setInitialMessage(blocData.initialMessage));
      if(blocData.photo){
        console.log(blocData.photo);
        setBotImg(blocData.photo);
      }
    }


    // dispatch(getBlocData(token, blocId));
    // getChatId();
  }, [blocData, dispatch]);

  const handleClick = async () => {
    dispatch(addMessage({ type: "user", text: prompt }));
    setPrompt("");
    setLoading(true);

    try {
      if (typeof chatId == "string") {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL
          }/v1/bloc/chat?query=${encodeURIComponent(prompt)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "CHAT-ID": chatId,
            },
          }
        );

        if (!res.ok) {
          dispatch(
            addMessage({
              type: "bloc",
              text: "We are facing high demands at the monent!",
            })
          );
        }
        if (res.ok) {
          const data = await res.json();
          dispatch(addMessage({ type: "bloc", text: data.response }));
          await getBloc();
        }
        if (res.status === 504 || res.status === 500) {
          dispatch(
            addMessage({
              type: "bloc",
              text: "We are facing high demands at the monent!",
            })
          );
        }
      }
    } catch (error) {
      console.log("error in Chat api: ", error);
    } finally {
      setLoading(false);
    }
  };

  const newChat = async () => {
    dispatch(clearMessage());

    const blocId = getCookie("blocId");
    const token = getCookie("jwt");

    if (typeof blocId === "string") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "BLOC-ID": blocId,
            },
          }
        );
        if (!res.ok) {
          console.log("Network response for chatid api was not ok!");
        }
        if (res.ok) {
          const response = await res.json();
          console.log(response);
          setCookie("chatId", response.chatId);
        }
      } catch (error) {
        console.log("chatId api error", error);
      }
    }
  };


  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        handleClick();
        if (inputRef.current) {
          inputRef.current.style.height = "40px";
        }
      }
    }
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
      inputRef.current.style.maxHeight = "100px";
      inputRef.current.style.minHeight = "40px";
      // inputRef.current.style.overflow = "auto";
      inputRef.current.style.overflowY =
        inputRef.current.scrollHeight > 300 ? "scroll" : "hidden";
    }
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className={`h-[460px] w-full rounded-lg border-[1px] border-borderColor ${colorMode ? "bg-white text-black" : "bg-[#0f0f0f] text-white"} flex-col`}>
      <div className={`${
          !colorMode ? "border-slate-700" : "border-slate-300"
        } h-[76px] border-b-[1px] flex items-center justify-between `}>
        <div className="flex items-center space-x-2 ml-4 py-2 ">
          <Image
            className="object-cover"
            src={botImg}
            alt="bloc logo"
            width={45}
            height={45}
          />
          <div>
            <div className={`text-3xl font-poppins font-semibold ${
                !colorMode ? "text-white" : "text-black"
              } `}>Bloc</div>
          </div>
        </div>
        <div
          className="text-[#989898] text-xs border border-solid border-[#515151] px-2 py-3 cursor-pointer rounded ml-1 mx-3 font-spacegrotesk"
          onClick={newChat}
        >
          New Chat
        </div>
      </div>
      <div className="h-[315px] overflow-y-auto ">
        <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
          <Image
            src={botImg}
            width={30}
            height={30}
            alt="bloc"
          />
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="font-inter font-medium text-sm">Bloc</div>
            <div
              className={`${
                !colorMode ? "bg-[#272727]" : "bg-[#e6e6e6]"
              } px-3 py-2 rounded-e-lg rounded-bl-lg text-base font-spacegrotesk font-normal `}
            >
              {blocState.initialMsg}
            </div>
          </div>
        </div>

        {messages.map((msg, index) => (
          <div key={index} className="space-y-2">
            {msg.type === "user" ? (
              <div className="flex items-end justify-end ml-[25%] mr-[1%]">
              <div className="flex flex-col px-2 py-2 w-fit justify-end space-x-1 ">
                <span className="text-sm font-inter font-medium">You</span>
                <span
                  className={
                    `bg-[#28A1FF] ${!colorMode ? "text-white" : "text-white"} px-[10px] py-[6px] rounded-s-lg rounded-br-lg text-base font-spacegrotesk font-normal `
                  }
                >
                  {msg.text}
                </span>
              </div>
            </div>
            ) : (
              <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
                <Image
                  src={botImg}
                  width={30}
                  height={30}
                  alt="bloc"
                />
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="font-inter font-medium text-sm">Bloc</div>
                  <span
                    className={`${
                      !colorMode ? "bg-[#272727]" : "bg-[#F2F2F2]"
                    } px-3 py-2 rounded-e-lg rounded-bl-lg text-base font-spacegrotesk font-normal `}
                  >
                    {msg.text}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
            <Image
              src={"/landing_images/bloc_logo.svg"}
              width={30}
              height={30}
              alt="bloc"
            />
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="font-inter font-medium text-sm">Bloc</div>
              <span
                className={`${
                  !colorMode ? "bg-[#272727]" : "bg-[#F2F2F2]"
                } px-3 py-2 rounded-e-lg rounded-bl-lg text-base font-spacegrotesk font-normal `}
              >
      <div className="w-8 h-3 items-center justify-center flex gap-1">
      <div
                      className={`animate-pulse w-[6px] h-[6px] ${
                        !colorMode ? "bg-slate-100" : "bg-slate-900"
                      } rounded-full`}
                    ></div>
                    <div
                      className={`w-[6px] h-[6px] ${
                        !colorMode ? "bg-white" : "bg-black"
                      } animate-bounce rounded-full`}
                    ></div>
                    <div
                      className={`w-[6px] h-[6px] ${
                        !colorMode ? "bg-slate-100" : "bg-slate-900"
                      }  animate-ping rounded-full`}
                    ></div>
        </div>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="h-[50px] mt-3 flex px-4 items-center justify-end gap-2">
        <div className="flex relative w-full flex-col-reverse items-end">
          <textarea
            ref={inputRef}
            rows={1}
            style={{
              resize: "none",
              height: "40px",
              position: "absolute",
              bottom: "-20px",
            }}
            onKeyDown={handleKey}
            onInput={handleInputChange}
            onChange={(e) => setPrompt(e.target.value)}
            className={`${
              !colorMode
                ? "bg-[#121212] text-white"
                : "bg-transparent text-[#000000a2]"
            } w-full overflow-hidden border-[1px] h-[40px] border-[#434343] rounded-lg px-2 py-1 pt-2 text-base font-inter font-normal focus:outline-none`}
            placeholder={""}
            value={prompt}
          />
        </div>
        <div
          onClick={handleClick}
          className={`${
            !colorMode ? " bg-[#121212]" : "bg-[#d8eeff]"
          } flex items-center justify-center w-[40px] h-[40px] border-[#434343] border-[1px] hover:cursor-pointer p-2 rounded`}
        >
          <Image
            src="/dashboard/send.svg"
            alt=""
            className=""
            width={35}
            height={35}
          />
        </div>
      </div>
    </div>
  );
};

export default NewChatBot;

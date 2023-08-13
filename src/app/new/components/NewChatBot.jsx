"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  clearMessage,
  updateMessage,
} from "../../Redux/features/Message";
import ScrollableFeed from "react-scrollable-feed";
import { IoPaperPlaneOutline } from "react-icons/io5";
import Image from "next/image";
import { getCookie, setCookie } from "cookies-next";
import { BlocState, setInitialMessage } from "../../Redux/features/blocState";
import {
  blocExists,
  getBlocData,
  getPublicBlocData,
} from "../../services/apiServices";
import {
  getAllSampleQuestions,
  removeAllSampleQuestions,
  removeSampleQuestion,
  updateSampleQuestions,
} from "src/app/Redux/features/blocSlice";

const NewChatBot = () => {
  const controllerRef = useRef(null);

  const blocState = useSelector((store) => store.blocState);
  const { blocData, sampleQuestions } = useSelector(
    (store) => store.newBlocState
  );
  const [InitialMsg, setInitialMsg] = useState();
  const [prompt, setPrompt] = useState("");
  const [samplePrompt, setSamplePrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [colorMode, setColorMode] = useState();
  const [botImg, setBotImg] = useState("/landing_images/bloc_logo.svg");
  const [primary, setPrimary] = useState("#e19b63");
  const [secondary, setSecondary] = useState("#28a1ff1a");
  const dispatch = useDispatch();
  const messages = useSelector((store) => store.Message);

  const inputRef = useRef(null);

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
    (async () => {
      const data = await blocExists(blocId);
      if (data) {
        setCookie("isPublic", data.isPublic);
      }
      if (data.isPublic) {
        dispatch(getPublicBlocData(blocId));
      } else {
        dispatch(getBlocData(token, blocId));
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    // getBloc();
    if (blocData) {
      setInitialMsg(blocData.initialMessage);
      setColorMode(blocData.isDark ? false : true);
      dispatch(setInitialMessage(blocData.initialMessage));
      dispatch(getAllSampleQuestions());
      if (blocData.photo && blocData.photo !== "ByteArray") {
        setBotImg(blocData.photo);
      }
    }

    // dispatch(getBlocData(token, blocId));
    // getChatId();
  }, [blocData, dispatch, setColorMode, setInitialMsg, setBotImg]);

  useEffect(() => {
    if (blocData && blocData.primaryColor && blocData.secondaryColor) {
      setPrimary(blocData.primaryColor);
      setSecondary(blocData.secondaryColor);
    }
    console.log(primary);
  }, [setPrimary, blocData.primaryColor, blocData.secondaryColor]);

  const isPublic = getCookie("isPublic");

  const handleClick = async (sampleVal) => {
    if (sampleVal) {
      dispatch(addMessage({ type: "user", text: sampleVal }));
      await setPrompt(sampleVal);
    } else {
      dispatch(addMessage({ type: "user", text: prompt }));
      dispatch(removeAllSampleQuestions());
    }
    setPrompt("");

    if (inputRef.current) {
      inputRef.current.style.height = "40px";
    }

    const controller = new AbortController(); // Create a new AbortController
    controllerRef.current = controller;

    const currId = Date.now();

    if (typeof chatId == "string") {
      if (isPublic) {
        setLoading(true);
        try {
          const timeoutID = setTimeout(() => {
            if (controllerRef.current) {
              controllerRef.current.abort();
              controllerRef.current = null;
              dispatch(
                addMessage({
                  type: "error",
                  text: "Something went wrong! Please try again.",
                })
              );
            }
          }, 60000);

          const res = await fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL
            }/v1/bloc/stream-chat?query=${encodeURIComponent(
              prompt || sampleVal
            )}`,
            {
              headers: {
                "CHAT-ID": chatId,
              },
              signal: controllerRef.current.signal,
            }
          );

          if (!res.ok) {
            dispatch(
              addMessage({
                id: currId,
                type: "bloc",
                text: "We are facing high demands at the monent!",
              })
            );
          }

          if (res.ok) {
            clearTimeout(timeoutID);

            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            setLoading(false);
            dispatch(
              addMessage({ id: currId, type: "bloc", text: "Loading..." })
            );
            let done, value;
            while (!done) {
              ({ value, done } = await reader.read());
              value = decoder.decode(value);
              if (done) {
                console.log("Stream complete");
                return;
              }

              dispatch(
                updateMessage({ id: currId, type: "bloc", text: value })
              );
            }
          }
        } catch (error) {
          console.log("error in Chat api: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const token = getCookie("jwt");
          const chatId = getCookie("chatId");

          const timeoutID = setTimeout(() => {
            if (controllerRef.current) {
              controllerRef.current.abort();
              controllerRef.current = null;
              dispatch(
                addMessage({
                  type: "error",
                  text: "Something went wrong! Please try again.",
                })
              );
            }
          }, 60000);

          if (typeof chatId == "string") {
            setLoading(true);
            const res = await fetch(
              `${
                process.env.NEXT_PUBLIC_BASE_URL
              }/v1/bloc/stream-chat?query=${encodeURIComponent(
                prompt || sampleVal
              )}`,
              {
                headers: {
                  "CHAT-ID": chatId,
                },
                signal: controllerRef.current.signal,
              }
            );

            if (!res.ok) {
              dispatch(
                addMessage({
                  id: currId,
                  type: "bloc",
                  text: "We are facing high demands at the monent!",
                })
              );
            }

            if (res.ok) {
              clearTimeout(timeoutID);

              const reader = res.body.getReader();
              const decoder = new TextDecoder("utf-8");
              setLoading(false);
              dispatch(
                addMessage({ id: currId, type: "bloc", text: "Loading..." })
              );
              let done, value;
              while (!done) {
                ({ value, done } = await reader.read());
                value = decoder.decode(value);
                if (done) {
                  console.log("Completed stream chat");
                  return;
                }

                dispatch(
                  updateMessage({ id: currId, type: "bloc", text: value })
                );
              }
            }
          }
        } catch (error) {
          console.log("error in Chat api: ", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const newChat = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    dispatch(clearMessage());
    setLoading(true);
    const blocId = getCookie("blocId");
    const token = getCookie("jwt");
    const isPublic = getCookie("isPublic");

    if (typeof blocId === "string") {
      if (isPublic == false) {
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
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-public-chatId`,
            {
              headers: {
                "BLOC-ID": blocId,
              },
            }
          );
          if (!res.ok) {
            console.log("Network response for public chatid api was not ok!");
          }
          if (res.ok) {
            const response = await res.json();
            console.log(response);
            setCookie("chatId", response.chatId);
          }
        } catch (error) {
          console.log("chatId public api error", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleKey = (e) => {
    if (prompt !== "") {
      if (e.key === "Enter") {
        if (!e.shiftKey) {
          e.preventDefault();
          handleClick();
          if (inputRef.current) {
            inputRef.current.style.height = "40px";
          }
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

  useEffect(() => {
    console.log(prompt);
  }, [prompt]);

  return (
    <div
      className={`h-[550px] w-full max-w-[450px] rounded-lg border-[1px] border-borderColor ${
        colorMode ? "bg-white text-black" : "bg-[#0f0f0f] text-white"
      } flex-col items-start justify-start relative z-[0] `}
    >
      <div
        className={`${
          !colorMode ? "border-slate-700" : "border-slate-300"
        } h-[76px] border-b-[1px] flex items-center justify-between `}
      >
        <div className="flex items-center space-x-2 ml-4 py-2 ">
          <Image
            className="object-cover"
            src={botImg}
            alt="bloc logo"
            width={45}
            height={45}
          />
          <div>
            <div
              className={`text-3xl font-poppins font-semibold ${
                !colorMode ? "text-white" : "text-black"
              } `}
            >
              {blocData && blocData.name ? blocData.name : "Bloc"}
            </div>
            <div
              className={`font-spacegrotesk text-xs font-normal ${
                !colorMode ? "text-[#FFFFFFCC]" : "text-[#121212]"
              }`}
            >
              {blocData && blocData.subHeading ? blocData.subHeading : ""}
            </div>
          </div>
        </div>
        <button
          className={`bg-transparent cursor-pointer text-[#989898] text-xs border border-solid border-[#515151] px-2 py-3 rounded ml-1 mx-3 font-spacegrotesk`}
          onClick={newChat}
        >
          New Chat
        </button>
      </div>
      <div className="h-[375px] overflow-y-auto ">
        <ScrollableFeed className="w-full h-full flex flex-col items-start justify-between gap-4">
          <div className="w-full flex-1 ">
            <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
              <Image src={botImg} width={30} height={30} alt="bloc" />
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="font-inter font-medium text-sm">
                  {blocData && blocData.name ? blocData.name : "Bloc"}{" "}
                </div>
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
                      <span className="text-sm font-inter font-medium">
                        YOU
                      </span>
                      <div
                        style={{
                          backgroundColor: `${primary}`,
                        }}
                        className={`${
                          !colorMode ? "text-white" : "text-white"
                        } px-[10px] py-[6px] rounded-s-lg rounded-br-lg text-base font-spacegrotesk font-normal `}
                      >
                        <pre className="w-[100%] whitespace-break-spaces font-spacegrotesk text-base">
                          {msg.text}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : msg.type === "bloc" ? (
                  <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
                    <Image src={botImg} width={30} height={30} alt="bloc" />
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="font-inter font-medium text-sm">
                        {blocData && blocData.name ? blocData.name : "Bloc"}
                      </div>
                      <div
                        className={`${
                          !colorMode ? "bg-[#272727]" : "bg-[#F2F2F2]"
                        } px-3 py-2 rounded-e-lg rounded-bl-lg text-base font-spacegrotesk font-normal `}
                      >
                        {msg.text === "Loading..." ? (
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
                        ) : (
                          // <pre className="w-[100%] whitespace-break-spaces font-spacegrotesk text-base">
                          <div className="botResponse" dangerouslySetInnerHTML={{ __html: msg.text }} />
                          // </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-start px-2 py-2 space-x-1 mr-[15%] mt-2 gap-2">
                    <Image src={botImg} width={30} height={30} alt="bloc" />
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="font-inter font-medium text-sm">
                        {blocData && blocData.name ? blocData.name : "Bloc"}
                      </div>
                      <div
                        className={`border-[#FF878780] border-solid border text-[#ff6c6cc5] bg-transparent px-3 py-2 rounded-e-lg rounded-bl-lg text-base font-spacegrotesk font-normal `}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start justify-start px-2 py-3 space-x-1 mr-[15%] mt-2 gap-2">
                <Image src={botImg} width={30} height={30} alt="bloc" />
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="font-inter font-medium text-sm">
                    {blocData && blocData.name ? blocData.name : "Bloc"}
                  </div>
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
          <div className="w-full h-fit">
            {sampleQuestions?.length > 0 && (
              <div
                style={{
                  bottom: "-16px",
                }}
                className={`relative self-end z-50 w-full flex justify-end items-start flex-wrap gap-2 px-4 ${
                  colorMode ? "bg-white" : "bg-[#0f0f0f]"
                } `}
              >
                {sampleQuestions?.map((question, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colorMode
                          ? `${secondary}`
                          : "rgba(16, 24, 40, 0.05)",
                        border: colorMode ? "none" : "1px solid #292929",
                        color: !colorMode ? "#AEAEAE" : "#3D3D3D",
                      }}
                      onClick={() => {
                        handleClick(question);
                        setTimeout(() => {
                          dispatch(removeSampleQuestion(question));
                        }, 300);
                      }}
                      className={`flex w-fit rounded-2xl cursor-pointer hover:border-[#6e6e6e] hover:border hover:border-solid text-right font-spacegrotesk text-sm font-normal items-center justify-start px-[14px] py-[5px] gap-2 ${
                        question.length > 0 ? "flex" : "hidden"
                      } `}
                    >
                      {question}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollableFeed>
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
            onMouseEnter={(e) => {
              !colorMode
                ? (e.target.style.borderColor = "#888")
                : (e.target.style.borderColor = primary);
            }}
            onMouseLeave={(e) => {
              !colorMode
                ? (e.target.style.borderColor = "#434343")
                : (e.target.style.borderColor = "#888");
            }}
            onKeyDown={handleKey}
            onInput={handleInputChange}
            disabled={loading}
            onChange={(e) => setPrompt(e.target.value)}
            className={`${
              !colorMode
                ? !loading
                  ? "bg-[#121212] text-white"
                  : "bg-[#212121e2] cursor-not-allowed"
                : !loading
                ? "bg-transparent text-[#000000a2]"
                : "bg-[#c5c5c596] cursor-not-allowed"
            } w-full overflow-hidden border-[1px] h-[40px] border-[#434343] rounded-lg px-2 py-1 pt-2 text-base font-inter font-normal
            focus:outline-none focus:ring-0
             `}
            placeholder={""}
            value={prompt}
          />
        </div>
        <button
          onClick={handleClick}
          disabled={loading || prompt.length === 0}
          style={{
            backgroundColor: `${secondary}`,
            color: !colorMode ? "#888" : primary,
          }}
          onMouseEnter={(e) => {
            !colorMode
              ? (e.target.style.borderColor = "#434343")
              : (e.target.style.borderColor = primary);
          }}
          onMouseLeave={(e) => {
            !colorMode
              ? (e.target.style.borderColor = "#434343")
              : (e.target.style.borderColor = "#888");
          }}
          className={`${
            !colorMode
              ? !loading
                ? "bg-[#121212]"
                : "bg-[#212121e2] cursor-not-allowed"
              : !loading
              ? "bg-[#E9F5FF]"
              : "bg-[#c5c5c596] cursor-not-allowed"
          } flex items-center justify-center w-[40px] h-[40px] border-[1px] p-2 text-2xl rounded`}
        >
          <IoPaperPlaneOutline style={{ fontWeight: "bolder" }} />
        </button>
      </div>
      <div className="flex w-full gap-1 mt-1 items-start justify-center text-[#A6A6A6]">
        <span className="font-inter">Powered by</span>{" "}
        <span
          className={`${
            !colorMode ? "text-white" : "text-black"
          } font-poppins text-lg`}
        >
          Bloc
        </span>
      </div>
    </div>
  );
};

export default NewChatBot;

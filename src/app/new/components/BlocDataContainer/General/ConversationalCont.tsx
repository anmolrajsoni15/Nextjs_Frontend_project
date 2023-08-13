"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import InfoTooltip from "../../InfoTooltip";

interface Props {
  initialmessage: string;
  setInitialmessage: any;
  supportMessage: string;
  setSupportMessage: any;
  setIsModified: any;
}

const ConversationalCont: React.FC<Props> = ({
  initialmessage,
  setInitialmessage,
  supportMessage,
  setSupportMessage,
  setIsModified,
}) => {
  const inputRef2 = useRef<HTMLTextAreaElement>(null);
  const inputRef3 = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = () => {
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
    <div className="flex flex-col w-full gap-5">
      <div className="font-spacegrotesk text-whitey text-lg font-bold">
        Conversation Controls
      </div>
      <div className="flex flex-col bg-[#121212] w-full items-start justify-start gap-6 border border-solid border-borderColor rounded-xl p-6">
        <div className="flex flex-col w-full items-center justify-center gap-2">
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
        <div className="flex flex-col w-full items-center justify-center gap-2">
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
      </div>
    </div>
  );
};

export default ConversationalCont;

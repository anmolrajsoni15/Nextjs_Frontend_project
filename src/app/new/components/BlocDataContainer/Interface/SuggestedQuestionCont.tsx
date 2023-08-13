"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSampleQuestions } from "../../../../Redux/features/blocSlice";
import Image from "next/image";
import InfoTooltip from "../../InfoTooltip";

interface Props {
  questionList: any;
  setQuestionList: any;
  setIsModified: any;
}

const SuggestedQuestionCont: React.FC<Props> = ({
  questionList,
  setQuestionList,
  setIsModified,
}) => {
  const dispatch = useDispatch();

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

  return (
    <div className="flex flex-col w-full items-center justify-center gap-5">
      <div className="flex items-center justify-between w-full px-1">
        <div className="flex items-center justify-start gap-2 relative">
          <div className="font-bold font-spacegrotesk text-lg text-whitey">
            Suggested Questions
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
              position="top-[-50px] left-[200px]"
            />
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center p-6 gap-[11px] bg-compColor2 rounded-lg border border-solid border-borderColor ">
        <div className="font-spacegrotesk text-base">{`(Sample Questions)`}</div>
        <div className="w-full flex flex-col items-start justify-center">
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
        </div>
        <div
          onClick={addQuestionList}
          className="flex cursor-pointer ml-1 w-full items-center justify-start gap-2"
        >
          <Image src="/icons/plus.svg" alt="add" width={14} height={14} />
          <div className="font-spacegrotesk text-xs text-[#E3E3E3]">
            Add more Questions
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedQuestionCont;

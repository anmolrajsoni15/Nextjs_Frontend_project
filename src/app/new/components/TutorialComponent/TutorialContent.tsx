import { deleteCookie, setCookie } from "cookies-next";
import React from "react";

interface Props {
    width: number,
    height: number,
    top: number,
    left: number,
    customStyles: any,
    handleClose: () => void,
}

const TutorialContent: React.FC<Props> = ({width, height, top, left, customStyles, handleClose}) => {

  return (
    <div
      style={
        {
          "--cutout-width": `${customStyles.insidePart.width}`,
          "--cutout-height": `${customStyles.insidePart.height}`,
          "--cutout-top": `${customStyles.insidePart.top}`,
            "--cutout-left": `${customStyles.insidePart.left}`,
        } as any
      }
      className="cutout"
    >
      <div style={{top: `${customStyles.messageBox.top}`, left: `${customStyles.messageBox.left}`, width: `${customStyles.messageBox.width}`}} className="text-white bg-[#2a2a2a] rounded-md px-5 py-4 flex flex-col items-start justify-start gap-3 absolute !z-[9000]">
        <div className="">Step {customStyles.message.step}</div>
        <div className="">{ customStyles.message.messageText }</div>
        <button className="mx-auto bg-primary px-8 py-2 rounded" onClick={handleClose}>Skip Tutorial</button>
      </div>
    </div>
  );
};

export default TutorialContent;

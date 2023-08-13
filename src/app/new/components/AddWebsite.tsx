import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { addWebsites, listWebPages } from "../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import TutorialContent from "./TutorialComponent/TutorialContent";
import { setCloseTutorial, setOldUser } from "../../Redux/features/Tutorial";

interface Props{
  showWelcome: any;
}


const tutorialStyles ={
  insidePart: {
    width: '92%',
    height: '130px',
    top: '-60px',
    left: '30px',
  },
  messageBox:{
    width: '500px',
    top: '-165px',
    left: '-150px',
  },
  message:{
    step: 3,
    messageText: "Add your website URL here.",
  }
}

const AddWebsite: React.FC<Props> = ({showWelcome}) => {
  const dispatch = useDispatch();

  const { newUser, showTutorial } = useSelector(
    (state: RootState) => state.tutorial
    );
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!showWelcome) {
      setTimeout(() => {
      setShow(true);
      }, 1010);
    }
  }
  , [showWelcome]);

  const generateFullURL = (partialURL: string) => {
    // Regex pattern to detect various URL formats
    const urlRegex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');

    // Test if the input matches the URL regex pattern
    console.log(urlRegex.exec(partialURL));
    if (urlRegex.test(partialURL)) {
      console.log("from here", partialURL);
      return partialURL;
    } else {
      // Check if the input starts with "www."
      // if (partialURL.startsWith("www.")) {
        if (partialURL.includes(".")) {
          const generatedURL = `https://${partialURL}`;
          console.log(generatedURL);
          return generatedURL;
        } else {
          // If no subdomain is provided, add "www." to the input
          const generatedURL = `https://www.${partialURL}`;
          console.log(generatedURL);
          return generatedURL;
        }

        // const generatedURL = `https://${partialURL}`;
      // } else {
      //   const generatedURL = `https://www.${partialURL}`;
      //   console.log(generatedURL);
      //   return generatedURL;
      // }
    }
  };

  const checkUrl = (url: string) => {
    if (url.includes("https://")) {
      return url;
    } else {
      if(!url.includes("https://") && url.includes("www."))
        return "https://" + url;
      else if(!url.includes("https://") && !url.includes("www."))
        return "https://www." + url;
      else
        return url;
    }
  };

  const handleAddWebsite = async() => {
    const token = getCookie("jwt");
    const completeUrl = checkUrl(url);
    dispatch(listWebPages(token, completeUrl));
    setShow(false);
  };

  function handleCloseTutorial(){
    setShow(false);
    dispatch(setCloseTutorial());
    dispatch(setOldUser());
  }

  return (
    <>
    {
      newUser && !showWelcome && show && (
        <div className="absolute w-[70%]"><TutorialContent width={150} height={80} top={60} left={0} customStyles={tutorialStyles} handleClose={handleCloseTutorial} /></div>
      )
    }
    <div className={` ${show ? "z-[6000]" : ""} flex items-center justify-center gap-4 w-2/3 h-12 `}>
      <div className="flex items-center justify-start w-[85%] h-full border border-solid border-[#ffffff2d] rounded-md">
        <div className="w-[15%] border-r border-solid border-[#ffffff2d] h-full flex items-center justify-center text-[#FFFFFFCC] font-spacegrotesk text-lg">
          https://
        </div>
        <div className="w-[85%]">
          <input
            type="text"
            placeholder="www.yourwebsite.xyz"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-transparent border-none outline-none w-full text-[#FFFFFFCC] font-spacegrotesk text-lg placeholder:text-[#FFFFFF7d] font-medium px-5"
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-[17%] h-full rounded-md">
        <button onClick={handleAddWebsite} className="bg-[#ffffff2f] border-none outline-none text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium flex items-center justify-start rounded-md h-full w-full">
          <Image
            src="/icons/plus.svg"
            width={16}
            height={16}
            alt="block"
            className="mx-3"
          />
          <div className="pr-2">Fetch Links</div>
        </button>
      </div>
    </div>
    </>
  );
};

export default AddWebsite;

"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { listWebPages } from "../../../../services/apiServices";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RootState } from "../../../../Redux/store";
import WebsiteList from "../../WebsiteList";
import Modal from "react-modal";
import WebsiteLoading from "./WebsiteLoading";
import LayoutEffect from "src/app/components/LayoutEffect";

interface Props {
  isModified: boolean;
  setIsModified: any;
}

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

const WebsiteCont:React.FC<Props> = ({
  isModified,
  setIsModified
}) => {
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");

  const router = useRouter();
  const { urls, loading: fetchingLoad } = useSelector(
    (store: RootState) => store.addWebsite
  );

  const checkUrl = (url: string) => {
    if (url.includes("https://")) {
      return url;
    } else {
      if (!url.includes("https://") && url.includes("www."))
        return "https://" + url;
      else if (!url.includes("https://") && !url.includes("www."))
        return "https://www." + url;
      else return url;
    }
  };

  const handleAddWebsite = async () => {
    const token = getCookie("jwt");
    const completeUrl = checkUrl(url);
    dispatch(listWebPages(token, completeUrl));
  };

  return (
    <LayoutEffect
        className="duration-300 delay-50"
        isInviewState={{
          trueState: "opacity-1",
          falseState: "opacity-0",
        }}
      >
    <div className="w-full bg-modalBg border border-solid border-[#2F2F2F] px-20 py-10 rounded-3xl">
      <div className="flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-8 mb-2">
          <div className="flex items-center justify-start w-[75%] h-full border border-solid border-[#ffffff2d] rounded-md">
            <div className="w-[15%] px-6 py-4 border-r border-solid border-[#ffffff2d] h-full flex items-center justify-center text-[#FFFFFFCC] font-spacegrotesk text-lg">
              <Image
                src="/icons/v3icons/link2.svg"
                width={24}
                height={24}
                alt="link"
              />
            </div>
            <div className="w-[85%]">
              <input
                type="text"
                placeholder="https://www.yourwebsite.xyz"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-[#FFFFFFCC] font-spacegrotesk text-lg placeholder:text-[#FFFFFF7d] font-medium px-5"
              />
            </div>
          </div>
          <div className="flex items-center justify-center w-[23%] gap-2 h-full rounded-md">
            <button
              onClick={handleAddWebsite}
              className="bg-primary py-[14px] px-[14px] border-none outline-none text-sm font-spacegrotesk text-[#ffffff7d] placeholder:text-[#FFFFFF33] font-medium flex items-center justify-start gap-1 rounded-md h-full w-full"
            >
              <Image src="/icons/plus.svg" width={16} height={16} alt="block" />
              <div className="font-spacegrotesk text-lg font-medium text-center text-white">
                Fetch Links
              </div>
            </button>
          </div>
        </div>
        <div
          className={`${
            urls.length > 0 ? "hidden" : "flex"
          } w-full items-start justify-start text-white font-spacegrotesk text-[13px] `}
        >
          {`This will crawl all the links starting with the URL (not including files on the website).`}
        </div>
      </div>
      {fetchingLoad ? (
        <Modal
          isOpen={fetchingLoad}
          //   onAfterOpen={afterOpenModal}
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
          <WebsiteLoading />
        </Modal>
      ) : (
        <div
          className={`w-full ${
            urls && urls.length > 0 ? "flex" : "hidden"
          } items-center justify-center flex-col mt-9`}
        >
          <WebsiteList data={urls} isModified={isModified} setIsModified={setIsModified} />
        </div>
      )}
    </div>
    </LayoutEffect>
  );
};

export default WebsiteCont;

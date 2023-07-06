"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  getUser,
  getAllIntegrationOfBloc,
  getBlocData,
  getPrivateChatId,
} from "../../../../services/apiServices";
import Modal from "react-modal";
import { getCookie, setCookie } from "cookies-next";
import Sidebar from "../../../components/Sidebar";
import TokenCard from "../../../components/TokenCard";
import NewChatContainer from "../../../components/NewChatContainer";
import UpdateBlocData from "../../../components/UpdateBlocData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";

import { WhatsappShareButton, EmailShareButton } from "next-share";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";


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
    borderRadius: "10px",
    padding: "none",
    boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
    transition: "opacity 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    transition: "background-color 0.3s ease-in-out",
  },
};

interface Params {
  params: {
    blocId: string;
  };
}

const Page = ({ params: { blocId } }: Params) => {
  const dispatch = useDispatch();
  const router = useRouter();

  setCookie("blocId", blocId);

  // const [user, setUser] = React.useState<any>({});
  const blocData = useSelector(
    (state: RootState) => state.newBlocState.blocData
  );

  const chatId = useSelector((state: RootState) => state.newBlocState.chatId);

  const { user, loading } = useSelector((state: RootState) => state.user);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const token = blocId;
  const userToken = getCookie("jwt");

  

  useEffect(() => {
    dispatch(getUser(userToken));
    dispatch(getBlocData(userToken, token));
    dispatch(getPrivateChatId(userToken, token));

  }, [dispatch]);
  
  useEffect(() => {
    if (chatId !== undefined) {
      setCookie("chatId", chatId);
    }
  }, [chatId]);

  


  const url = `https://baseUrl/bloc/${blocId}`;

  const [isClicked, setIsClicked] = useState(false);
  const [isEmbedClicked, setIsEmbedClicked] = useState(false);
  const [isMobileClicked, setIsMobileClicked] = useState(false);

  const handleCopy = (e: any) => {
    navigator.clipboard.writeText(url);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleEmbed = () => {
    setIsMobileClicked(false);
    setIsEmbedClicked(!isEmbedClicked);
  };

  const ref = useRef<HTMLDivElement>(null);
  const toggleMobile = () => {
    if (ref.current) {
      ref.current.scrollTop += 50;
    }
    setIsEmbedClicked(false);
    setIsMobileClicked(!isMobileClicked);
  };

  return (
    <main className="w-full h-full flex" id="my-container">
      <Sidebar userData={user} />
      <div className="w-full h-full flex flex-col items-center justify-start ml-20 md:ml-24">
        <div className="w-full flex items-start justify-between p-9 mb-6">
          <div className="flex items-start justify-center gap-4">
            <div className="rounded-full">
              <Image src="/images/Brand.png" alt="img" width={80} height={80} />
            </div>
            <div className="flex flex-col items-start justify-center">
              <div className="font-poppins font-bold text-[40px] text-[#FFFFFFCC]">
                {blocData.name}
              </div>
              <div className="font-spacegrotesk font-medium text-base leading-6 text-[#FFFFFFCC]">
                A chatbot for customer support on Amazon{" "}
              </div>
            </div>
            <div className="bg-[#141414] border border-solid rounded-full p-2 border-[#FFFFFF1A]">
              <Image src="/icons/edit.svg" alt="edit" width={14} height={14} />
            </div>
          </div>
          <TokenCard userData={user} />
        </div>
        <div className="flex flex-col items-center justify-center gap-9 w-full mb-20">
          <div className="w-full flex items-start justify-center px-12 gap-24">
            <div className="flex flex-col items-center justify-start w-1/2">
              <UpdateBlocData />
              
            </div>
            <div className="flex items-start justify-start w-1/2">
              <NewChatContainer blocData={blocData} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Bloc Name"
        ariaHideApp={false}
        onAfterOpen={() => {
          customStyles.content.opacity = 1;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <div className="flex flex-col w-[35vw] h-[520px] p-8 py-10 gap-5 items-center justify-start bg-[#181818] text-white rounded-lg">
          <div
            ref={ref}
            className="flex flex-col w-full h-[80%] overflow-y-auto gap-5 items-center justify-start"
          >
            <Image
              src="/icons/badge-check.svg"
              width={70}
              height={70}
              alt="tick"
            />
            <div className="font-spacegrotesk text-3xl font-medium text-[#FFFFFFCC] text-center">
              {blocData.name} is now live!
            </div>
            <div className="font-spacegrotesk text-sm text-[#FFFFFFCC] text-center font-medium">
              share with your frens
            </div>
            <div className="w-full flex items-center gap-2 justify-between bg-[#FFFFFF1A] border border-solid border-[#FFFFFF1A] rounded-md px-[10px] py-2">
              <div className="flex items-center justify-center w-[10%]">
                <Image
                  src="/icons/globe.svg"
                  width={20}
                  height={20}
                  alt="internet"
                />
              </div>
              <div className="w-[75%] truncate font-spacegrotesk font-normal text-base text-[#FFFFFFB2]">
                {url}
              </div>
              <div className="w-[15%]">
                <div
                  onClick={handleCopy}
                  className={`w-10 h-9 border-[0.5px] border-[#FFFFFF1A] border-solid rounded-sm flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                    isClicked ? "bg-[#373737]" : "bg-[#272727]"
                  }`}
                >
                  <Image
                    src="/icons/clipboard-copy.svg"
                    width={18}
                    height={18}
                    alt="copy"
                    className={`transition-transform duration-300 ${
                      isClicked ? "scale-75" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center gap-4">
              <WhatsappShareButton url={url}>
                <div className="bg-[#2A2A2D] rounded-full p-5">
                  <Image
                    src="/icons/whatsapp.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </WhatsappShareButton>
              <EmailShareButton url={url}>
                <div className="bg-[#2A2A2D] rounded-full p-5">
                  <Image
                    src="/icons/alternate-email.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </EmailShareButton>
              <div className="bg-[#2A2A2D] rounded-full p-5">
                <Image src="/icons/slack.svg" alt="" width={20} height={20} />
              </div>
              <div
                onClick={toggleEmbed}
                className="bg-[#2A2A2D] rounded-full p-5"
              >
                <Image src="/icons/code.svg" alt="" width={20} height={20} />
              </div>
              <div
                onClick={toggleMobile}
                className="bg-[#2A2A2D] rounded-full p-5"
              >
                <Image src="/icons/mobile.svg" alt="" width={20} height={20} />
              </div>
            </div>
            <div
              className={`flex flex-col w-11/12 items-center justify-center gap-5 mt-4 ${
                isEmbedClicked ? "flex" : "hidden"
              }`}
            >
              <div className="text-center font-spacegrotesk text-2xl font-medium text-[#FFFFFFCC]">
                Embed on Web App
              </div>
              <div className="text-center font-spacegrotesk font-medium text-sm leading-[18px] text-[#FCFCFD]">
                To add the Bloc any where on your website, add this iframe to
                your html code
              </div>
              <div className="bg-[#FFFFFF1A] w-full rounded-md items-start flex justify-between p-2">
                <div className="w-3/4">{`<iframe src="https://www.bloc.co/chatbot-iframe/www-bloc-co-zf5ylnnju" width="100%" height="700" frameborder="0" ></iframe>`}</div>
                <div
                  onClick={handleCopy}
                  className={`w-10 h-9 border-[0.5px] border-[#FFFFFF1A] border-solid rounded-sm flex items-center justify-center cursor-pointer transition-transform duration-300 ${
                    isClicked ? "bg-[#373737]" : "bg-[#272727]"
                  }`}
                >
                  <Image
                    src="/icons/clipboard-copy.svg"
                    width={18}
                    height={18}
                    alt="copy"
                    className={`transition-transform duration-300 ${
                      isClicked ? "scale-75" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`flex flex-col w-11/12 items-center justify-center gap-5 mt-4 ${
                isMobileClicked ? "flex" : "hidden"
              }`}
            >
              <div className="text-center font-spacegrotesk text-2xl font-medium text-[#FFFFFFCC]">
                Open on Mobile
              </div>
              <div className="text-center font-spacegrotesk font-medium text-sm leading-[18px] text-[#FCFCFD]">
                Scan with your phone&apos;s camera or QR code app to view
              </div>
              <div className="bg-[#FFFFFF1A] w-full rounded-xl border-2 border-solid border-[#484C56] items-center flex justify-center p-3">
                <QRCode
                  size={512}
                  style={{ height: "auto", maxWidth: "45%", width: "45%" }}
                  value={url}
                  fgColor="#F1F1F1"
                  bgColor="#000000"
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Page;

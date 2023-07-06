"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { WhatsappShareButton, EmailShareButton } from "next-share";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";

interface Props {
  name: string;
  url: string;
  BlocId?: any;
  homePage?: boolean;
}

const ShareModal: React.FC<Props> = ({
  name,
  url,
  BlocId,
  homePage,
}) => {
  const router = useRouter();


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
    <div className="flex flex-col w-[35vw] h-[520px] p-8 py-10 gap-5 items-center justify-start bg-[#181818] text-white rounded-lg">
      <div
        ref={ref}
        className={`flex flex-col w-full ${
          homePage ? "h-full" : "h-[80%]"
        } overflow-y-auto gap-5 items-center justify-start`}
      >
        <Image src="/icons/badge-check.svg" width={70} height={70} alt="tick" />
        <div className="font-spacegrotesk text-3xl font-medium text-[#FFFFFFCC] text-center">
          {name} is now live!
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
              <Image src="/icons/whatsapp.svg" alt="" width={20} height={20} />
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
          <div onClick={toggleEmbed} className="bg-[#2A2A2D] rounded-full p-5">
            <Image src="/icons/code.svg" alt="" width={20} height={20} />
          </div>
          <div onClick={toggleMobile} className="bg-[#2A2A2D] rounded-full p-5">
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
            To add the Bloc any where on your website, add this iframe to your
            html code
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
      {!homePage && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <button
            onClick={() => router.push(`/new/bloc/${BlocId}/settings`)}
            className="bg-[#0784C6] text-sm font-spacegrotesk font-medium rounded px-9 py-3"
          >
            manage bloc
          </button>
          <button
            onClick={() => router.push("/new/dashboard")}
            className="bg-transparent text-sm font-spacegrotesk font-medium"
          >
            go to dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareModal;

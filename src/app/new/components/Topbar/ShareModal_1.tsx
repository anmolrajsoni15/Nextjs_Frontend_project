'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import { WhatsappShareButton, EmailShareButton } from "next-share";
import QRCode from "react-qr-code";

interface Props {
    name: string;
    url: string;
    blocId?: any;
    closeModal: any;
}

const ShareModal_1:React.FC<Props> = ({
    name,
    url,
    blocId,
    closeModal
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

  const handleEmbedCopy = (e: any) => {
    const value = `<script>
    window.blocConfig = {
      blocId: "${blocId}",
    }
</script>

<script src='https://embed.askbloc.ai/api/embed'>
</script>
                `;
    navigator.clipboard.writeText(value);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleEmbed = () => {
    setTimeout(() => {
      if (ref.current) {
        const currentPosition = ref.current.scrollTop;
        ref.current.scrollTo({
          top: currentPosition + 330,
          behavior: 'smooth',
        });
      }
    }, 300);

    setIsMobileClicked(false);
    setIsEmbedClicked(!isEmbedClicked);
  };

  const ref = useRef<HTMLDivElement>(null);
  const toggleMobile = () => {
    setTimeout(() => {
    if (ref.current) {
      const currentPosition = ref.current.scrollTop;
      ref.current.scrollTo({
        top: currentPosition + 230,
        behavior: 'smooth',
      });
    }
  }, 300);
    setIsEmbedClicked(false);
    setIsMobileClicked(!isMobileClicked);
  };

  return (
    <div className="relative flex flex-col w-[35vw] h-fit max-h-[520px] p-8 py-10 gap-5 items-center justify-start bg-[#181818] text-white rounded-lg">
      <div onClick={closeModal} className="absolute right-4 top-4 cursor-pointer ">
        <Image src="/icons/v3icons/cross.svg" alt="close" width={24} height={24} />
      </div>
      <div
        ref={ref}
        className={`inside_scroll flex flex-col w-full h-full transition-scroll duration-1500 ease-linear overflow-y-auto gap-5 items-center justify-start`}
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
                src="/icons/icon-outline-mail.svg"
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
          className={`flex flex-col w-full items-center justify-center gap-5 mt-4 ${
            isEmbedClicked ? "flex" : "hidden"
          }`}
        >
          <div className="text-center font-spacegrotesk text-2xl font-medium text-[#FFFFFFCC]">
            Embed on Web App
          </div>
          <div className="text-center font-spacegrotesk font-medium text-sm leading-[18px] text-[#FCFCFD]">
            To add a chat bubble at bottom right of your website add this script tag to your html code
          </div>
          <div className="bg-[#FFFFFF1A] w-full rounded-md items-start flex justify-between p-2">
            <div className="w-[85%] flex items-center justify-center">
              <div className="w-full overflow-x-hidden">
                <pre className="w-full overflow-auto text-sm">
{`<script>
  window.blocConfig = {
    blocId: "${blocId}",
  }
</script>

<script src='https://embed.askbloc.ai/api/embed'>
</script>
                `}
                </pre>
              </div>
            </div>
            <div
              onClick={handleEmbedCopy}
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
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <button
            onClick={() => router.push("/new/dashboard")}
            className="hover:underline bg-transparent text-sm font-spacegrotesk font-medium"
          >
            Go to dashboard
          </button>
        </div>
    </div>
  )
}

export default ShareModal_1
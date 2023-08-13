'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import NewChatBot from './NewChatBot'
import AccessModal from './AccessModal'
import Link from 'next/link'
import Modal from "react-modal";
import { useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { clearMessage } from '../../Redux/features/blocSlice'
import ShareModal from './ShareModal'


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

interface Props {
    blocData: any
    showEdit?: boolean
}

const NewChatContainer: React.FC<Props> = ({blocData, showEdit}) => {
    const {blocData: blocDataRedux, message} = useSelector((state: RootState) => state.newBlocState);
    const [mode, setMode] = React.useState<boolean>(!blocData.isDark);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
      setMode(!blocData.isDark);
    }, [blocData]);

    useEffect(() => {
      if(message === "success"){
        setMode(!blocDataRedux.isDark);
        setTimeout(() => {
          clearMessage();
        }, 3000);
      }
      console.log(mode);
    }, [message, blocDataRedux])

    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    const toggleMode = () => {
        setMode(!mode);
    }

    const url = `https://app.askbloc.ai/bloc/${blocData.blocId}`;
  const embedUrl = `https://embed.askbloc.ai/${blocData.blocId}`;

  return (
    <div className='w-full px-8 py-6 bg-[#181818] border-[1.9px] border-solid border-[#FFFFFF1A] rounded-lg'>
        <div className="flex w-full items-center justify-between mb-6">
            <div className="flex items-start gap-3 justify-center">
                <Image src="/icons/icon-outline-cube.svg" width={30} height={30} alt="plus" />
                <div className="flex flex-col items-start justify-center">
                    <div className="text-[#FFFFFFCC] font-poppins text-xl font-semibold">{blocData.name}</div>
                    <div className="font-spacegrotesk text-xs font-normal text-[#FFFFFFCC]">{blocData && blocData.subHeading ? blocData.subHeading : ""}</div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <div onClick={openModal} className="bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3"><Image src='/icons/share.svg' alt='image' width={14} height={14} /></div>
                <div onClick={toggleMode} className="bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3">
                    {
                        mode ? (
                            <Image src='/icons/sun.svg' alt='image' width={14} height={14} />
                        ) : (
                            <Image src='/icons/moon.svg' alt='image' width={14} height={14} />
                        )
                    }
                </div>
                <Link href={`/new/bloc/${blocData.blocId}/settings`}>
                <div className={`${showEdit === false ? 'hidden': ''} bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3`}><Image src='/icons/settings.svg' alt='image' width={14} height={14} /></div>
                </Link>
            </div>
        </div>
        <NewChatBot colorMode={mode} />
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
        <ShareModal name={blocData.name} url={url} embedUrl={embedUrl} BlocId={blocData.blocId} homePage={true} />
      </Modal>
    </div>
  )
}

export default NewChatContainer
'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from "../../../Redux/store";
import Image from 'next/image';
import Modal from "react-modal";
import ShareModal_1 from './ShareModal_1';

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

const useCases = [
    {
        case: 1,
        name: 'On your own website as a section'
    },
    {
        case: 2,
        name: 'On your own website as a Chatbot'
    },
    {
        case: 3,
        name: 'On Askbloc hosted solution'
    },
    {
        case: 4,
        name: 'On Whatsapp (Coming Soon)'
    },
]


const ShareButton = () => {

    const blocData = useSelector((state: RootState) => state.newBlocState.blocData);

    const [modalIsOpen, setIsOpen] = React.useState(false);

    let url = `https://app.askbloc.ai/${blocData.blocId}`;
    useEffect(() => {
        if(blocData){
            url = `https://app.askbloc.ai/${blocData.blocId}`;
        }
    }, [blocData])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  return (
    <>
    <div onClick={openModal} className='cursor-pointer flex items-center justify-center gap-1 py-[14px] px-3 rounded-[7px] bg-primary' >
        <Image src='/icons/v3icons/share.svg' alt="share" width={20} height={20} />
        <div className="text-white font-spacegrotesk text-center text-lg font-medium">Share Bloc</div>
    </div>
        <Modal
        isOpen={modalIsOpen}
        //   onAfterOpen={afterOpenModal}
        shouldCloseOnOverlayClick={true}
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
        {
            blocData && blocData.useCase === useCases[0].name ? (<ShareModal_1 name={blocData.name} url={url} blocId={blocData.blocId} closeModal={closeModal} />) : (<ShareModal_1 name={blocData.name} url={url} blocId={blocData.blocId} closeModal={closeModal} />)
        }
      </Modal>
    </>
  )
}

export default ShareButton
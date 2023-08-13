'use client'

import Image from 'next/image'
import React from 'react'
import Modal from "react-modal";
import UpdateConfirmModal from '../../components/UpdateConfirmModal';

interface Props {
    state: string,
    toggleSetting: (value: string) => void,
    isModified: boolean,
    setIsModified: any
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

const ToggleSettings: React.FC<Props> = ({state, toggleSetting, isModified, setIsModified}) => {

    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [part, setPart] = React.useState("");

    React.useEffect(() => {
        setPart(state);
    }, [state])

    function openModal() {
          setModalIsOpen(true);
      }
    
      function closeModal() {
        setModalIsOpen(false);
      }

      const neglectChanges = () => {
          toggleSetting(part);
          setIsModified(false);
          closeModal();
        }

      function handleClick(value:string){
        setPart(value);
        if(isModified){
            openModal();
        }else{
        toggleSetting(value);
        }
      }

  return (
    <div className='w-fit flex gap-2 p-[6px] bg-modalBg border border-solid border-compColor rounded-lg ' >
        <div onClick={() => handleClick('datasources')} className={` ${state === "datasources" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/datasources.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">Data Sources</div>
        </div>
        <div onClick={() => handleClick('interface')} className={` ${state === "interface" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/interface.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">Interface</div>
        </div>
        <div onClick={() => handleClick('general')} className={` ${state === "general" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/general.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">General</div>
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
          customStyles.content.zIndex = 1000;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0.8)";
        }}
        onAfterClose={() => {
          customStyles.content.opacity = 0;
          customStyles.overlay.backgroundColor = "rgba(0, 0, 0, 0)";
        }}
      >
        <UpdateConfirmModal closeModal={closeModal} neglectChanges={neglectChanges} />
      </Modal>
    </div>
  )
}

export default ToggleSettings
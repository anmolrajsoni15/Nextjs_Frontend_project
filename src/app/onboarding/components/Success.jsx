"use client";

import React, { useState } from "react";
import Image from "next/image";
import Icon from "../images/Icon.png";
import Button from "./Button";
import EastIcon from "@mui/icons-material/East";
import { useRouter } from "next/navigation";
import Modal from 'react-modal';
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";


const customStyles = {
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    padding: 'none',
  }
}

const Success = () => {
  const router = useRouter()

  const [blocName, setBlocName] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCreatingBloc, setIsCreatingBloc] = useState(false); // Added state for button disable

  const handleBlocName = (e) => {
    setBlocName(e.target.value)
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createNewBloc = async () => {

    setIsCreatingBloc(true); // Disable the button
    const token = getCookie('jwt')

    const data = {
      name: blocName,
      photo: '',
      initialMessage: 'Hey, I am bloc! How can I help you?',
      subHeading: '',
      isPublic: true
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Network Response was not ok!')
      }

      const result = await response.json()
      console.log(result)
      localStorage.setItem("blocId", result.blocId)
      setCookie('blocId', result.blocId)

      router.push('/new/creates')
    }
    catch (error) {
      console.log("There is a problem with your fetching operations: ", error)
    }
  }

  return (
    <div className="sm:w-11/12 md:w-11/12 lg:w-1/2 m-5 p-8 md:p-10 md:py-12 lg:p-20 lg:py-16 bg-[#181818] flex gap-5 flex-col border-2 border-solid rounded-md border-[#ffffff2f] items-center text-white">
      <Image src={Icon} alt="success_icon" width={73} height={73} />
      <div className="flex flex-col w-full text-center mb-4">
        <div className="w-full font-spacegrotesk text-3xl leading-9 font-medium tracking-[-0.03em] text-white">
          congratulations, you&apos;re set up!
        </div>
          <div className="font-spacegrotesk font-medium text-sm leading-5">
          time to create your bloc
        </div>
      </div>
      <div>
        <div className="w-full my-3" onClick={openModal}>
          <Button value="Create new bloc" />
          <Modal
            isOpen={modalIsOpen}
            //   onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
             <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            createNewBloc();
                        }}
                        className="flex flex-col p-8 py-10 gap-6 w-[50vw] items-center justify-center bg-[#181818] text-white rounded-lg">
                        <h1 className='text-center font-spacegrotesk font-bold text-5xl'>New  Bloc</h1>
                        <div className='w-full'>
                            <label htmlFor="" className='text-lg font-spacegrotesk font-medium text-[#e7e7e7] pl-1'>Name</label>
                            <input
                                type="text"
                                value={blocName}
                                placeholder='Name your Bloc'
                                onChange={handleBlocName}
                                className='bg-[#292929] border border-solid text-[#e1e1e1] border-slate-500 rounded-md px-2 py-1 
                        font-spacegrotesk text-base font-normal focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-5 w-full h-10'
                                required />
                        </div>
                        <button
                            type="submit"
                            className="w-2/5 h-10 mt-4 bg-primary rounded-md border-none font-inter font-medium"
                            disabled={isCreatingBloc} // Disable the button based on state
                        >
                            {isCreatingBloc ? 'Creating...' : 'Create'}
                        </button>

                    </form>
                
          </Modal>
        </div>
        <Link href='/new/dashboard'>  <div className="font-spacegrotesk font-medium text-sm leading-5 text-white cursor-pointer">
          Let me look around first
          <span className="px-1">
            <EastIcon style={{ fontSize: "small" }} />
          </span>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Success;

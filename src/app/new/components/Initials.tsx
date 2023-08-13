'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import TutorialContent from './TutorialComponent/TutorialContent'
import { getCookie, setCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { setCloseTutorial, setOldUser } from 'src/app/Redux/features/Tutorial'
import { RootState } from 'src/app/Redux/store'

const tutorialStyles ={
  insidePart: {
    width: '150px',
    height: '80px',
    top: '60px',
    left: '0px',
  },

  messageBox:{
    width: '500px',
    top: '85px',
    left: '0px',
  },
  message:{
    step: 1,
    messageText: "Click on the 'Create New Bloc' button to create your first Bloc",
  }
}

const Initials = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {showTutorial} = useSelector((state: RootState) => state.tutorial);

  function handleCloseTutorial(){
    dispatch(setCloseTutorial());
    dispatch(setOldUser());
  }

  return (
    <div className='w-[94%] mt-5 px-9 py-5 bg-[#181818] border border-solid border-[#FFFFFF1A] rounded-2xl flex justify-between items-center'>
        <div className="flex flex-col gap-5 relative">
            <div className="flex flex-col items-start justify-center">
                <h1 className="font-poppins font-semibold text-[28px]">Explore our Integrations</h1>
                <p className="font-spacegrotesk text-sm">Import data from slack, google drive and more.</p>
            </div>
            {
              showTutorial && (
                <div className="absolute w-[500px]"><TutorialContent width={150} height={80} top={60} left={0} customStyles={tutorialStyles} handleClose={handleCloseTutorial} /></div>
              )
            }
            <button onClick={()=>router.push('/new/creates')} className={` ${showTutorial ? "z-[3000]" : ""}  bg-[#0784C6] rounded-sm font-spacegrotesk font-bold text-xs px-5 py-[10px] w-fit`}>Create New Bloc</button>
        </div>
        <div className="absolute right-28 hidden md:block">
            <Image src="/images/home_group.png" alt="home_group" width={260} height={260} className='' />
        </div>
    </div>
  )
}

export default Initials
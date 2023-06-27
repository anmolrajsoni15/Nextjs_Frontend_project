'use client'
import React from 'react'
import Progress from '@geist-ui/core/esm/progress'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../Firebase/firebaseConfig';
import ProgressBar from './ProgressBar'
import Image from 'next/image';

interface Props {
  text: string
}
 


const Topbar = ({ text }: Props) => {

  
  const [user] = useAuthState(auth)

  return (
    <>
    <div className=' w-[80vw] flex justify-between py-5 '>
        <h1 className='text-5xl font-bold'>{text}</h1>
        <div className='flex items-center space-x-2'>
            <span>{user?.email}</span>
            {user?.photoURL &&
            <div className=" relative  m-1 h-6 w-6 sm:h-10 sm:w-10">
            <Image src={user.photoURL}
              className="object-cover rounded-full"
              alt="user-img"
              fill />
          </div>
}
        </div>
    </div>
    </>
  )
}

export default Topbar

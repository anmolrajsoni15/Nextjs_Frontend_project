'use client'
import React from 'react'
import Progress from '@geist-ui/core/esm/progress'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../Firebase/firebaseConfig';
import ProgressBar from './ProgressBar'

interface Props {
  text: string
}
 


const Topbar = ({ text }: Props) => {

  
  const [user] = useAuthState(auth)

  return (
    <>
    <div className=' w-[80vw] flex justify-between py-5 '>
        <h1 className='text-5xl font-bold'>{text}</h1>
        <div className=''>
            <span>{user?.email}</span>
            {/* <div>photo</div> */}
        </div>
    </div>
    </>
  )
}

export default Topbar

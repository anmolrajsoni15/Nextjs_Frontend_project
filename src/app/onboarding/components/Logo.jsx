'use client'
import Image from 'next/image'
import React from 'react'
import logo from '../images/logo.png'

const Logo = () => {
  return (
    <div className='w-fit flex gap-2 flex-row items-center justify-center'>
        <Image src={logo} alt='logo' width={40} height={40} />
        <span className='font-poppins font-medium text-[40px] leading-[72px] text-white'>Bloc</span>
    </div>
  )
}

export default Logo
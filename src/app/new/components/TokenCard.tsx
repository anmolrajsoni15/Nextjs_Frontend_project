'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { getCookie } from 'cookies-next'
import { getCredits } from '../../services/apiServices'


interface Props {
    userData: any;
}

const TokenCard: React.FC<Props> = ({userData}) => {
    

  return (
        <div className="flex flex-row items-center justify-center gap-2 px-2 py-1 bg-[#333333] border border-solid border-[#CDCCCCCC] rounded-3xl">
            <div className="">
                <Image src={'/icons/ep-coin.svg'} width={18} height={18} alt='coin' />
            </div>
            <div className="text-center font-spacegrotesk text-sm"><span>{userData && userData.credits ? userData.credits : 0}</span> tokens</div>
            <div className="">
                <Image src={userData && userData?.photo ? userData.photo : '/images/dummy.png'} width={28} height={28} alt='dummy' className='rounded-full' />
            </div>
        </div>
  )
}

export default TokenCard
'use client'

import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

interface Props {
    url: string;
}

const BackButton:React.FC<Props> = ({
    url
}) => {
    const router = useRouter();
  return (
    <div
        onClick={() => {
            router.push(url);
        }}
     className="cursor-pointer flex items-center justify-center gap-2 px-5 py-[14px] bg-[#1C1C1C] border border-solid border-[#FFFFFF1A] rounded-[5px]">
        <Image src='/icons/v3icons/arrow-left.svg' alt="back" width={24} height={24} />
        <div className="font-spacegrotesk text-lg font-medium text-[#FFFFFFD9]">Back</div>
    </div>
  )
}

export default BackButton
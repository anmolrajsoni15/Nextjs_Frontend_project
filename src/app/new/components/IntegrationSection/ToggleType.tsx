'use client'

import Image from 'next/image'
import React from 'react'

interface Props {
    type: string,
    setType: any,
    isModified: boolean,
    setIsModified: any
}

const ToggleType:React.FC<Props>  = ({
    type,
    setType,
    isModified,
    setIsModified
}) => {
  return (
    <div className='w-fit flex gap-2 p-[6px] bg-modalBg border border-solid border-compColor rounded-lg ' >
        <div onClick={() => setType('file')} className={` ${type === "file" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/file.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">Data Sources</div>
        </div>
        <div onClick={() => setType('website')} className={` ${type === "website" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/link.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">Interface</div>
        </div>
        <div onClick={() => setType('other')} className={` ${type === "other" ? "bg-compColor" : "bg-transparent"} flex items-center justify-center gap-2 py-[10px] px-[14px] rounded-[6px] transition-all duration-200 ease-linear cursor-pointer`}>
            <Image src="/icons/v3icons/puzzle.svg" width={24} height={24} alt="image" />
            <div className="font-inter text-base font-semibold text-textColor1">General</div>
        </div>
    </div>
  )
}

export default ToggleType
import Image from 'next/image';
import React from 'react'

interface Props {
    tokens: number;
}

const TokenCard:React.FC<Props> = ({
    tokens
}) => {
  return (
    <div className='bg-[#333333] rounded-[35px] border border-solid border-[#CDCCCCCC] flex items-center justify-center gap-2 px-6 py-[14px]'>
        <Image src='/icons/v3icons/coins.svg' alt="token" width={24} height={24} />
        <div className="font-spacegrotesk text-center text-base text-white">{tokens}</div>
    </div>
  )
}

export default TokenCard
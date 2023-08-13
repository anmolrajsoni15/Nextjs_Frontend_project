import Image from 'next/image'
import React from 'react'

const WebsiteLoading = () => {
  return (
    <div className='bg-modalBg text-white w-[350px] flex flex-col items-center justify-center gap-5 p-6'>
      <div className="text-center w-full flex items-center justify-center font-spacegrotesk text-base">Crawling the Website Links...
Once it is Done, you will be able to select 
the exact pages you want to Import</div>
      <div className=""></div>
      <div className="w-full flex items-center justify-center rounded-xl">
        <Image src='/icons/v3icons/WebsiteLoading1.gif' alt="loading" width={350} height={233} className='rounded-xl' />
      </div>
      
    </div>
  )
}

export default WebsiteLoading
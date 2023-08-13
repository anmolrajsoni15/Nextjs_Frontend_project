'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'

const BlocCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 p-5 bg-[#181818] transition-all duration-300 ease-linear hover:shadow-cardShadow hover:scale-[1.05] hover:-translate-y-1 rounded-xl">
        <div className="w-full mx-auto flex items-center justify-center my-1 mb-2">
            <Skeleton circle width={50} height={50} />
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <Skeleton containerClassName="flex-1" height={20} width={150}/>
          <Skeleton containerClassName="flex-1" height={10} width={150}/>
        </div>
        <div className="flex gap-2 pr-2">
          <Skeleton circle width={40} height={40} containerClassName="flex-1"/>
          <Skeleton circle width={40} height={40} containerClassName="flex-1"/>
          <Skeleton circle width={40} height={40} containerClassName="flex-1"/>
        </div>
      </div>
  )
}

export default BlocCardSkeleton;


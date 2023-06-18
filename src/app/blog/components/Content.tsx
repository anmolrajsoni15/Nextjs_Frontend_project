'use client'

import React from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'
import Dropdown from './Dropdown'

const Content: React.FC = () => {

  return (
    <div className='w-full flex flex-row gap-16 items-center justify-center pt-7'>
        <div className="w-full md:w-4/5 h-[90%] gap-8 md:gap-12 lg:gap-16 flex flex-col md:flex-row mb-24">
            <div className="flex md:hidden">
              <Dropdown path='' />
            </div>
            <div className="left w-1/4 hidden md:block">
                <LeftPart path='' />
            </div>
            <div className="right w-full md:w-3/4">
                <RightPart />
            </div>
        </div>
    </div>
  )
}

export default Content
import React from 'react'
import NewChatBot from './NewChatBot'

const BotContainer = () => {
  return (
    <div className='flex flex-col w-full items-start justify-center gap-3'>
        <div className="font-poppins font-semibold text-xl">Added Data Sources</div>
        <NewChatBot />
    </div>
  )
}

export default BotContainer
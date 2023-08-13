import React from 'react'
import NewChatBot from './NewChatBot'
import Image from 'next/image'

const ChatContainer = () => {
  return (
    <div className='w-full flex flex-col items-end justify-between gap-4'>
        <NewChatBot />
        <div className="rounded-full bg-[#292929] flex items-center justify-center p-4">
            <Image src='/images/logo.png' alt='image' width={20} height={20} />
        </div>
    </div>
  )
}

export default ChatContainer
import React from 'react'
import Image from 'next/image'

interface Props {
    BotName: React.ReactNode;
}

const ChatBot: React.FC<Props> = ({ BotName }) => {
  return (
    <div className='w-[95%] h-[95%] border border-solid border-[#333333] rounded-lg flex flex-col '>
        <div className="flex justify-between items-center w-full border-b p-5 pt-4 border-[#888888] border-solid">
          <div className="flex gap-3 items-center">
            <Image src={'/landing_images/BotImg.png'} alt="BotImg" width={48} height={48} className='w-12 h-12' />
            <div className="flex flex-col">
              <h1 className="font-semibold font-poppins text-2xl leading-8">{BotName}</h1>
              <p className="font-medium font-spacegrotesk text-base leading-5">Ask me anything!</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className='rounded border border-solid border-[#333333] p-3 py-[10px] font-spacegrotesk font-medium text-base text-[#888888]'>New Chat</button>
            <button className='rounded border border-solid border-[#333333] p-3 py-[10px]'>
              <Image src={'/icons/sun.svg'} alt='mode' width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="w-full h-[500px] pt-8">
          <div className="flex items-start justify-start p-3 gap-3">
            <Image src={'/landing_images/BotImg.png'} alt="BotImg" width={40} height={40} className='w-10 h-10' />
            <div className="flex flex-col justify-center gap-1">
              <p className="font-spacegrotesk font-medium text-base">Bloc</p>
              <div className="bg-[#272727] rounded-e-lg rounded-bl-lg py-[10px] px-[14px] font-normal font-spacegrotesk text-base">hi, im bloc how can I help you today?</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full px-4 pb-6 gap-3">
          <div className="font-spacegrotesk font-normal text-base">100 Credits left</div>
          <div className="flex flex-row justify-between item-center">
            <input type="text" className='border border-solid border-[#888888] rounded bg-transparent w-[88%] py-2 px-[14px] font-spacegrotesk' placeholder='Send a message' />
            <button className='border border-solid border-[#888888] rounded p-2 px-3'>
              <Image src={'/icons/share.svg'} alt='send' width={20} height={20} />
            </button>
          </div>
        </div>
    </div>
  )
}

export default ChatBot
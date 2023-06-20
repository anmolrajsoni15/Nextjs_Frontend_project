import React from 'react'
import LeftPart from './LeftPart';
import ChatBot from './ChatBot';

interface Props {
    Heading: React.ReactNode;
    Subheading: React.ReactNode;
    BotName: React.ReactNode;
  }

const BlocDemo: React.FC<Props> = ({ Heading, Subheading, BotName }) => {
  return (
    <div className='w-[85%] h-[700px] flex items-center justify-center gap-14 mt-14'>
        <div className="w-1/2">
            <LeftPart Heading={Heading} Subheading={Subheading} />
        </div>
        <div className="w-1/2 flex justify-end">
            <ChatBot BotName={BotName} />
        </div>
    </div>
  )
}

export default BlocDemo

import Image from 'next/image'
import React from 'react'
import NewChatBot from './NewChatBot'
import Link from 'next/link'

interface Props {
    blocData: any
}

const NewChatContainer: React.FC<Props> = ({blocData}) => {
    const [mode, setMode] = React.useState<boolean>(false);

    const toggleMode = () => {
        setMode(!mode);
    }

  return (
    <div className='w-full px-8 py-6 bg-[#181818] border-[1.9px] border-solid border-[#FFFFFF1A] rounded-lg'>
        <div className="flex w-full items-center justify-between mb-6">
            <div className="flex items-start gap-3 justify-center">
                <Image src="/icons/icon-outline-cube.svg" width={30} height={30} alt="plus" />
                <div className="flex flex-col items-start justify-center">
                    <div className="text-[#FFFFFFCC] font-poppins text-xl font-semibold">{blocData.name}</div>
                    <div className="font-spacegrotesk text-xs font-normal text-[#FFFFFFCC]">{blocData && blocData.subHeading ? blocData.subHeading : ""}</div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <div className="bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3"><Image src='/icons/lock-closed.svg' alt='image' width={14} height={14} /></div>
                <div onClick={toggleMode} className="bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3">
                    {
                        mode ? (
                            <Image src='/icons/sun.svg' alt='image' width={14} height={14} />
                        ) : (
                            <Image src='/icons/moon.svg' alt='image' width={14} height={14} />
                        )
                    }
                </div>
                <Link href={`/new/bloc/${blocData.blocId}/settings`}>
                <div className="bg-[#141414] rounded-full border-[1.3px] border-solid border-[#FFFFFF1A] p-3"><Image src='/icons/edit.svg' alt='image' width={14} height={14} /></div>
                </Link>
            </div>
        </div>
        <NewChatBot colorMode={mode} />
    </div>
  )
}

export default NewChatContainer
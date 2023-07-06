import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Initials = () => {
  const router = useRouter();

  return (
    <div className='w-[94%] mt-5 px-9 py-5 bg-[#181818] border border-solid border-[#FFFFFF1A] rounded-2xl flex justify-between items-center'>
        <div className="flex flex-col gap-5">
            <div className="flex flex-col items-start justify-center">
                <h1 className="font-poppins font-semibold text-[28px]">Explore our Integrations</h1>
                <p className="font-spacegrotesk text-sm">Import data from slack, google drive and more.</p>
            </div>
            <button onClick={()=>router.push('/new/creates')} className='bg-[#0784C6] rounded-sm font-spacegrotesk font-bold text-xs px-5 py-2 w-fit'>Create New Bloc</button>
        </div>
        <div className="absolute right-28 hidden md:block">
            <Image src="/images/home_group.png" alt="home_group" width={260} height={260} className='' />
        </div>
    </div>
  )
}

export default Initials
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const NoBloc = () => {
    const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center gap-3 max-w-sm'>
        <Image src='/icons/featured-icon.png' width={50} height={50} alt='featured-icon' />
        <div className="flex flex-col items-center justify-center">
            <div className='text-xl font-poppins font-semibold'>No Blocs Found</div>
            <div className='text-sm font-spacegrotesk text-[#B0B0B0] text-center'>you currently don&apos;t have any new blocs, Get Started Now!</div>
        </div>
        <button onClick={() => {router.push('/new/creates')}
        } className='bg-[#0784C6] text-[#FFFFFFD9] font-spacegrotesk font-medium text-sm px-8 py-2 rounded-[4px] mt-4'>Create New Bloc</button>
    </div>
  )
}

export default NoBloc
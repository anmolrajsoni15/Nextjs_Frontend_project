import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
    closeModal: () => void,
    neglectChanges: () => void,
}

const UpdateConfirmModal: React.FC<Props> = ({closeModal, neglectChanges}) => {
    const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center w-[540px] p-8 gap-8 bg-[#181818] z-50 rounded-2xl'>
        <div className="text-center text-[#F6B05D] font-inter text-2xl font-medium">You have Unsaved Changes</div>
        <Image src='/icons/yellow_warning.svg' alt='image' width={80} height={80} />
        <div className="text-center text-[#F1F1F1] font-inter font-medium text-base leading-[22px]">You&apos;ve made updates to your Bloc, but You haven&apos;t confirmed these changes. Do u want to discard these Changes and Leave this Page?</div>
        <div className="flex items-center justify-center gap-3">
            <button onClick={neglectChanges} className="px-4 py-3 font-spacegrotesk rounded text-center text-base font-medium text-[#FFFFFFCC] bg-[#292929]">
                Yes, Discard Changes
            </button>
            <button onClick={closeModal} className="px-4 py-3 font-spacegrotesk rounded text-center text-base font-medium text-[#FFFFFFCC] bg-[#0784C6]">
                No, Keep Editing
            </button>
        </div>
    </div>
  )
}

export default UpdateConfirmModal
import React from 'react'

const PaymentContact = () => {
  return (
    <div className='py-8 gap-8 flex flex-col items-center justify-center w-full bg-[#181818] mb-24 rounded-2xl'>
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-[#D0D0D0] text-center font-inter text-xl font-semibold">Still have questions?</div>
            <div className="font-inter text-lg text-[#D0D0D0] text-center">Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.</div>
        </div>
        <button className="flex items-center justify-center bg-[#0784C6] px-14 py-4 rounded-md text-[#FFFFFFCC] text-center font-spacegrotesk text-base font-medium">Contact Us</button>
    </div>
  )
}

export default PaymentContact
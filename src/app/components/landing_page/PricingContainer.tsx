'use client'

import React from 'react'
import AnnualPricing from './AnnualPricing'
import Pricing from './Pricing'

const PricingContainer = () => {
    const [active, setActive] = React.useState<'monthly' | 'annual'>('monthly')

  return (
    <>
    <div className='w-full flex flex-col items-center justify-center py-24 gap-10 bg-[#121212]'>
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-3">
                <div className="text-[#0B86C7] text-center font-inter font-semibold text-sm md:text-base">Pricing</div>
                <div className="text-[#D0D0D0] text-center font-poppins text-[32px] font-semibold md:text-5xl md:font-bold">Compare our plans and find yours</div>
            </div>
            <div className="text-[#D0D0D0] font-spacegrotesk text-base font-normal md:text-xl left-6 text-center md:font-medium">Simple, transparent pricing that grows with you.</div>
        </div>
        <div className="flex items-center justify-center gap-2 bg-[#181818] border border-solid border-[#292929] rounded-lg p-[6px]">
            <button
              onClick={() => setActive('monthly')}
              className={`${active === 'monthly' ? 'bg-[#292929] text-white' : 'bg-transparent text-[#666666]'} px-[14px] py-[10px] rounded-md`}              
            >
                Monthly billing
            </button>
            <button
                onClick={() => setActive('annual')}
                className={`${active === 'annual' ? 'bg-[#292929] text-white' : 'bg-transparent text-[#666666]'} px-[14px] py-[10px] rounded-md`}
            >
                Annual billing
            </button>
        </div>
    </div>
    {
        active === 'monthly' ? (<Pricing />) : (<AnnualPricing />)
    }
    </>
  )
}

export default PricingContainer
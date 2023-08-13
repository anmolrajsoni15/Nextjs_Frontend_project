import React from 'react'
import NewNavbar from '../components/common/NewNavbar'
import PricingContainer from '../components/landing_page/PricingContainer'
import PricingFAQ from '../components/landing_page/PricingFAQ'
import PaymentContact from '../components/landing_page/PaymentContact'
import Footer from '../components/common/Footer'

const page = () => {
  return (
    <main className='w-full h-full flex flex-col items-center justify-start px-10 md:px-20 lg:px-24 bg-[#121212]'>
        <NewNavbar />
        <PricingContainer />
        <PricingFAQ />
        <PaymentContact />
        <Footer />
    </main>
  )
}

export default page
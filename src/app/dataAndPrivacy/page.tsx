import React from 'react'
import DPPpage from "../components/landing_page/DPPpage"
import Footer2 from "../components/common/Footer2"
import NewNavbar from "../components/common/NewNavbar"

const page = () => {
  return (
    <main className='w-full h-full bg-[#121212]'>
        <div className="px-[4%] md:px-[7%]">
      <NewNavbar />
      </div>
        <DPPpage />
        <Footer2 />
    </main>
  )
}

export default page
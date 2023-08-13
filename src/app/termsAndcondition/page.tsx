import React from 'react'
import NewNavbar from "../components/common/NewNavbar"
import TNCpage from "../components/landing_page/TNCpage"
import Footer2 from "../components/common/Footer2"


const page = () => {
  return (
    <main className='w-full h-full bg-[#121212]'>
        <div className="px-[4%] md:px-[7%]">
      <NewNavbar />
      </div>
        <TNCpage />
        <Footer2 />
    </main>
  )
}

export default page
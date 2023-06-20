import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import Footer from '../../components/dashboard/Footer'
import Chatbot from '../../components/dashboard/Chatbot'
import { Params } from '../../lib/Types'
import Button from "../../components/dashboard/Button"
// import Link from 'next/link'
// import { deleteCookie } from 'cookies-next'
import AllDone from '../../components/dashboard/AllDone'
import ProgressBar from '../../components/dashboard/ProgressBar'
import ChatboxTopbar from '../../components/dashboard/ChatboxTopbar'

const page = ({ params: { blocId } }: Params) => {

  

  return (
    <div className='text-white flex'>
      <Sidebar />
      <section className='px-8 flex flex-col justify-between '>
        <div className='space-y-4'>
          <ChatboxTopbar />
          <ProgressBar c1='bg-primary' c2='bg-primary' c3='bg-primary' c4='bg-white'/>
          <Chatbot />
          <AllDone />
        </div>
      </section>
    </div>
  )
}

export default page
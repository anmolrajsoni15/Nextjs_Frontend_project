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

import { cookies } from 'next/headers'

const getBlocs = async (): Promise<any> => {
  const token = cookies().get('jwt')?.value

  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/blocs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache"
   
  })
  if (!res.ok) {
    console.log('Failed to fetch data', res.status)
}
  
  return res.json()
}

const page = async({ params: { blocId } }: Params) => {
  const blocs = await getBlocs()
  

  return (
    <div className='text-white flex'>
      <Sidebar allBlocs={blocs} />
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
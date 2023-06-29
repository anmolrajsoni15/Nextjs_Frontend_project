import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import Topbar from '../../components/dashboard/Topbar'
import AddWeb from '../../components/dashboard/AddWeb'
import Footer from '../../components/dashboard/Footer'
import ProgressBar from '../../components/dashboard/ProgressBar'
import { cookies } from 'next/headers'

const getBlocs = async (): Promise<any> => {
  const token = cookies().get('jwt')?.value

  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/blocs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
   
  })
  if (!res.ok) {
    console.log('Failed to fetch data', res.status)
}
  
  return res.json()
}

const Web = async() => {
  const blocs = await getBlocs()
  return (
    <div className='text-white flex'>
      <Sidebar allBlocs={blocs.length} />
      <section className='px-8 flex flex-col justify-between'>
        <div>
          <Topbar text={'New Bloc'} />
          <ProgressBar c1='bg-primary' c2={'bg-primary'} c3='bg-white' c4='bg-white' />
          <AddWeb />
        </div>
        <Footer />
      </section>
    </div>
  )
}

export default Web
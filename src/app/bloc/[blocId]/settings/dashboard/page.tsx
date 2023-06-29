import React from 'react'
import Sidebar from '../../../../components/dashboard/Sidebar'
import Topbar from '../../../../components/dashboard/Topbar'
// import Input from 'src/app/components/dashboard/Input'
import ProgressBar from '../../../../components/dashboard/ProgressBar'
import SettingTopDiv from '../../../../components/dashboard/SettingTopDiv'
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

const page = async() => {
    const blocs = await getBlocs()
    return (
        <div className='text-white flex'>
            <Sidebar allBlocs={blocs.length} />
            <section className='px-8 w-[85vw]'>
                <Topbar text={'Create a New Bloc'} />
                <ProgressBar c1={'bg-primary'} c2={'bg-primary'} c3={'bg-primary'} />
                <SettingTopDiv c3={'underline'} />
                
            </section>
        </div>
    )
}

export default page
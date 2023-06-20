import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Topbar from '../components/dashboard/Topbar'
import No_Bloc from '../components/dashboard/No_Bloc'
import ProgressBar from '../components/dashboard/ProgressBar'
import { Bloclist } from '../lib/Types'
import Dropdown from '../components/dashboard/Dropdown'
import { cookies } from 'next/headers'
import Link from 'next/link'
import BlocList from '../components/dashboard/Bloclist'

const getBlocs = async (): Promise<Bloclist[]> => {
  const token = cookies().get('jwt')?.value

  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/blocs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache"
   
  })
  if (!res.ok) {
    throw Error('Failed to fetch data')
  }
  
  return res.json()
}

const page = async () => {

  const blocs = await getBlocs()
  console.log('blocs info', blocs)

  return (
    <div className='text-white flex'>
      <Sidebar />
      <section className='px-8 max-w-full relative overflow-hidden '>
        <Topbar text={'My Bloc'} />
        {/* <ProgressBar c1={'bg-white'} c2='bg-white' c3='bg-white' c4='bg-white ' /> */}
        {
          blocs && blocs.length > 0 ?
            <div className='mb-32'>
              <table className='w-[80vw] space-y-3 mt-8 text-tableContent '>
                <thead>
                  <tr className='border-y-[1px] border-borderColor rounded-[5px] bg-[#111111] text-left'>
                    <th className='py-2 px-2'>BLOC NAME</th>
                    <th>DATE UPLOADED</th>
                    <th>LAST UPDATES</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className=''>
                  {
                    blocs.map((item, index) => {
                      return (
                        <BlocList key={index} name={item.name} blocId={item.blocId} createdAt={item.createdAt} refreshedAt={item.refreshedAt}   />
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            :
            <No_Bloc />
        }
      </section>
    </div>
  )
}

export default page
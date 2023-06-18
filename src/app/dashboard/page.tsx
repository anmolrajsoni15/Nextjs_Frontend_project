import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Topbar from '../components/dashboard/Topbar'
import No_Bloc from '../components/dashboard/No_Bloc'
import ProgressBar from '../components/dashboard/ProgressBar'
import { Bloclist } from '../lib/Types'
import Dropdown from '../components/dashboard/Dropdown'
import { cookies } from 'next/headers'
import Link from 'next/link'

const getBlocs = async (): Promise<Bloclist[]> => {
  const token =  cookies().get('jwt')?.value

  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/blocs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!res.ok) {
    throw Error('Failed to fetch data')
  }
  return res.json()
}

const page = async () => {

  const blocs = await getBlocs()
  console.log('blocs info',blocs)

  return (
    <div className='text-white flex'>
      <Sidebar />
      <section className='px-8 max-w-full relative overflow-hidden '>
        <Topbar text={'My Bloc'} />
        {/* <ProgressBar c1={'bg-white'} c2='bg-white' c3='bg-white' c4='bg-white ' /> */}
        {
          blocs && blocs.length > 0  ?
            <div>
              <table className='w-[80vw] space-y-2 mt-16 text-tableContent '>
                <tr className='border-y-[1px] border-borderColor rounded-[5px] bg-[#111111]'>
                  <td className='py-2 px-2'>BLOC NAME</td>
                  <td>DATE UPLOADED</td>
                  <td>LAST UPDATES</td>
                  <td></td>
                </tr>
                { 
                  blocs.map((item, index) => {
                    return (
                      <tr key={index} className=' border-y-[1px] border-borderColor py-2 hover:text-white' >
                        
                        <td className='py-2 px-2 hover:text-white'><Link href={`/bloc/${item.blocId}`}>{item.name}</Link></td>
                        <td>{item.name}</td>
                        <td>{item.name}</td>
                        <td className='px-4'>
                          <Dropdown blocId={item.blocId} />
                        </td>
                        
                      </tr>
                      
                    )
                  })
                }
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
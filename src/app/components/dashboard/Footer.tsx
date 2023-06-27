'use client'
import React, { Suspense } from 'react'
import Button from './Button'
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';

// import { cookies } from 'next/headers'

const Footer = ({hidden}:any) => {

  // const blocId = cookies().get('blocId')?.value
  const blocId = getCookie('blocId')
  const token = getCookie('jwt')

  const getChatId = async () => {
    if (typeof blocId === 'string') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'BLOC-ID': blocId
          }
        })
        if (!res.ok) {
          console.log("Network response for chatid api was not ok!")
        }
        if (res.ok) {
          const response = await res.json()
          console.log(response)
          setCookie('chatId',response.chatId)
        }
      }
      catch (error) {
        console.log('chatId api error', error)
      }
    }
  }

  return (
    <section className='h-[110px]  flex items-center justify-center space-x-4 ' >
      <Suspense fallback='loading...'>
      <Link href={`/create/dataSource`} className={hidden}>
        <Button text={'Add more DataSources'} />
      </Link>
      </Suspense>
      <div onClick={getChatId}>
        <Link href={`/bloc/${blocId}`}>
          <Button className={''} text={'Test your Bloc'} />
        </Link>
      </div>
    </section>
  )
}

export default Footer
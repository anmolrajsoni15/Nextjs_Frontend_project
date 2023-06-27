'use client'
import { getCookie } from 'cookies-next'
import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import { useRouter } from 'next/navigation'

const AddUrl = () => {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const addWebsite = async () => {
        const blocId = getCookie('blocId')
        const token = getCookie('jwt')
        try {
            setLoading(true)
            if (typeof blocId == 'string') {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/add-website?url=${encodeURIComponent(input)}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'BLOC-ID': blocId
                    },
                })
               
                if (!res.ok) {
                    console.log("Network response for add website api is not ok!")
                }
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    router.refresh()
                }


            }
        }

        catch (error) {
            console.log('error in add website  api: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className='space-x-4'>
                <Input className={'w-[844px]'} placeholder={'https://www.Examplewebsite.com/main'}
                    onChange={(e) => setInput(e.target.value)} />
                {loading ?
                    <Button text='Adding...' className='hover:text-buttonTextColor hover:border-borderColor' />
                    :
                    <Button className={''} text={'Add Links'} onClick={addWebsite} disabled={loading} />
                }

            </div>
            <p className='text-xs w-[844px]'>The intended outcome is to scrape every URL link that begins with the provided web address, excluding any files located on the website, and only if the website is rendered on the server side.
            </p>
        </div>
    )
}

export default AddUrl
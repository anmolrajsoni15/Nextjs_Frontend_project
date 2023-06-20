'use client'
import React, { useEffect, useState } from 'react'
// import Input from './Input'
// import ButtonWithIcon from './ButtonWithIcon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch, } from '../../Redux/store'
import { addMessage, clearMessage } from '../../Redux/features/Message'
import { MessageState } from '../../Redux/features/Message'
import Image from 'next/image'
import Button from './Button'
// import { clearFiles } from '../../Redux/features/UploadFile'
import { getCookie, setCookie } from 'cookies-next'
import { BlocState, setInitialMessage } from 'src/app/Redux/features/blocState'



function Chatbox() {

    const blocState: BlocState = useSelector((store: RootState) => store.blocState)
    const [InitialMsg, setInitialMsg] = useState()
    const [prompt, setPrompt] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const messages: MessageState = useSelector((store: RootState) => store.Message)

    const token = getCookie('jwt')
        const chatId = getCookie('chatId')
        const blocId = getCookie('blocId')

        const getBloc = async () => {
            try {
                if (typeof blocId == 'string') {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'BLOC-ID': blocId
                        }
                    })
                    if (!res.ok) {
                        console.log("Network response for bloc Initial msg was not ok!")
                    }
                    if (res.ok) {
                        const data = await res.json()
                        setInitialMsg(data.initialMessage)
                        dispatch(setInitialMessage(data.initialMessage))
                    }

                }
            }
            catch (err) {
                console.log('')
            }
        }

        const getChatId = async ()=>{
            
                try {
                    if (typeof blocId == 'string') {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/get-chatId`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'BLOC-ID': blocId
                            }
                        })
                        if (!res.ok) {
                            console.log("Network response for bloc Initial msg was not ok!")
                        }
                        if (res.ok) {
                            const data = await res.json()
                            setCookie('chatId',data.chatId)
                        }
    
                    }
                }
                catch (err) {
                    console.log('')
                }
            
        }

        useEffect(()=>{
            getBloc()
            getChatId()
        },[])

    const handleClick = async () => {

        dispatch(addMessage({ type: "user", text: prompt }))
        setPrompt('')
        

        try {


            if (typeof chatId == 'string') {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc/chat?query=${encodeURIComponent(prompt)}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'CHAT-ID': chatId
                    },
                })

                if (!res.ok) {
                    dispatch(addMessage({ type: 'bloc', text: 'We are facing high demands at the monent!' }))
                }
                if (res.ok) {
                    const data = await res.json();
                    dispatch(addMessage({ type: 'bloc', text: data.response }))
                    await getBloc()
                }
            }
        }

        catch (error) {
            console.log('error in Chat api: ', error)
        }
    }

    const newChat = async () => {
        dispatch(clearMessage())

        const blocId = getCookie('blocId')
        const token = getCookie('jwt')

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
                    setCookie('chatId', response.chatId)

                }
            }
            catch (error) {
                console.log('chatId api error', error)
            }
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleClick()
        }
    }

    return (
        <div className='h-[500px]  rounded-lg border-[1px] border-borderColor flex-col'>
            <div className='h-[75px] border-b-[1px] flex items-center justify-between '>
                <div className='flex items-center space-x-2 ml-4 '>
                    <div className="relative md:h-10 md:w-10 h-6 w-6">
                        <Image
                            className="object-cover"
                            src="/landing_images/bloc_logo.svg"
                            alt="bloc logo"
                            fill
                            priority
                        />
                    </div>
                    <div>
                        <div className='text-2xl '>Bloc</div>
                        <p className='text-xs'>Share product upadates</p>
                    </div>
                </div>
                <div className='space-x-4 mr-5 ' onClick={newChat}>
                    <Button text='New Chat' />
                </div>
            </div>
            <div className='h-[375px] overflow-y-auto '>
                <div className='flex px-2 py-2 space-x-1 mr-[25%] mt-2'>

                    <span className=' flex items-end justify-end  flex-shrink-0'>
                        <Image src={'/landing_images/bloc_logo.svg'} width={20} height={20} alt='bloc' />
                    </span>
                    <span className={'bg-gray px-2 py-1 rounded-lg text-lg '}>
                        {blocState.initialMsg}
                    </span>
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className='space-y-2'>
                        {
                            msg.type === 'user' ?
                                <div className='flex px-2 py-2 mr-auto inline justify-end space-x-1 ml-[25%] '>
                                    <span className=' flex items-end justify-end'>
                                        <span>You</span>
                                    </span>
                                    <span className={'bg-primary px-2 py-1 rounded-lg text-lg '}>
                                        {msg.text}
                                    </span>
                                </div>
                                :
                                <div className='flex px-2 py-2 space-x-1 mr-[25%]'>

                                    <span className=' flex items-end justify-end  flex-shrink-0'>
                                        <Image src={'/landing_images/bloc_logo.svg'} width={20} height={20} alt='bloc' />
                                    </span>
                                    <span className={'bg-gray px-2 py-1 rounded-lg text-lg '}>
                                        {msg.text}
                                    </span>
                                </div>
                        }
                    </div>
                ))}
            </div>
            <div className='h-[50px] flex px-4 space-x-4'>
                <input
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKey}
                    className={`bg-black border-[1px] h-[40px] border-borderColor rounded px-2 w-[95%]`}
                    placeholder={''}
                    value={prompt}
                />
                <div onClick={handleClick} className=''>
                    <Image src='/dashboard/send.svg' alt='' className='border-borderColor border-[1px] hover:cursor-pointer p-2 rounded' width={40} height={40} />
                </div>
            </div>
        </div>
    )
}

export default Chatbox
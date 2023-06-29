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
import { BlocState, setBlocName, setInitialMessage, setPhoto } from '../../Redux/features/blocState'
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';



function Chatbox() {

    const blocState: BlocState = useSelector((store: RootState) => store.blocState)
    const [InitialMsg, setInitialMsg] = useState()
    const [prompt, setPrompt] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const messages: MessageState = useSelector((store: RootState) => store.Message)
    const [loading, setLoading] = useState(false);
    const [loadingNewChat, setLoadingNewChat] = useState(false)

    const token = getCookie('jwt')
    const chatId = getCookie('chatId')
    const blocId = getCookie('blocId')

    const primaryImage = blocState.photo
  const fallbackImage = '/landing_images/bloc_logo.svg';
  const [imageSource, setImageSource] = React.useState(primaryImage);

  const handleImageError = () => {
    setImageSource(fallbackImage);
  };




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
                    dispatch(setPhoto(blocState.photo))
                    dispatch(setBlocName(blocState.blocName))
                }

            }
        }
        catch (err) {
            console.log('')
        }
    }

    const getChatId = async () => {

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
                    setCookie('chatId', data.chatId)
                }

            }
        }
        catch (err) {
            console.log('')
        }

    }

    useEffect(() => {
        getBloc()
        getChatId()
    }, [])

    const handleClick = async () => {

        dispatch(addMessage({ type: "user", text: prompt }))
        setPrompt('')
        setLoading(true)


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
                if (res.status == 504) {
                    dispatch(addMessage({ type: 'bloc', text: 'We are facing high demands at the monent!' }))
                }

            }
        }

        catch (error) {
            console.log('error in Chat api: ', error)
        }
        finally {
            setLoading(false)
        }
    }

    const newChat = async () => {
        setLoadingNewChat(true)
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
            finally {
                setLoadingNewChat(false)
            }
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && loading == false && loadingNewChat== false) {
            handleClick()
        }
    }

    return (
        <div className='h-[70vh]  rounded-lg border-[1px] border-borderColor flex-col'>
            <div className='h-[15%] border-b-[1px] flex items-center justify-between '>
                <div className='flex items-center space-x-2 ml-4 '>
                    <div className="relative md:h-10 md:w-10 h-6 w-6">
                        <Image
                            className="object-cover"
                            src={imageSource}
                            alt="bloc logo"
                            fill
                            priority
                            onError={handleImageError}

                        />
                    </div>
                    <div>
                        <div className='text-2xl '>{blocState.blocName}</div>
                        <p className='text-xs'>{blocState.subHeading}</p>
                    </div>
                </div>
              <button className='space-x-4 mr-5 ' onClick={newChat} disabled={loadingNewChat || loading} >
                    {loadingNewChat ?
                        <CircularProgress
                            variant="indeterminate"
                            disableShrink
                            sx={{
                                color: (theme) => (theme.palette.mode === 'light' ? '#28A1FF' : '#308fe8'),
                                animationDuration: '550ms',
                                position: 'relative',
                                left: 0,
                                [`& .${circularProgressClasses.circle}`]: {
                                    strokeLinecap: 'round',
                                },
                            }}
                            size={40}
                            thickness={4}
                        />
                        :
                        <Button text='New Chat' />
                    }

                </button>
            </div>
            <div className='h-[75%] overflow-y-auto '>
                <div className='flex px-2 py-2 space-x-1 mr-[25%] mt-2'>

                    <span className=' flex items-end justify-end  flex-shrink-0'>
                        <Image src={imageSource} width={20} height={20} alt='bloc' onError={handleImageError} />
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

                                    <span className=' flex items-end justify-end  flex-shrink-0 my-1'>
                                        <Image src={imageSource} width={20} height={20} alt='bloc' onError={handleImageError} />
                                    </span>
                                    <span className={'bg-gray px-2 py-1 rounded-lg text-lg '}>
                                        {msg.text}
                                    </span>
                                </div>
                        }


                    </div>
                ))}
                {loading && (
                    <div className='flex px-2 py-2 space-x-1 mr-[25%]'>
                        <span className='flex items-end justify-end flex-shrink-0'>
                            <Image src={imageSource} width={20} height={20} alt='bloc' onError={handleImageError} />
                        </span>
                        <span className='bg-gray px-2 py-1 rounded-lg text-lg' >
                            <span className='animate-pulse'>
                                Loading<span className='dot-dot-dot'>...</span>
                            </span>
                        </span>
                    </div>
                )}
            </div>
            <div className='h-[50px] flex px-4 space-x-4 items-center'>
                <input
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKey}
                    className={`bg-black border-[1px] h-[40px] border-borderColor rounded px-2 w-[95%]`}
                    placeholder={''}
                    value={prompt}
                />
                <button onClick={handleClick} className='' disabled={loading || loadingNewChat} > {""}
                    <Image src='/dashboard/send.svg' alt='' className='border-borderColor border-[1px] hover:cursor-pointer p-2 rounded' width={40} height={40} />
                </button>
            </div>
        </div>
    )
}

export default Chatbox
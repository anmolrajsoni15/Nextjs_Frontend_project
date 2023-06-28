'use client'
import Image from 'next/image'
import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebaseConfig'
import ButtonWithIcon from './ButtonWithIcon'
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import Router from 'next/router'
import { clearFiles } from '../../Redux/features/UploadFile';
import { clearMessage } from '../../Redux/features/Message';

const customStyles = {
    content: {
        top: '35%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        borderRadius: '8px',
        padding: 'none',
        boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)',
    }
}



const Sidebar = () => {

    const router = useRouter()
    const dispatch = useDispatch();

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [credit, setCredit] = useState()
    const [blocName, setBlocName] = React.useState('');
    const [isCreatingBloc, setIsCreatingBloc] = useState(false); // Added state for button disable
    const [loadingLogout, setLoadingLogout] = useState(false)



    const handleBlocName = (e: any) => {
        setBlocName(e.target.value)
    }



    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const logout = async () => {
        await setLoadingLogout(true)
        await signOut(auth)
        deleteCookie('user')
        deleteCookie('blocId')
        deleteCookie('jwt')
        deleteCookie('chatId')
        router.push('/')
        router.refresh()
        await setLoadingLogout(false)

        // setTimeout(() => {
        //     location.reload();
        //   }, 100);
    }

    const createNewBloc = async () => {

        setIsCreatingBloc(true); // Disable the button
        const token = getCookie('jwt')

        const data = {
            name: blocName,
            photo: '',
            initialMessage: 'Hey, I am bloc! How can I help you?',
            subHeading: '',
            isPublic: true
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/bloc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`

                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Network Response was not ok!')
            }

            const result = await response.json()
            console.log(result)
            localStorage.setItem("blocId", result.blocId)
            setCookie('blocId', result.blocId)
            router.push('/create')
            dispatch(clearFiles())
            dispatch(clearMessage())
        }
        catch (error) {
            console.log("There is a problem with your fetching operations: ", error)
        }
        finally {
            setIsCreatingBloc(false); // Enable the button
        }
    }

    // const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    //     if (e.key === "Enter") {
    //       e.preventDefault();
    //       createNewBloc();
    //     }
    //   };

    const getCredits = async () => {
        try {
            const token = getCookie('jwt')
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!res.ok) {
                console.log('Network Response for the getCredits is not ok!')
            }
            if (res.ok) {
                const result = await res.json()
                setCredit(result.credits)
            }
        }
        catch (err) {
            console.log('There is an error in getCredits api: ',err)
        }
    }

    useEffect(() => {
        getCredits()
    }, [])

    const goToDashboard = () => {
        router.push('/dashboard')
        router.refresh()
    }


    return (
        <section className={` w-[225px] flex-shrink-0 object-contain flex flex-col justify-between  border-r-2 py-6  top-0 sticky h-screen`}>
            <div className='px-6'>
                <div className='flex items-center space-x-2 '>
                    <div className="relative md:h-10 md:w-10 h-6 w-6">
                        <Image
                            className="object-cover"
                            src="/landing_images/bloc_logo.svg"
                            alt="bloc logo"
                            fill
                            priority
                        />
                    </div>
                    <Link href={'/dashboard'} className='cursor-pointer' onClick={goToDashboard} >
                        <div className='text-2xl '>Bloc</div>
                        <p className='text-xs'>Share product upadates</p>
                    </Link>
                </div>
                <div className='text-center pt-8'>
                    <div onClick={openModal}>
                        <ButtonWithIcon className={'px-8'} text={'New Bloc'} iconURL={'/dashboard/plus.svg'} imgAlt={'plus'} />
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    //   onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Bloc Name"
                >
                    <form
                        onSubmit={(e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            if (!isCreatingBloc) {
                                createNewBloc();
                            }
                        }}
                        className="flex flex-col p-8 py-10 gap-6 w-[50vw] items-center justify-center bg-[#181818] text-white rounded-lg">
                        <h1 className='text-center font-spacegrotesk font-bold text-5xl'>New  Bloc</h1>
                        <div className='w-full'>
                            <label htmlFor="" className='text-lg font-spacegrotesk font-medium text-[#e7e7e7] pl-1'>Name</label>
                            <input
                                type="text"
                                value={blocName}
                                placeholder='Name your Bloc'
                                onChange={handleBlocName}
                                className='bg-[#292929] border border-solid text-[#e1e1e1] border-slate-500 rounded-md px-2 py-1 
                        font-spacegrotesk text-base font-normal focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-5 w-full h-10'
                                required />
                        </div>
                        <button
                            type="submit"
                            className="w-2/5 h-10 mt-4 bg-primary rounded-md border-none font-inter font-medium"
                            disabled={isCreatingBloc} // Disable the button based on state
                        >
                            {isCreatingBloc ? 'Creating...' : 'Create'}
                        </button>

                    </form>
                </Modal>
            </div>
            <div className='space-y-16'>
                <div className='border-y-[1px] border-[#333333] py-2'>
                    <div className='flex px-6 space-x-4 items-center'>
                        <div className='text-sm text-center'>
                            Tokens<br />
                            {credit}
                        </div>
                        <div>
                            <Link href={'#'}  >
                                <ButtonWithIcon className={''} text={'Upgrade'} iconURL={'/dashboard/upgrade.svg'} imgAlt={'upgrade'} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='px-6 space-y-4'>
                    <Link href={'/blog'} className='flex space-x-2' target='_blank'>
                        <span>Resources</span>
                    </Link>
                    <Link href={'mailto:shrish@mysticlabs.ai'} className='flex space-x-2' target='_blank'>
                        <span>Support</span>
                    </Link>
                    {/* <Link href={'/'} > */}
                    <button className='flex space-x-2 cursor-pointer' onClick={logout} disabled={loadingLogout}>
                        {loadingLogout ? "Logging out..." : "Log out"}
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        </section >
    )
}

export default Sidebar
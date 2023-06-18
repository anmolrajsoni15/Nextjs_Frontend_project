'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { signOut } from 'firebase/auth'
import { auth } from '../../Firebase/firebaseConfig'
import ButtonWithIcon from './ButtonWithIcon'
import Modal from 'react-modal';



const Sidebar = () => {

    const router = useRouter()

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const logout = async () => {
        await signOut(auth)
        deleteCookie('user')
        deleteCookie('blocId')
        deleteCookie('jwt')
        deleteCookie('chatId')
        router.push('/')
    }

    const createNewBloc = async () => {
        
        const token = getCookie('jwt')
        const data = {
            name: '',
            photo: '',
            initialMessage:'',
            subHeading:'',
            isPublic: false
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
        }
        catch (error) {
            console.log("There is a problem with your fetching operations: ", error)
        }
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
                    <div>
                        <div className='text-2xl '>Bloc</div>
                        <p className='text-xs'>Share product upadates</p>
                    </div>
                </div>
                <div className='text-center pt-8'>
                    <div onClick={createNewBloc}>
                        <ButtonWithIcon className={'px-8'} text={'New Bloc'} iconURL={'/dashboard/plus.svg'} imgAlt={'plus'} />
                    </div>
                </div>
                {/* <Modal
                isOpen={modalIsOpen}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

            </Modal> */}
            </div>
            <div className='space-y-16'>
                <div className='border-y-[1px] border-[#333333] py-2'>
                    <div className='flex px-6 space-x-4 items-center'>
                        <div className='text-sm'>
                            Tokens<br />
                            10,000
                        </div>
                        <div>
                            <Link href={'#'}  >
                                <ButtonWithIcon className={''} text={'Upgrade'} iconURL={'/dashboard/upgrade.svg'} imgAlt={'upgrade'} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='px-6 space-y-4'>
                    <Link href={'#'} className='flex space-x-2'>
                        <span>Resources</span>
                    </Link>
                    <Link href={'#'} className='flex space-x-2'>
                        <span>Support</span>
                    </Link>
                    <button className='flex space-x-2 cursor-pointer' onClick={logout}>
                        Log out
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Sidebar
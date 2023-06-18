'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import NavHeader from '../NavHeader'
import Image from 'next/image'

const Navbar = () => {

    const [state, setState] = useState(false)
    const menuBtnEl = useRef()

    const navigation = [
        { name: "Features", href: "/#features" },
        // { name: "Pricing", href: "/#pricing" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "FAQs", href: "/#faqs" },
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!menuBtnEl.current.contains(target)) setState(false);
        };
    }, [])

    return (
        <header className='relative'>
            <div className="custom-screen md:hidden">
                <NavHeader menuBtnEl={menuBtnEl} state={state} onClick={() => setState(!state)} />
            </div>
            <nav className={`pb-5 md:pt-5 md:text-sm md:static md:block ${state ? "bg-black absolute z-20 top-0 inset-x-0 rounded-b-2xl shadow-xl md:bg-black" : "hidden"}`}>
                <div className="custom-screen items-center md:flex">
                    <NavHeader state={state} onClick={() => setState(!state)} />
                    <div className={`flex-1 items-center mt-8 text-gray-300 md:font-medium md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                        <ul className="flex-1 justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className="hover:text-gray-50">
                                            <Link href={item.href} className="block">
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <Link href={'https://nsbxei0ai38.typeform.com/to/fd3UK76K'}>
                        <div  className="my-4 border rounded-full py-2 w-fit md:px-6 px-4 md:w-fit w-[100%] justify-center
                         flex flex-row items-center bg-[#28A1FF] border-gray-600 hover:border-[#28A1FF] cursor-pointer">
                            {/* <div className="h-6 w-6 sm:w-8 sm:h-8 relative">
                                <Image src="landing_images/google.svg"
                                    alt="Google Logo"
                                    className='object-cover'
                                    fill
                                />
                            </div>
                            <div className="sm:w-4 w-2">  </div> */}
                            <div className="sm:font-medium text-md text-black" > Join the Waitlist </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
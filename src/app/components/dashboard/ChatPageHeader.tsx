'use client'
import Link from 'next/link'
import React from 'react'
import ButtonWithIcon from './ButtonWithIcon'
import { getCookie } from 'cookies-next'
import Modal from 'react-modal';
import Image from 'next/image'
import QRCode from "react-qr-code";
import {
    WhatsappShareButton,
    EmailShareButton
} from "next-share";   


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        padding: 'none',
    }
}

function ChatPageHeader() {


    const blocId = getCookie('blocId')
    const link = `https://app.askbloc.ai/bloc/${blocId}`

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }


    const copylink = (e: any) => {
        navigator.clipboard.writeText(link)
    }

    return (
        <div className='flex justify-end space-x-4 '>
            <Link href={`/bloc/${blocId}/settings`}>
                <ButtonWithIcon iconURL={'/dashboard/settings.svg'} text={'Settings'} imgAlt={'Settings'} className={'px-1'} />
            </Link>
            <div onClick={openModal}>
                <ButtonWithIcon iconURL={'/dashboard/share.svg'} text={'Share'} imgAlt={'Share'} className={'px-1'} />
            </div>
            <Modal
                isOpen={modalIsOpen}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='w-[90vw] md:w-[50vw] lg:w-[33vw] bg-[#17181B] p-5 rounded-lg text-sm space-y-4 pb-8 flex flex-col gap-0'>
                    <div className='flex justify-between'>
                        <h1 className='text-[#FCFCFD] text-xl font-inter font-medium'>Share Bloc</h1>
                        <Image src={'/dashboard/cross.svg'} width={20} height={20} alt='close' onClick={closeModal} className='cursor-pointer' />
                    </div>
                    <div>
                        <div className='text-primary text-sm font-inter font-medium my-1'>DIRECT LINK</div>
                        <p className='text-[#FCFCFD] font-inter font-medium text-sm py-1'>Everyone with this link will be able to interact with bloc</p>
                        <div className='border-[2px] w-full h-11 rounded-md bg-[#2A2A2D] border-[#484C56] flex justify-between items-center'>
                            <div className='p-2 text-white overflow-hidden text-xs font-spacegrotesk font-normal'>{link}</div>
                            <div className='bg-primary w-10 h-full flex rounded-r justify-center cursor-pointer' onClick={copylink}><Image src='/dashboard/copy.svg' width={16} height={16} alt='copy' /></div>
                        </div>
                    </div>
                    <div>
                        <div className='text-primary text-sm font-inter font-medium my-2'>SHARE ON SOCIAL MEDIA</div>
                        <div className="flex flex-row gap-4">
                            <WhatsappShareButton url={link}>
                                <div className='bg-[#2A2A2D] w-14 h-14 flex rounded-full items-center justify-center cursor-pointer'><Image src='/dashboard/whatsapp.svg' width={15} height={15} alt='whatsapp' /></div>
                            </WhatsappShareButton>
                            <EmailShareButton url={link}>
                                <div className='bg-[#2A2A2D] w-14 h-14 flex rounded-full items-center justify-center cursor-pointer'><Image src='/dashboard/email.svg' width={15} height={15} alt='email' /></div>
                            </EmailShareButton>
                        </div>
                    </div>
                    <div>
                        <div className='text-primary text-sm font-inter font-medium my-1'>OPEN ON MOBILE</div>
                        <div className='text-[#FCFCFD] font-inter font-medium text-sm py-1'>Scan with your phone&apos;s camera or QR code app to view </div>
                        <div className='rounded-lg bg-[#2A2A2D] border-[#484C56] w-full border-[2px] p-5'>
                            <div className='bg-red' style={{ height: "auto", margin: "0 auto", maxWidth: 128, width: "100%" }}>
                                <QRCode
                                    size={512}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={link}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >

        </div>
    )
}

export default ChatPageHeader
'use client'
import React, { useState } from 'react'
import Input from './Input'
import Chatbot from './Chatbot'
import Chatbox from './Chatbox'
import Button from './Button'
import Image from 'next/image'

function EditChatbot() {

    const [initialMsg, setInitialMsg] = useState('Hi, How can I help you?')

    const chatbotEdits = [
        {
            title: 'Name',
            placeholder: 'chatbot name example',
        },
        {
            title: 'Initial Messages',
            placeholder: 'Hi, How can I help you?',
            type: 'bloc',
            text: initialMsg
        },
        {
            title: 'Suggested Questions',
            placeholder: 'For example- Why is UI UX important?',
        }
    ]

    const messages = [
        {
            type: 'user',
            text: initialMsg
        },
        {
            type: 'bloc',
            text: 'kdjk'
        }
    ]

    return (

        <section className='py-8 space-y-10'>
            <h2 className='text-3xl font-semibold'>Edit Chatbot </h2>
            <article className=' flex'>
                <div className='w-[50%] space-y-5'>
                    <div>
                        <h3>Name</h3>
                        <Input placeholder='chatbot name example' className='w-[95%]' />
                    </div>
                    <div>
                        <h3>Initial Messages</h3>
                        <Input placeholder='Hi, How can I help you?' className='w-[95%]' />
                    </div>
                    <div>
                        <h3>Suggested Questions</h3>
                        <Input placeholder='For example- ' className='w-[95%]' />
                    </div>
                    <Button text='Save' />
                </div>
                <div className='w-[30%] mx-auto border-[1px] border-borderColor rounded'>
                    <div className='h-[375px] overflow-y-auto'>

                        {chatbotEdits.map((msg, index) => (
                            <div key={index} className='space-y-2'>
                                {
                                    msg.type === 'user' &&
                                    <div className='flex px-2 py-2 mr-auto inline justify-end space-x-1 ml-[25%] '>
                                        <span className=' flex items-end justify-end'>
                                            <span>You</span>
                                        </span>
                                        <span className={'bg-primary px-2 py-1 rounded-lg text-lg '}>
                                            {msg.text}
                                        </span>
                                    </div>
                                }
                                {msg.type === 'bloc' &&
                                    <div className='flex px-2 py-2 space-x-1 mr-[25%]'>

                                        <span className=' flex items-end justify-end'>
                                            <Image src={'/landing_images/bloc_logo.svg'} width={20} height={20} alt='bloc' />
                                        </span>
                                        <span className={'bg-gray px-2 py-1 rounded-lg text-lg w-[97%]'}>
                                            {msg.text}
                                        </span>
                                    </div>}

                            </div>

                        ))
                        }

                    </div>
                    <div className='flex p-2'>
                        <Input className='w-[100%] disabled' />
                        <div>Send</div>
                    </div>
                </div>

            </article>
        </section>

    )
}

export default EditChatbot
'use client'

import Image from 'next/image';
import React, {useState} from 'react'

const pricingFAQ = [
    {
        question: 'Is there a free trial available?',
        answer: `Yes, we offer an unlimited free plan for our users. You can sign up for a free trial on our website.`
    },
    {
        question: 'Can I upgrade my plan later?',
        answer: `Absolutely! You can upgrade your plan at any time from your account settings. The changes will take effect immediately, and the new billing rate will be applied to your next billing cycle.`
    },
    {
        question: 'Which payment methods are accepted?',
        answer: `We accept all major credit cards including Visa, MasterCard, and American Express. We also accept payments through PayPal.`
    },
    {
        question: 'Is my payment information secure?',
        answer: `Yes, your payment information is secure. We use industry-standard encryption for all transactions and do not store your credit card information on our servers. We work with Stripe, the category defining company in this space.`
    },
    {
        question: 'What happens if I exceed my message limits?',
        answer: `If you exceed your message limits, we will notify you and give you the option to upgrade your plan. You will not be charged automatically for overages.`
    },
    {
        question: 'Do you offer any discounts for annual subscriptions?',
        answer: `Yes, we offer a significant discount for annual subscriptions compared to monthly billing. You can can reach out to us through our Email or whatsapp.`
    },
]

const PricingFAQ = () => {
    const [answerIndex, setAnswerIndex] = useState<Number>(-1);

    const handleToggleAnswer = (index: number) => {
        if (answerIndex === index) {
            setAnswerIndex(-1);
        } else {
            setAnswerIndex(index);
        }
    }

  return (
    <div className='flex flex-col items-center justify-center w-full gap-16 px-0 md:px-20 lg:px-36 py-16'>
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="text-[#D0D0D0] text-center text-3xl font-semibold font-poppins">Frequently asked questions</div>
            <div className="text-[#D0D0D0] text-center font-spacegrotesk font-normal text-base md:font-medium md:text-xl">Everything you need to know about the product and billing.</div>
        </div>
        <div className="flex w-full flex-col items-start justify-start">
            {
                pricingFAQ.map((item, index) => (
                    <div key={index} className={`${index == 0 ? "" : "border-t border-solid border-[#313131]"} flex w-full items-start justify-between pb-8 pt-6`}>
                        <div className="flex flex-col w-[95%] items-start justify-start gap-2">
                            <div className="text-[#D0D0D0] font-poppins text-base font-semibold">{item.question}</div>
                            {
                                answerIndex === index && (
                                    <div className="text-[#717171] font-spacegrotesk text-base">{item.answer}</div>
                                )
                            }
                        </div>
                        <button onClick={() => handleToggleAnswer(index)} className="flex items-center justify-center w-[5%]">
                            {
                                answerIndex === index ? (
                                    <Image src='/icons/minus-circle.svg' alt="minus" width={20} height={20} />
                                ) : (
                                    <Image src='/icons/plus-circle.svg' alt="plus" width={20} height={20} />
                                )

                            }
                        </button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PricingFAQ
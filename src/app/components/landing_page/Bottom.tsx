import React from 'react'
import Button from '../common/Button'

const Bottom = () => {
  return (
    <div className='flex items-center justify-center w-full border-y border-solid border-[#88888870] py-12 gap-14'>
        <div className="font-poppins font-semibold text-2xl">Free up your time and <span className='text-primary'>increase productivity</span> with Bloc</div>
        <Button text={'Join the Waitlist'} />
    </div>
  )
}

export default Bottom
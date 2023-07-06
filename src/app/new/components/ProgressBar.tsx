import React from 'react'

interface ProgressBarProps{
    c1?:string;
    c2?:string;
}

const ProgressBar = ({ c1,c2}:ProgressBarProps) => {
    return (
        <div className='flex space-x-2 w-full items-center justify-center'>
            <div className={`w-[24.5%] h-1  rounded-full my-2 flex ${c1}`}></div>
            <div className={`w-[24.5%] h-1  rounded-full my-2 flex ${c2}`}></div>
        </div>
    )
}

export default ProgressBar
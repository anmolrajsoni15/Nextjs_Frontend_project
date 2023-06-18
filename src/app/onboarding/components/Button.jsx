'use client'

import React from 'react'

function Button({value}) {
  return (
    <button className='border-none w-full p-3 rounded-lg bg-sky-600 text-base leading-5 font-medium font-spacegrotesk hover:bg-sky-500'>
        {value}
    </button>
  )
}

export default Button
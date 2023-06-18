'use client'

import { Twitter, Facebook, LinkedIn } from '@mui/icons-material'

const Footer = () => {
  return (
    <div className='flex flex-row w-4/5 mx-auto h-20 items-start justify-between'>
        <div>&copy; 2023 Bloc. All rights reserved.</div>
        <div className='flex flex-row gap-5'>
            <Twitter />
            <Facebook />
            <LinkedIn />
        </div>
    </div>
  )
}

export default Footer
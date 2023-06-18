import React from 'react'
import Link from 'next/link'

interface SettingTopDivProps {
  c1?: string;
  c2?: string;
  c3?: string
}
const SettingTopDiv = ({ c1, c2, c3 }: SettingTopDivProps) => {
  return (
    <div>
      <div className='space-y-2'>
        <h2 className='text-3xl text-bold'>Settings</h2>
        <div className='flex space-x-4'>
          <Link href={'#'} className={`text-2xl ${c1}`}>Settings</Link>
          <Link href={'#'} className={`text-2xl ${c2}`}>Data Integration</Link>
          <Link href={'#'} className={`text-2xl ${c3}`}>Dashboard</Link>
        </div>
      </div>
    </div>
  )
}

export default SettingTopDiv
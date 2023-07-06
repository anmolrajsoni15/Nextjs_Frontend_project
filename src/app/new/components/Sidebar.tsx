'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
    userData: any;
}

const Sidebar: React.FC<Props> = ({userData}) => {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState('dashboard');

  useEffect(() => {
    setSelectedIcon(window.location.pathname.split('/')[2]);
  }
  , []);

  const handleClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  const gotoResources = () => {
    router.push('/blog');
  };

  return (
    <div>
    <div className='fixed flex flex-col items-center justify-between h-screen w-20 md:w-24 border-r border-solid border-[#ffffff50]'>
      <div className="icon_corner flex flex-col gap-8 mt-10">
        <Link href='/new/dashboard'>
          <div className={`icon p-2 md:p-[10px] rounded-md ${selectedIcon === 'dashboard' ? 'selected' : ''}`} onClick={() => handleClick('dashboard')}>
            <Image src="/icons/icon-outline-home.svg" alt="dashboard" width={24} height={24} />
          </div>
        </Link>
        <Link href='/new/creates'>
        <div className={`icon p-2 md:p-[10px] rounded-md ${selectedIcon === 'creates' ? 'selected' : ''}`} onClick={() => handleClick('creates')}>
          <Image src="/icons/plus.svg" alt="add" width={24} height={24} />
        </div>
        </Link>
          <div onClickCapture={gotoResources} className={`icon p-2 md:p-[10px] rounded-md ${selectedIcon === 'help' ? 'selected' : ''}`} onClick={() => handleClick('help')}>
            <Image src="/icons/help-octagon.svg" alt="help" width={24} height={24} />
          </div>
      </div>
      <div className="my-4 rounded-full">
        <Image src={userData && userData?.photo ? userData.photo : "/images/dummy.png"} alt="dummy" width={50} height={50} className='rounded-full' />
      </div>

      <style jsx>{`
        .icon {
          transition: background-color 0.3s ease;
        }
        .selected {
          background-color: #272727;
          border: 0.7px solid rgba(255, 255, 255, 0.10);
        }
      `}</style>
    </div>
    </div>
  );
};

export default Sidebar;

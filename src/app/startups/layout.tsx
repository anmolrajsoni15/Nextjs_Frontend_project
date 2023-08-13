import Footer from "../components/common/Footer";
import NewNavbar from "../components/common/NewNavbar";
import React, { ReactNode } from 'react';
import '../globals.css'

export const metadata = {
  title: 'Bloc - Startup',
  description: 'Enhance your knowledge',
}

interface Props {
  children: ReactNode;
}

export default function StartupLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className='text-white'>
      <div className="px-[4%] md:px-[7%]">
      <NewNavbar />
      </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}
import './globals.css'
import '../globals.css'
import Navbar from "../components/landing_page/Navbar"
import NewNavbar from "../components/common/NewNavbar"
import Footer from "../components/ui/Footer/Footer";
import React, { ReactNode } from 'react';

export const metadata = {
  title: 'Bloc - Blogs',
  description: 'Enhance your knowledge',
}

interface Props {
  children: ReactNode;
}

export default function BlogLayout({ children }: Props) {
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
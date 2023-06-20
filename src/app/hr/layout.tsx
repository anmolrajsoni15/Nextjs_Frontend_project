import Footer from "../components/common/Footer";
import Navbar from "../components/landing_page/Navbar";
import React, { ReactNode } from 'react';
import '../globals.css'

export const metadata = {
  title: 'Bloc - HR',
  description: 'Enhance your knowledge',
}

interface Props {
  children: ReactNode;
}

export default function HrLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className='text-white'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
import './globals.css'
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
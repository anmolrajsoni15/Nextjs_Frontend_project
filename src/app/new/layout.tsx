import React from 'react'
import '../globals.css'

export const metadata = {
  title: 'Bloc',
  description: 'Welcome to Bloc',
}

export default function NewLayout({
    children,
  }: {
    children: React.ReactNode
  })  {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}

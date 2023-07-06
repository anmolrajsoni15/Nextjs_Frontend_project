import React from 'react'

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
    <>
        {children}
    </>
  )
}

import React from 'react'

export const metadata = {
  title: 'Create New Bloc',
  description: 'Create New Bloc',
}

export default function CreateLayout({
    children,
  }: {
    children: React.ReactNode
  })  {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

import React from 'react'

export const metadata = {
  title: 'Bloc',
  description: 'Welcome to Bloc',
}

export default function PublishLayout({
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

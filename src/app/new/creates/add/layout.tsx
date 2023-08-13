import React from 'react'

export const metadata = {
  title: 'Bloc - Add Datasources',
  description: 'Add Datasources to your bloc',
}

export default function AddLayout({
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

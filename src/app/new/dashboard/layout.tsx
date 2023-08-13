import React from 'react'

export const metadata = {
  title: 'Bloc Dashboard',
  description: 'Bloc Dashboard',
}

export default function DashboardLayout({
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

import './globals.css'
import '../globals.css'
import React from 'react'

export const metadata = {
  title: 'Bloc - Onboarding',
  description: 'Talk to your knowledge',
}

export default function OnboardingLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

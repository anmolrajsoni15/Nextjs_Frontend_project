import React from 'react'
import './styles/globals.css'
import { Providers } from './Redux/provider'
import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Bloc',
  description: 'Talk to your knowledge',
  keywords: "", //todo work here
  icons: {
    icon: { url: '/favicon/favicon.svg', type: 'image/svg' },
    shortcut: { url: '/favicon/favicon.svg', type: 'image/svg' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="favicon/android-chrome-512x512.png" />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link rel="mask-icon" href="favicon/favicon.svg" />
      </head>

      <body className='bg-black'>
        <Providers>
          {children}
        </Providers>
        <Script id='my-scr'>
          {` (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3442770,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')`}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11001878272"
          strategy="afterInteractive"
        />
        <Script
          id="ga-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11001878272');
          `,
          }}
        />
      </body>
    </html>
  )
}
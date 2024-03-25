'use client'
import './globals.css'
import React, { Suspense } from 'react'
import {
   Plus_Jakarta_Sans,
   Source_Serif_4,
   Work_Sans,
} from 'next/font/google'
import { GlobalProvider } from '@/context/store'
import Header from '@/components/organism/header'
import Footer from '@/components/organism/footer'
import { Providers } from '@/utils/themeMode' // Plus Jakarta Sans font family with 4 weights and 2 styles
import { GoogleAnalytics } from '@next/third-parties/google'
import Loading from './loading'

// Plus Jakarta Sans font family with 4 weights and 2 styles
const Jakarta_Sans = Plus_Jakarta_Sans({
   weight: ['400', '500', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-plus-jakarta-sans',
})

// Work Sans font family with 4 weights and 2 styles
const work_Sans = Work_Sans({
   weight: ['400', '500', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-work-sans',
})

// Source Serif Pro font family with 4 weights and 2 styles
const source_Serif_Pro = Source_Serif_4({
   weight: ['200', '300', '400', '600', '700'],
   style: ['normal', 'italic'],
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-source-serif-pro',
})




export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html
         lang="tr"
         suppressHydrationWarning
         className={`${source_Serif_Pro.variable} ${Jakarta_Sans.variable} ${work_Sans.variable} font-sans`}
      >
         <body>
            <Providers>
               <GlobalProvider>
                  <Header />
                  <Suspense fallback={<Loading/>}>
                     {children}
                     </Suspense>
                  <Footer />
               </GlobalProvider>
            </Providers>
         </body>
         <GoogleAnalytics gaId="G-QX86JMSHG9" />
      </html>
   )
}

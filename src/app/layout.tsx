/**************************************************************

アプリケーション全体に適用

***************************************************************/
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { comment } from 'postcss'
import { Suspense } from 'react'


import Navbar from './components/nav-bar'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'udemy講座',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>

        
          <Navbar />
          { children }
        
      </body>
    </html>
  )
}

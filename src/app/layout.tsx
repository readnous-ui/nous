import type { Metadata } from 'next'
import { Newsreader, Inter } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nous — Inquiries into Systems, Consciousness, and Agency',
  description: 'An independent journal of ideas, philosophy, and complexity. Edited by Ahmad Farooq.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased flex flex-col justify-between selection:bg-[#3B1B28] selection:text-[#F9F6F2]">
        {children}
      </body>
    </html>
  )
}

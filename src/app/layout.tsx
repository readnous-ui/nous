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
  title: 'nous — Inquiries into Systems, Consciousness, and Agency',
  description: 'An independent salon of philosophy, science, and the architecture of thought. Edited by Ahmad Farooq.',
  icons: {
    icon: '/nous-masthead.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased flex flex-col justify-between selection:bg-[#1E3A4C] selection:text-[#F8F5EE]">
        {children}
      </body>
    </html>
  )
}

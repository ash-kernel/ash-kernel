import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ash - Developer & Builder',
  description: 'Premium developer portfolio showcasing innovative projects and cutting-edge solutions',
  keywords: ['developer', 'portfolio', 'software engineer', 'projects'],
  authors: [{ name: 'Ash' }],
  openGraph: {
    title: 'Ash - Developer & Builder',
    description: 'Premium developer portfolio showcasing innovative projects and cutting-edge solutions',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}

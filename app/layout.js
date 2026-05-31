import { Inter } from 'next/font/google'
import './globals.css'
import ClientProviders from '../components/ClientProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Happy Birthday! 🎂',
  description: 'A special surprise for someone special',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
// Made By Krishna Patil
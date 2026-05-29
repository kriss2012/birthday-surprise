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
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
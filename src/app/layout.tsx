import type { Metadata } from 'next'
import '../styles/globals.css'
import CoinContextProvider from '../context/CoinContext'
import { ThemeProvider } from '../context/ThemeContext'
import ThemeBody from '../components/ThemeBody'

export const metadata: Metadata = {
  title: 'Cryptos - Cryptocurrency Marketplace',
  description: 'World\'s largest cryptocurrency marketplace. Track prices, analyze market data, and explore digital assets.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="app dark">
        <ThemeProvider>
          <ThemeBody>
            <CoinContextProvider>
              {children}
            </CoinContextProvider>
          </ThemeBody>
        </ThemeProvider>
      </body>
    </html>
  )
}
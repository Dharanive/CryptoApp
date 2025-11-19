import type { Metadata } from 'next'
import '../styles/globals.css'
import CoinContextProvider from '../context/CoinContext'

export const metadata: Metadata = {
  title: 'Cryptos - Cryptocurrency Marketplace',
  description: 'World\'s largest cryptocurrency marketplace. Track prices, analyze market data, and explore digital assets.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="app">
        <CoinContextProvider>
          {children}
        </CoinContextProvider>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import '../styles/globals.css'
import CoinContextProvider from '../context/CoinContext'

export const metadata: Metadata = {
  title: 'Crypto App',
  description: 'A cryptocurrency tracking application',
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
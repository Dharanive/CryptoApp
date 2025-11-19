import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import Coin from '../../../components/Coin/Coin'
import Footer from '../../../components/Footer/Footer'

interface CoinPageProps {
  params: {
    coinId: string
  }
}

export default function CoinPage({ params }: CoinPageProps) {
  return (
    <div className="app">
      <Navbar />
      <Coin coinId={params.coinId} />
      <Footer />
    </div>
  )
}
import React from 'react'
import NavbarCryptos from '../../../components/Navbar/NavbarCryptos'
import CoinCryptos from '../../../components/Coin/CoinCryptos'
import FooterCryptos from '../../../components/Footer/FooterCryptos'

interface CoinPageProps {
  params: {
    coinId: string
  }
}

export default function CoinPage({ params }: CoinPageProps) {
  return (
    <>
      <NavbarCryptos />
      <CoinCryptos coinId={params.coinId} />
      <FooterCryptos />
    </>
  )
}
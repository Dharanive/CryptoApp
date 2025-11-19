import React from 'react'
import NavbarModern from '../../../components/Navbar/NavbarModern'
import CoinModern from '../../../components/Coin/CoinModern'
import FooterModern from '../../../components/Footer/FooterModern'

interface CoinPageProps {
  params: {
    coinId: string
  }
}

export default function CoinPage({ params }: CoinPageProps) {
  return (
    <>
      <NavbarModern />
      <CoinModern coinId={params.coinId} />
      <FooterModern />
    </>
  )
}
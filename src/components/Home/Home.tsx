'use client'
import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import Link from 'next/link'
import Image from 'next/image'

const Home: React.FC = () => {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error('Home must be used within CoinContextProvider');
  }

  const { allCoin, currency } = context;
  const [displayCoin, setDisplayCoin] = useState<typeof allCoin>([]);
  const [input, setInput] = useState<string>('');

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  }

  const searchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the World&apos;s largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            list='coinlist'
            value={input}
            type='text'
            placeholder='Search crypto..'
            required
          />

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>

          <button type='submit'>Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => (
            <Link href={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <Image src={item.image} alt={item.name} width={24} height={24} />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}
              </p>
              <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
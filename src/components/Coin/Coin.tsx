'use client'
import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';
import Image from 'next/image';

interface CoinProps {
  coinId: string;
}

interface CoinData {
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: { [key: string]: number };
    market_cap: { [key: string]: number };
    high_24h: { [key: string]: number };
    low_24h: { [key: string]: number };
  };
}

interface HistoricalData {
  prices: [number, number][];
}

const Coin: React.FC<CoinProps> = ({ coinId }) => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);

  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('Coin must be used within CoinContextProvider');
  }

  const { currency } = context;

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-U1Y5CXLJyUptYCVT6NswWV3N'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error(err);
    }
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-U1Y5CXLJyUptYCVT6NswWV3N'
      }
    };

    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      const data = await response.json();
      setHistoricalData(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, coinId])

  if (coinData && historicalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <Image src={coinData.image.large} alt={coinData.name} width={80} height={80} />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>

        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    )
  }
}

export default Coin
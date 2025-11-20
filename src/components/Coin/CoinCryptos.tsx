'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../LineChart/LineChart';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { TrendingUp, TrendingDown, Star, BarChart3, Globe, Calendar, Bitcoin } from 'lucide-react'
import { cn } from '@/lib/utils'
import './CoinCryptos.css'

interface CoinCryptosProps {
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
    price_change_percentage_24h: number;
    total_volume: { [key: string]: number };
    circulating_supply: number;
    total_supply: number;
  };
  description?: {
    en: string;
  };
  links?: {
    homepage: string[];
  };
}

interface HistoricalData {
  prices: [number, number][];
}

const CoinCryptos: React.FC<CoinCryptosProps> = ({ coinId }) => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);

  const context = useContext(CoinContext);
  if (!context) {
    throw new Error('CoinCryptos must be used within CoinContextProvider');
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

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
  }

  if (!coinData || !historicalData) {
    return (
      <div className="coin-loading-container min-h-screen bg-black">
        <div className="container mx-auto px-4 pt-8 pb-20">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header Skeleton */}
            <Card className="coin-loading-card bg-gray-900/30 border-gray-700">
              <CardContent className="p-8">
                <div className="flex items-center gap-4">
                  <Skeleton className="coin-skeleton w-16 h-16 rounded-full bg-gray-700" />
                  <div className="space-y-2">
                    <Skeleton className="coin-skeleton h-8 w-64 bg-gray-700" />
                    <Skeleton className="coin-skeleton h-4 w-32 bg-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart Skeleton */}
            <Card className="coin-loading-card bg-gray-900/30 border-gray-700">
              <CardContent className="p-8">
                <Skeleton className="coin-skeleton h-96 w-full bg-gray-700" />
              </CardContent>
            </Card>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-gray-900/30 border-gray-700">
                  <CardContent className="p-6">
                    <Skeleton className="coin-skeleton h-4 w-20 mb-2 bg-gray-700" />
                    <Skeleton className="coin-skeleton h-6 w-32 bg-gray-700" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const priceChange24h = coinData.market_data.price_change_percentage_24h;
  const isPositiveChange = priceChange24h > 0;

  return (
    <div className="coin-cryptos-container min-h-screen bg-black">
      <div className="container mx-auto px-4 pt-8 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Coin Header */}
          <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={coinData.image.large}
                    alt={coinData.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="coin-title text-3xl font-bold text-white">
                        {coinData.name}
                      </h1>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {coinData.symbol.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-300 bg-yellow-500/10">
                        #{coinData.market_cap_rank}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="coin-price text-2xl font-bold text-white">
                        {currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}
                      </span>
                      <Badge
                        className={cn(
                          "font-medium",
                          isPositiveChange
                            ? "bg-green-500/10 text-green-400 border-green-500"
                            : "bg-red-500/10 text-red-400 border-red-500"
                        )}
                      >
                        {isPositiveChange ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(priceChange24h).toFixed(2)}%
                      </Badge>
                    </div>
                  </div>
                </div>

                {coinData.links?.homepage[0] && (
                  <div className="ml-auto">
                    <a
                      href={coinData.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      Official Website
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="coin-title flex items-center gap-3 text-white">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
                Price Chart
                <Badge variant="outline" className="ml-auto border-gray-600 text-gray-400">
                  10 Days
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-96">
                <LineChart historicalData={historicalData} />
              </div>
            </CardContent>
          </Card>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Market Cap</span>
                  <BarChart3 className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="coin-text text-xl font-semibold text-white">
                  {currency.symbol} {formatNumber(coinData.market_data.market_cap[currency.name])}
                </p>
              </CardContent>
            </Card>

            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">24H High</span>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <p className="coin-text text-xl font-semibold text-white">
                  {currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">24H Low</span>
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
                <p className="coin-text text-xl font-semibold text-white">
                  {currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}
                </p>
              </CardContent>
            </Card>

            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">24H Volume</span>
                  <Bitcoin className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="coin-text text-xl font-semibold text-white">
                  {currency.symbol} {formatNumber(coinData.market_data.total_volume[currency.name])}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="coin-title text-white">Supply Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Circulating Supply</span>
                  <span className="coin-text text-white font-semibold">
                    {formatNumber(coinData.market_data.circulating_supply)} {coinData.symbol.toUpperCase()}
                  </span>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="coin-text text-white font-semibold">
                    {coinData.market_data.total_supply
                      ? `${formatNumber(coinData.market_data.total_supply)} ${coinData.symbol.toUpperCase()}`
                      : 'N/A'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="coin-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="coin-title text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Market Cap Rank</span>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-300 bg-yellow-500/10">
                    #{coinData.market_cap_rank}
                  </Badge>
                </div>
                <Separator className="bg-gray-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price Change (24h)</span>
                  <Badge
                    className={cn(
                      isPositiveChange
                        ? "bg-green-500/10 text-green-400 border-green-500"
                        : "bg-red-500/10 text-red-400 border-red-500"
                    )}
                  >
                    {isPositiveChange ? '+' : ''}{priceChange24h.toFixed(2)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinCryptos
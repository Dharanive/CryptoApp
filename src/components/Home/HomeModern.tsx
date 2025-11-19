'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, TrendingDown, Star, ArrowRight, Coins } from 'lucide-react'
import { cn } from '@/lib/utils'

const HomeModern: React.FC = () => {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error('HomeModern must be used within CoinContextProvider');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Content */}
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
             
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Largest Crypto
              <br />
              Marketplace
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Welcome to the World&apos;s largest cryptocurrency marketplace.
              Sign up to explore more about cryptos and start your investment journey.
            </p>
          </div>

          {/* Search Section */}
          <Card className="max-w-2xl mx-auto bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={searchHandler} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    onChange={inputHandler}
                    list='coinlist'
                    value={input}
                    type='text'
                    placeholder='Search cryptocurrencies...'
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                    required
                  />
                  <datalist id='coinlist'>
                    {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
                  </datalist>
                </div>
                <Button type='submit' className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Crypto Table Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-slate-900/30 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-white">
                <Coins className="w-6 h-6 text-purple-400" />
                Top Cryptocurrencies
                <Badge variant="outline" className="ml-auto border-purple-500 text-purple-300">
                  Live Prices
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 p-6 border-b border-slate-700 text-slate-400 font-medium">
                <div className="text-center">#</div>
                <div>Coin</div>
                <div className="text-right">Price</div>
                <div className="text-center">24H Change</div>
                <div className="text-right">Market Cap</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-700">
                {displayCoin.slice(0, 10).map((item, index) => (
                  <Link
                    href={`/coin/${item.id}`}
                    key={index}
                    className="grid grid-cols-5 gap-4 p-6 hover:bg-slate-800/50 transition-colors group"
                  >
                    <div className="text-center text-slate-300 font-medium">
                      {item.market_cap_rank}
                    </div>

                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {item.name}
                        </span>
                        <span className="text-sm text-slate-400 uppercase">
                          {item.symbol}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-semibold text-white">
                      {currency.symbol} {item.current_price.toLocaleString()}
                    </div>

                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className={cn(
                          "font-medium",
                          item.price_change_percentage_24h > 0
                            ? "border-green-500 text-green-400 bg-green-500/10"
                            : "border-red-500 text-red-400 bg-red-500/10"
                        )}
                      >
                        {item.price_change_percentage_24h > 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {Math.abs(Math.floor(item.price_change_percentage_24h * 100) / 100)}%
                      </Badge>
                    </div>

                    <div className="text-right font-semibold text-slate-300">
                      {currency.symbol} {item.market_cap.toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomeModern
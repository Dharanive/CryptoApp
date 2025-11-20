'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MiniChart from '@/components/ui/mini-chart'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Search, TrendingUp, TrendingDown, Star, ArrowRight, Coins,
  BarChart3, Users, Shield, Zap, Globe, Award, Lock,
  Activity, DollarSign, PieChart, Target, Sparkles,
  ChevronUp, ChevronDown, Eye, Play, Bitcoin, Wallet, X,
  ExternalLink, Flame, Check
} from 'lucide-react'
import { cn } from '@/lib/utils'
import './HomeCryptos.css'

const HomeeCryptos: React.FC = () => {
  const context = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState<typeof allCoin>([]);
  const [input, setInput] = useState<string>('');
  const [highlightsVisible, setHighlightsVisible] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<typeof allCoin>([]);

  // Load highlights state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem('highlightsVisible');
    if (savedState !== null) {
      setHighlightsVisible(JSON.parse(savedState));
    }
  }, []);

  // Save highlights state to localStorage whenever it changes
  const toggleHighlights = () => {
    const newState = !highlightsVisible;
    setHighlightsVisible(newState);
    localStorage.setItem('highlightsVisible', JSON.stringify(newState));
  };

  if (!context) {
    throw new Error('HomeCryptos must be used within CoinContextProvider');
  }

  const { allCoin, currency } = context;

  // Generate sample chart data for each coin
  const generateChartData = (coinId: string) => {
    const baseValue = Math.random() * 100 + 50;
    const data = [];

    for (let i = 0; i < 20; i++) {
      const variation = (Math.random() - 0.5) * 10;
      const value = Math.max(0, baseValue + variation * (i / 10));
      data.push(value);
    }

    return data;
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setShowDropdown(false);
      setSearchResults([]);
    } else {
      const coins = allCoin.filter((item) => {
        return item.name.toLowerCase().includes(event.target.value.toLowerCase())
      });
      setSearchResults(coins);
      setShowDropdown(true);
    }
  }

  const searchHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === "") return;

    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins);
    setShowDropdown(false);
  }

  const selectCoin = (coinName: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setInput(coinName);
    setShowDropdown(false);
    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(coinName.toLowerCase())
    })
    setDisplayCoin(coins);
  }

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin])

  const features = [
    {
      icon: Zap,
      title: "Instant Trading",
      description: "Execute trades instantly with zero delays and competitive rates",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure Wallet",
      description: "Industry-leading security with multi-layer protection protocols",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Professional trading charts and real-time market insights",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Trade cryptocurrencies from anywhere in the world, 24/7",
      gradient: "from-yellow-600 to-amber-500"
    }
  ]

  const stats = [
    { label: "Active Traders", value: "2M+", icon: Users, color: "text-yellow-400" },
    { label: "Daily Volume", value: "$50B+", icon: DollarSign, color: "text-amber-400" },
    { label: "Cryptocurrencies", value: "500+", icon: Bitcoin, color: "text-orange-400" },
    { label: "Countries", value: "180+", icon: Globe, color: "text-yellow-500" }
  ]

  // Calculate dynamic market data
  const calculateMarketData = () => {
    if (!allCoin || allCoin.length === 0) return { totalMarketCap: 0, totalVolume: 0, marketChange: 0 }

    const totalMarketCap = allCoin.reduce((sum, coin) => sum + (coin.market_cap || 0), 0)
    const totalVolume = allCoin.reduce((sum, coin) => sum + (coin.total_volume || 0), 0)
    const avgChange = allCoin.reduce((sum, coin) => sum + (coin.price_change_percentage_24h || 0), 0) / allCoin.length

    return { totalMarketCap, totalVolume, marketChange: avgChange }
  }

  const { totalMarketCap, totalVolume, marketChange } = calculateMarketData()

  // Dynamic trending coins (top 3 by market cap)
  const trendingCoins = allCoin.slice(0, 3).map(coin => ({
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    price: `${currency.symbol}${coin.current_price.toLocaleString()}`,
    change: `${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(1)}%`,
    changeColor: coin.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400",
    image: coin.image
  }))

  // Dynamic top gainers (top 3 with highest 24h change)
  const topGainers = allCoin
    .filter(coin => coin.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3)
    .map(coin => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `${currency.symbol}${coin.current_price.toFixed(coin.current_price < 1 ? 6 : 2)}`,
      change: `+${coin.price_change_percentage_24h.toFixed(1)}%`,
      changeColor: "text-green-400",
      image: coin.image
    }))

  return (
    <div className="home-cryptos-container relative min-h-screen overflow-hidden">

      {/* Hero Section */}
      <div className="relative container mx-auto px-4 pt-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.h1
              className="hero-title text-5xl md:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The world&apos;s leading
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                decentralized
              </span>
              <br />
              digital exchange.
            </motion.h1>

            <motion.p
              className="hero-description text-xl text-gray-400 max-w-lg leading-relaxed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Cryptos exchange platform is the premier digital currency
              exchange licensed in and for state of NY.
            </motion.p>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold px-8 py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              >
                Get started
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-gray-400 hover:text-white border border-gray-700 hover:border-yellow-500 px-6 py-4 rounded-lg transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2" />
                How it works?
              </Button>
            </motion.div>

          </motion.div>

          {/* Right Side - 3D Animation Space */}
          <motion.div
            className="relative h-96 lg:h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* This space is reserved for the floating animations defined above */}
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="relative container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group text-center"
            >
              <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300",
                "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 group-hover:scale-110 group-hover:from-yellow-500/30 group-hover:to-amber-500/30")}>
                <stat.icon className={cn("w-8 h-8", stat.color)} />
              </div>
              <div className="stat-value text-4xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                {stat.value}
              </div>
              <div className="card-text text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Highlights Section */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Toggle */}
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="card-title text-4xl font-bold text-white mb-2">
                Cryptocurrency Prices by Market Cap
              </h2>
              <p className="card-text text-gray-400">
                The global cryptocurrency market cap today is {currency.symbol}{(totalMarketCap / 1e12).toFixed(2)} Trillion, a{" "}
                <span className={marketChange >= 0 ? "text-green-400" : "text-red-400"}>
                  {marketChange >= 0 ? "▲" : "▼"} {Math.abs(marketChange).toFixed(1)}%
                </span> change in the last 24 hours.{" "}
                <span className="text-yellow-400 cursor-pointer hover:underline">Read more</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400 font-medium">Highlights</span>
              <button
                onClick={toggleHighlights}
                className={cn(
                  "relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none",
                  highlightsVisible
                    ? "bg-green-500"
                    : "bg-gray-700"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center",
                    highlightsVisible
                      ? "left-5"
                      : "left-0.5"
                  )}
                >
                  {highlightsVisible && (
                    <Check className="w-3 h-3 text-green-500 font-bold" strokeWidth={2.5} />
                  )}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Market Stats and Trending */}
          <AnimatePresence>
            {highlightsVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Market Stats */}
                  <div className="lg:col-span-1">
                    <Card className="market-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm h-full">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div>
                            <div className="market-stats-value text-3xl font-bold text-white mb-1">
                              {currency.symbol}{(totalMarketCap / 1e9).toFixed(0)}B
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="market-stats-label text-gray-400">Market Cap</span>
                              <span className={marketChange >= 0 ? "text-green-400" : "text-red-400"}>
                                {marketChange >= 0 ? "▲" : "▼"} {Math.abs(marketChange).toFixed(1)}%
                              </span>
                            </div>
                            <MiniChart
                              data={generateChartData('market-cap')}
                              width={200}
                              height={60}
                              color={marketChange >= 0 ? "#10b981" : "#ef4444"}
                            />
                          </div>
                          <div>
                            <div className="market-stats-value text-3xl font-bold text-white mb-1">
                              {currency.symbol}{(totalVolume / 1e9).toFixed(0)}B
                            </div>
                            <div className="market-stats-label text-gray-400 text-sm">24h Trading Volume</div>
                            <MiniChart
                              data={generateChartData('volume')}
                              width={200}
                              height={60}
                              color="#10b981"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Trending Section */}
                  <div className="lg:col-span-1">
                    <Card className="market-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm h-full">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-3 text-xl text-white">
                          <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                            <Flame className="w-4 h-4 text-orange-400" />
                          </div>
                          Trending
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-gray-400 hover:text-yellow-400 text-sm"
                          >
                            View more
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {trendingCoins.map((coin, index) => (
                            <div key={coin.symbol} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {coin.image ? (
                                  <Image
                                    src={coin.image}
                                    alt={coin.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {coin.symbol[0]}
                                  </div>
                                )}
                                <div>
                                  <div className="crypto-name text-white font-medium">{coin.name}</div>
                                  <div className="crypto-symbol text-gray-400 text-xs">{coin.symbol}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="crypto-price text-white font-medium text-sm">{coin.price}</div>
                                <div className={cn("text-xs", coin.changeColor)}>{coin.change}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Gainers Section */}
                  <div className="lg:col-span-1">
                    <Card className="market-card bg-gray-900/30 border-gray-700/50 backdrop-blur-sm h-full">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-3 text-xl text-white">
                          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                          </div>
                          Top Gainers
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-gray-400 hover:text-yellow-400 text-sm"
                          >
                            View more
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {topGainers.map((coin, index) => (
                            <div key={coin.symbol} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {coin.image ? (
                                  <Image
                                    src={coin.image}
                                    alt={coin.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                  />
                                ) : (
                                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {coin.symbol[0]}
                                  </div>
                                )}
                                <div>
                                  <div className="crypto-name text-white font-medium">{coin.name}</div>
                                  <div className="crypto-symbol text-gray-400 text-xs">{coin.symbol}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="crypto-price text-white font-medium text-sm">{coin.price}</div>
                                <div className={cn("text-xs", coin.changeColor)}>{coin.change}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Crypto Table Section */}
      <div className="relative container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="crypto-table-card bg-gray-900/20 border-gray-700/50 backdrop-blur-sm shadow-2xl overflow-hidden">
              <CardHeader className="p-8">
                <div className="flex flex-col gap-6">
                  <CardTitle className="card-title flex items-center gap-4 text-3xl text-white">
                    <Bitcoin className="w-8 h-8 text-yellow-400" />
                    Top Cryptocurrencies
                    <Badge variant="outline" className="ml-auto border-yellow-500 text-yellow-400 bg-yellow-500/10 px-4 py-2">
                      <Activity className="w-4 h-4 mr-2" />
                      Live Trading
                    </Badge>
                  </CardTitle>

                  {/* Search Section */}
                  <div className="max-w-lg relative">
                    <Card className="search-card bg-gray-800/30 border-gray-600/30 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <form onSubmit={searchHandler} className="flex gap-3">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                            <Input
                              onChange={inputHandler}
                              value={input}
                              type='text'
                              placeholder='Search cryptocurrencies...'
                              className="search-input pl-10 bg-gray-700/50 border-gray-500/50 text-white placeholder:text-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20"
                              onFocus={() => input && setShowDropdown(true)}
                              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                            />

                            {/* Search Dropdown */}
                            {showDropdown && searchResults.length > 0 && (
                              <AnimatePresence>
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="search-dropdown absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[60] max-h-80 overflow-hidden"
                                >
                                  <div className="search-dropdown-header p-3 bg-gray-50 border-b border-gray-200">
                                    <p className="search-dropdown-title text-sm font-medium text-gray-700">
                                      Search Results ({searchResults.length} found)
                                    </p>
                                  </div>

                                  <div className="search-dropdown-content max-h-64 overflow-y-auto">
                                    {searchResults.map((coin, index) => (
                                      <motion.div
                                        key={coin.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        onClick={(e) => selectCoin(coin.name, e)}
                                        className="search-dropdown-item p-4 hover:bg-yellow-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-200"
                                      >
                                        <div className="flex items-center gap-3">
                                          <Image
                                            src={coin.image}
                                            alt={coin.name}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                          />
                                          <div className="flex-1">
                                            <div className="coin-name font-semibold text-gray-900">{coin.name}</div>
                                            <div className="coin-symbol text-sm text-gray-500 uppercase">{coin.symbol}</div>
                                          </div>
                                          <div className="coin-price text-right">
                                            <div className="text-gray-900 font-medium">
                                              {currency.symbol}{coin.current_price?.toLocaleString()}
                                            </div>
                                            <div className={cn("text-xs",
                                              coin.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600")}>
                                              {coin.price_change_percentage_24h > 0 ? "+" : ""}
                                              {coin.price_change_percentage_24h?.toFixed(2)}%
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ))}

                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            )}
                          </div>
                          <Button
                            type='submit'
                            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black font-bold"
                          >
                            <Search className="w-4 h-4" />
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Table Header */}
                <div className="table-header grid grid-cols-6 gap-4 p-8 border-b border-gray-700/50 text-gray-400 font-semibold text-sm uppercase tracking-wider">
                  <div className="text-center">Rank</div>
                  <div>Asset</div>
                  <div className="text-right">Price</div>
                  <div className="text-center">24H Change</div>
                  <div className="text-right">Market Cap</div>
                  <div className="text-right">Last 7 Days</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-gray-700/50">
                  <AnimatePresence>
                    {displayCoin.slice(0, 10).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                          backgroundColor: "rgba(251, 191, 36, 0.1)",
                          scale: 1.01,
                          transition: { duration: 0.2 }
                        }}
                        className="crypto-row grid grid-cols-6 gap-4 p-8 hover:bg-yellow-500/5 transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          <Badge variant="outline" className="rank-badge border-gray-600 text-gray-300 group-hover:border-yellow-400 group-hover:text-yellow-300 transition-colors">
                            #{item.market_cap_rank}
                          </Badge>
                        </div>

                        <Link href={`/coin/${item.id}`} className="flex items-center gap-4 group-hover:scale-105 transition-transform">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="rounded-full group-hover:shadow-lg transition-all"
                          />
                          <div className="flex flex-col">
                            <span className="crypto-name font-bold text-white group-hover:text-yellow-300 transition-colors text-lg">
                              {item.name}
                            </span>
                            <span className="crypto-symbol text-gray-400 uppercase font-medium tracking-wider">
                              {item.symbol}
                            </span>
                          </div>
                        </Link>

                        <div className="text-right">
                          <div className="crypto-price font-bold text-white text-lg group-hover:text-yellow-400 transition-colors">
                            {currency.symbol} {item.current_price.toLocaleString()}
                          </div>
                        </div>

                        <div className="text-center">
                          <Badge
                            variant="outline"
                            className={cn(
                              "font-bold px-3 py-1 transition-all duration-300",
                              item.price_change_percentage_24h > 0
                                ? "border-green-500 text-green-400 bg-green-500/20"
                                : "border-red-500 text-red-400 bg-red-500/20"
                            )}
                          >
                            {item.price_change_percentage_24h > 0 ? (
                              <ChevronUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 mr-1" />
                            )}
                            {Math.abs(Math.floor(item.price_change_percentage_24h * 100) / 100)}%
                          </Badge>
                        </div>

                        <div className="market-cap-text text-right font-bold text-gray-300 text-lg">
                          {currency.symbol} {(item.market_cap / 1e9).toFixed(2)}B
                        </div>

                        <div className="text-right flex justify-end">
                          <MiniChart
                            data={generateChartData(item.id)}
                            width={120}
                            height={40}
                            color={item.price_change_percentage_24h > 0 ? '#10b981' : '#ef4444'}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HomeeCryptos
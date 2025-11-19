import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Bitcoin, Twitter, Linkedin, Heart, Activity } from 'lucide-react'

const FooterCryptos: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">
                Cryptos
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The world&apos;s leading decentralized digital exchange platform.
              Trade with confidence and security.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-600 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-400 hover:text-black" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-yellow-600 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-400 hover:text-black" />
              </Link>
            </div>
          </div>

          {/* Exchange */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Exchange</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Buy Crypto
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Sell Crypto
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Trading Pairs
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Market Data
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Products</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Spot Trading
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Futures Trading
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Crypto Wallet
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                DeFi Staking
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Support</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Help Center
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                API Documentation
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Security
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>© {currentYear} Cryptos. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Licensed in NY <Heart className="w-3 h-3 text-yellow-400" fill="currentColor" />
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Live Trading
            </Badge>
            <Badge variant="outline" className="border-yellow-500 text-yellow-400 bg-yellow-500/10">
              <Activity className="w-3 h-3 mr-1" />
              Real-time Data
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterCryptos
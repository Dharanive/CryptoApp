import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Github, Twitter, Linkedin, Heart, TrendingUp } from 'lucide-react'

const FooterModern: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950/50 border-t border-slate-800 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                CoinFolio
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner in cryptocurrency trading and investment.
              Stay ahead with real-time market data and insights.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Twitter className="w-4 h-4 text-slate-400 hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-400 hover:text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-slate-400 hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Markets */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Markets</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Cryptocurrencies
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                DeFi Tokens
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                NFT Collections
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Market Analysis
              </Link>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Tools</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Portfolio Tracker
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Price Alerts
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Trading Bot
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                API Access
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                About Us
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Careers
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-slate-400 hover:text-purple-400 transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>© {currentYear} CoinFolio. All rights reserved.</span>
           
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Live Data
            </Badge>
            <Badge variant="outline" className="border-purple-500 text-purple-400 bg-purple-500/10">
              Real-time Updates
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterModern
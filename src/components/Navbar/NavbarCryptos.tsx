'use client'
import React, { useContext, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { ThemeToggle } from '../ui/theme-toggle'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Menu, X, ArrowRight, Bitcoin } from 'lucide-react'
import './NavbarCryptos.css'

const NavbarCryptos: React.FC = () => {
  const context = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!context) {
    throw new Error('NavbarCryptos must be used within CoinContextProvider');
  }

  const { setCurrency, currency } = context;

  const currencyHandler = (value: string) => {
    switch (value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" })
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" })
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" })
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" })
        break;
      }
    }
  }

  return (
    <nav className="navbar-cryptos fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-black" />
            </div>
            <span className="navbar-logo-text text-xl font-bold text-white transition-colors">
              Cryptos
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="navbar-text text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              Exchange crypto
            </Link>
            <Link
              href="#"
              className="navbar-text text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              NFT
            </Link>
            <Link
              href="#"
              className="navbar-text text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              Invest
            </Link>
            <Link
              href="#"
              className="navbar-text text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="#"
              className="navbar-text text-gray-300 hover:text-yellow-400 transition-colors font-medium"
            >
              Learn
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Selector */}
            <Select value={currency.name} onValueChange={currencyHandler}>
              <SelectTrigger className="navbar-select w-20 bg-gray-800/50 border-gray-700 text-white hover:border-yellow-500 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="navbar-select-content bg-gray-800 border-gray-700">
                <SelectItem value="usd" className="navbar-select-item text-white hover:bg-gray-700 focus:bg-yellow-500/20 focus:text-yellow-400">
                  USD
                </SelectItem>
                <SelectItem value="eur" className="navbar-select-item text-white hover:bg-gray-700 focus:bg-yellow-500/20 focus:text-yellow-400">
                  EUR
                </SelectItem>
                <SelectItem value="inr" className="navbar-select-item text-white hover:bg-gray-700 focus:bg-yellow-500/20 focus:text-yellow-400">
                  INR
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Sign Up Button */}
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 font-medium"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="navbar-mobile-button md:hidden text-white hover:text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Card className="navbar-mobile-menu md:hidden mt-2 mb-4 bg-gray-900/95 border-gray-700 backdrop-blur-sm">
            <div className="p-4 space-y-4">
              <Link
                href="/"
                className="navbar-mobile-text block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Exchange crypto
              </Link>
              <Link
                href="#"
                className="navbar-mobile-text block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                NFT
              </Link>
              <Link
                href="#"
                className="navbar-mobile-text block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Invest
              </Link>
              <Link
                href="#"
                className="navbar-mobile-text block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="#"
                className="navbar-mobile-text block text-gray-300 hover:text-yellow-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>

              <div className="pt-4 border-t border-gray-700 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">Currency:</span>
                  <Select value={currency.name} onValueChange={currencyHandler}>
                    <SelectTrigger className="navbar-select flex-1 bg-gray-800/50 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="navbar-select-content bg-gray-800 border-gray-700">
                      <SelectItem value="usd" className="text-white hover:bg-gray-700">
                        USD
                      </SelectItem>
                      <SelectItem value="eur" className="text-white hover:bg-gray-700">
                        EUR
                      </SelectItem>
                      <SelectItem value="inr" className="text-white hover:bg-gray-700">
                        INR
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">Theme:</span>
                  <ThemeToggle />
                </div>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </nav>
  )
}

export default NavbarCryptos
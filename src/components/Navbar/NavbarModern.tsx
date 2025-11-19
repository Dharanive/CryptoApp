'use client'
import React, { useContext, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Menu, X, ArrowRight, TrendingUp } from 'lucide-react'
import logo from '../../assets/logo.png'

const NavbarModern: React.FC = () => {
  const context = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!context) {
    throw new Error('NavbarModern must be used within CoinContextProvider');
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
    <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 relative">
              <Image
                src={logo}
                alt="CoinFolio"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              CoinFolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Markets
            </Link>
            <Link
              href="#"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Portfolio
            </Link>
            <Link
              href="#"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              News
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Selector */}
            <Select value={currency.name} onValueChange={currencyHandler}>
              <SelectTrigger className="w-20 bg-slate-800/50 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="usd" className="text-white hover:bg-slate-700">
                  USD
                </SelectItem>
                <SelectItem value="eur" className="text-white hover:bg-slate-700">
                  EUR
                </SelectItem>
                <SelectItem value="inr" className="text-white hover:bg-slate-700">
                  INR
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Sign Up Button */}
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
              Sign up
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Card className="md:hidden mt-2 mb-4 bg-slate-900/95 border-slate-700 backdrop-blur-sm">
            <div className="p-4 space-y-4">
              <Link
                href="/"
                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#"
                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Markets
              </Link>
              <Link
                href="#"
                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="#"
                className="block text-slate-300 hover:text-white transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                News
              </Link>

              <div className="pt-4 border-t border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">Currency:</span>
                  <Select value={currency.name} onValueChange={currencyHandler}>
                    <SelectTrigger className="flex-1 bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="usd" className="text-white hover:bg-slate-700">
                        USD
                      </SelectItem>
                      <SelectItem value="eur" className="text-white hover:bg-slate-700">
                        EUR
                      </SelectItem>
                      <SelectItem value="inr" className="text-white hover:bg-slate-700">
                        INR
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium">
                  Sign up
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </nav>
  )
}

export default NavbarModern
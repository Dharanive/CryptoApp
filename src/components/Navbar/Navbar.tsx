'use client'
import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { ThemeToggle } from '../ui/theme-toggle'
import Link from 'next/link'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error('Navbar must be used within CoinContextProvider');
  }

  const { setCurrency } = context;

  const currencyHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
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
    <div className='navbar'>
      <Link href={'/'}>
        <Image className='logoimg' src={logo} alt='Logo' />
      </Link>
      <ul>
        <Link href={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value='usd'>USD</option>
          <option value='eur'>EUR</option>
          <option value='inr'>INR</option>
        </select>
        <ThemeToggle />
        <button>Sign up <Image src={arrow_icon} alt="arrow" width={16} height={16} /></button>
      </div>
    </div>
  )
}

export default Navbar
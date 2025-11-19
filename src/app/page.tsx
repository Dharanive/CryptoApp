import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import Footer from '../components/Footer/Footer'

export default function Page() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}
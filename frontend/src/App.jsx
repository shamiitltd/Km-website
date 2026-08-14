import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import AboutUs from './pages/AboutUs'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/features' element={<Features />} />
          <Route path='/how-it-works' element={<HowItWorks />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

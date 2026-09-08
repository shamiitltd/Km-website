import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import AboutUs from './pages/AboutUs'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import AdminBlog from './pages/AdminBlog'
import AdminBroadcast from './pages/AdminBroadcast'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import ComingSoon from './pages/ComingSoon'
import TermsAndConditions from './pages/TermsAndConditions'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AnalyticsTracker from './components/AnalyticsTracker'
import SeoManager from './components/SeoManager'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <SeoManager />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features' element={<Features />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/careers' element={<ComingSoon type="careers" />} />
        <Route path='/refund-policy' element={<ComingSoon type="refund" />} />
        <Route path='/coming-soon' element={<ComingSoon />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/:id' element={<BlogPost />} />
        
        {/* Admin Unified Command Center & Modules */}
        <Route path='/admin' element={<AdminDashboard defaultSection="dashboard" />} />
        <Route path='/admin/dashboard' element={<AdminDashboard defaultSection="dashboard" />} />
        <Route path='/admin/blog' element={<AdminDashboard defaultSection="posts" defaultSubSection="all" />} />
        <Route path='/admin/blog/new' element={<AdminDashboard defaultSection="posts" defaultSubSection="write" />} />
        <Route path='/admin/broadcast' element={<AdminDashboard defaultSection="newsletter" />} />

        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

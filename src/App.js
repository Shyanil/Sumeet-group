import React, { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HighlightsStrip from './components/HighlightsStrip'
import About from './components/About'
import WhyChooseSTC from './components/WhyChooseSTC'
import Amenities from './components/Amenities'
import Gallery from './components/Gallery'
import MasterPlan from './components/MasterPlan'
import Location from './components/Location'
import Footer from './components/Footer'

export default function App() {
  // The browser resolves a URL hash before React has mounted the sections,
  // so a deep link like /#amenities never scrolls. Re-apply it after mount.
  useEffect(() => {
    const { hash } = window.location
    if (!hash || hash === '#home') return
    const target = document.querySelector(hash)
    if (!target) return
    requestAnimationFrame(() =>
      target.scrollIntoView({ behavior: 'auto', block: 'start' }),
    )
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <HighlightsStrip />
        <About />
        <WhyChooseSTC />
        <Amenities />
        <Gallery />
        <MasterPlan />
        <Location />
      </main>
      <Footer />
    </>
  )
}

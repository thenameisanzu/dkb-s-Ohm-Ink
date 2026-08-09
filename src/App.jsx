import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import CosmicCanvas from './components/CosmicCanvas'
import CentralYantra from './components/CentralYantra'
import Hero from './components/Hero'

import SymbolSection from './components/Symbol'
import Contact from './components/Contact'
import AudioDrone, { triggerAudioPlay } from './components/AudioDrone'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const progressBarRef = useRef(null)



  useEffect(() => {
    if (isLoading) return

    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Position cursor at center initially to prevent flashing at top-left
    gsap.set(cursor, { x: window.innerWidth / 2, y: window.innerHeight / 2 })
    gsap.set(follower, { x: window.innerWidth / 2, y: window.innerHeight / 2 })

    // Highly optimized cursor tracking via gsap.quickTo
    const cursorToX = gsap.quickTo(cursor, 'x', { duration: 0.12, ease: 'power3' })
    const cursorToY = gsap.quickTo(cursor, 'y', { duration: 0.12, ease: 'power3' })
    const followerToX = gsap.quickTo(follower, 'x', { duration: 0.45, ease: 'power3' })
    const followerToY = gsap.quickTo(follower, 'y', { duration: 0.45, ease: 'power3' })

    const handleMouseMove = (e) => {
      cursorToX(e.clientX)
      cursorToY(e.clientY)
      followerToX(e.clientX)
      followerToY(e.clientY)
    }

    const handleLinkHover = () => {
      gsap.to(cursor, { scale: 2, backgroundColor: 'var(--color-teal)', duration: 0.3 })
      gsap.to(follower, { scale: 1.5, borderColor: 'var(--color-gold)', duration: 0.3 })
    }

    const handleLinkLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: 'var(--color-gold)', duration: 0.3 })
      gsap.to(follower, { scale: 1, borderColor: 'var(--color-teal)', duration: 0.3 })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Add hover listeners to buttons and links
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkLeave)
      })
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return

    const bar = progressBarRef.current
    if (!bar) return

    const progressTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(bar, { height: `${self.progress * 100}%` })
      }
    })

    return () => {
      progressTrigger.kill()
    }
  }, [isLoading])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const targetElement = document.getElementById(id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (isLoading) {
    return (
      <Loader
        onComplete={() => {
          setIsLoading(false)
          triggerAudioPlay()
        }}
      />
    )
  }

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" style={{ top: 0, left: 0 }} />
      <div ref={followerRef} className="custom-cursor-follower" style={{ top: 0, left: 0 }} />

      {/* Harmonic Scroll Progress Gauge */}
      <div className="scroll-progress-container">
        <div ref={progressBarRef} className="scroll-progress-bar" />
      </div>

      {/* Meditative Drone Sound controller */}
      <AudioDrone />

      {/* Floating Glassmorphic Navbar */}
      <nav className="glass-panel main-navbar">
        {/* Logo */}
        <div
          onClick={(e) => handleNavClick(e, 'hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <img
            src="/logo.png"
            alt="dkb's ohm ink logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(223, 200, 136, 0.3)',
              boxShadow: '0 0 10px rgba(168, 85, 247, 0.2)',
              objectFit: 'cover'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: '500',
              letterSpacing: '0.15em',
              color: 'var(--color-text-light)',
            }}
          >
            dkb's <span className="text-gold" style={{ textShadow: '0 0 10px var(--color-gold-glow)' }}>ohm ink</span>
          </span>
        </div>

        {/* Navigation links */}
        <div className="navbar-links">
          {['symbol', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              className="nav-link-item"
            >
              {section}
            </a>
          ))}
        </div>
      </nav>

      {/* Cinematic Cosmic Nebula Background */}
      <div className="cosmic-bg-container">
        <div className="nebula nebula--amethyst" />
        <div className="nebula nebula--teal" />
        <div className="nebula nebula--violet" />
      </div>
      <div className="dn-vignette" />
      <div className="dn-grain" />

      {/* L-shaped gold geometric borders */}
      <svg className="dn-corner dn-corner--tl" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M0 48 L0 0 L48 0" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 24 L24 0" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.25" />
      </svg>
      <svg className="dn-corner dn-corner--tr" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M0 48 L0 0 L48 0" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 24 L24 0" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.25" />
      </svg>
      <svg className="dn-corner dn-corner--bl" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M0 48 L0 0 L48 0" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 24 L24 0" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.25" />
      </svg>
      <svg className="dn-corner dn-corner--br" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M0 48 L0 0 L48 0" stroke="var(--color-gold)" strokeWidth="0.8" opacity="0.4" />
        <path d="M0 24 L24 0" stroke="var(--color-gold)" strokeWidth="0.4" opacity="0.25" />
      </svg>

      {/* Interactive Backgrounds */}
      <CosmicCanvas />
      <CentralYantra />

      {/* Layout Content Sections */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />

        <SymbolSection />
        <Contact />
      </main>
    </>
  )
}

export default App

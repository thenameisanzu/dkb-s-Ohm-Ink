import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import CosmicCanvas from './components/CosmicCanvas'
import CentralYantra from './components/CentralYantra'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import SymbolSection from './components/Symbol'
import Contact from './components/Contact'
import AudioDrone from './components/AudioDrone'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const videoRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    const video = videoRef.current
    if (!video) return

    // Detect mobile, tablet, or touch-capable viewports to set appropriate seek throttling
    const isTouchDevice = ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || window.innerWidth <= 1024
    const seekThrottleMs = isTouchDevice ? 100 : 33

    let initialized = false
    let cleanupVideoScrub = null

    const initVideoScrub = () => {
      if (initialized) return
      initialized = true

      const duration = video.duration
      if (!duration || isNaN(duration)) return

      let targetTime = 0
      let lastSeekTime = 0

      const updateVideoTime = () => {
        const now = performance.now()
        if (now - lastSeekTime < seekThrottleMs) return

        if (!video.seeking) {
          if (Math.abs(video.currentTime - targetTime) > 0.04) {
            video.currentTime = targetTime
            lastSeekTime = now
          }
        }
      }

      const scrubTl = gsap.timeline({
        scrollTrigger: {
          id: 'bg-video-scrub',
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.0,
        },
        onUpdate: () => {
          const p = scrubTl.progress()
          targetTime = p * duration
          updateVideoTime()
        }
      })

      scrubTl.to({}, { duration: 1 })

      const onSeeked = () => {
        updateVideoTime()
      }
      video.addEventListener('seeked', onSeeked)

      cleanupVideoScrub = () => {
        video.removeEventListener('seeked', onSeeked)
        const trigger = ScrollTrigger.getById('bg-video-scrub')
        if (trigger) trigger.kill()
        scrubTl.kill()
      }
    }

    video.addEventListener('loadedmetadata', initVideoScrub)
    if (video.readyState >= 1) initVideoScrub()

    return () => {
      video.removeEventListener('loadedmetadata', initVideoScrub)
      if (cleanupVideoScrub) cleanupVideoScrub()
    }
  }, [isLoading])

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
    return <Loader onComplete={() => setIsLoading(false)} />
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
      <nav
        className="glass-panel main-navbar"
        style={{
          position: 'fixed',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          borderRadius: '4px',
        }}
      >
        {/* Logo */}
        <div
          onClick={(e) => handleNavClick(e, 'hero')}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            color: 'var(--color-text-light)',
            textTransform: 'uppercase',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          OHM<span className="text-gold">INK</span>
        </div>

        {/* Navigation links */}
        <div className="navbar-links">
          {['philosophy', 'symbol', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              style={{
                fontFamily: 'var(--font-secondary)',
                fontSize: '0.7rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-muted)')}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>

      {/* Cinematic Background Video & Overlay Elements */}
      <video
        ref={videoRef}
        className="bg-video"
        src="/video/one.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
      />
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
        <Philosophy />
        <SymbolSection />
        <Contact />
      </main>
    </>
  )
}

export default App

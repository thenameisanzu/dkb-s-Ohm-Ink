import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const containerRef = useRef(null)
  const dividerRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const poetryRef = useRef(null)
  const btnRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    // Staggered reveal timeline
    tl.fromTo(dividerRef.current,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 0.5, duration: 1.5, ease: 'power3.inOut' }
    )
    .fromTo(eyebrowRef.current,
      { opacity: 0, x: -20 },
      { opacity: 0.6, x: 0, duration: 1, ease: 'power2.out' },
      '-=1.0'
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    )
    .fromTo(poetryRef.current,
      { opacity: 0, y: 15 },
      { opacity: 0.75, y: 0, duration: 1.2, ease: 'power2.out' },
      '-=1.0'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 1.0 },
      '-=0.8'
    )
    .fromTo(btnRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.2)' },
      '-=0.8'
    )
    .fromTo(cardRef.current,
      { opacity: 0, x: 40, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
      '-=1.4'
    )
  }, [])

  const handleScrollToContact = (e) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 2rem 4rem',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Visual atmospheric gradient overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30vh',
          background: 'linear-gradient(to top, var(--bg-cosmic) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="hero-grid">
        
        {/* Left Column: Editorial Info */}
        <div className="hero-left-col">
          {/* Animated vertical divider */}
          <div
            ref={dividerRef}
            className="hero-vertical-line"
            style={{
              position: 'absolute',
              left: 0,
              top: '5%',
              height: '90%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, var(--color-gold), transparent)',
              transformOrigin: 'top',
              opacity: 0,
            }}
          />

          <span
            ref={eyebrowRef}
            style={{
              display: 'block',
              fontSize: '0.95rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              opacity: 0,
              fontFamily: 'var(--font-secondary)',
            }}
          >
            <span style={{ color: 'var(--color-gold)', fontWeight: '700' }}>DKB'S</span>
            <span style={{ color: 'var(--color-text-muted)', marginLeft: '0.65rem', fontSize: '0.8rem', fontWeight: '400' }}>EST. 2016</span>
          </span>

          <div ref={titleRef} style={{ opacity: 0, marginBottom: '2rem' }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6.5vw, 4.8rem)',
                fontWeight: '400',
                lineHeight: '1.05',
                color: 'var(--color-text-light)',
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-secondary)',
              }}
            >
              <span className="hero-outlined-title">OHM</span>
              <br />
              <span className="text-gold" style={{ marginLeft: '1.5rem', fontWeight: 'bold' }}>INK</span>
            </h1>
          </div>

          <p
            ref={poetryRef}
            style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
              fontStyle: 'italic',
              color: 'var(--color-text-light)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.8',
              maxWidth: '520px',
              marginBottom: '1rem',
              opacity: 0,
              letterSpacing: '0.02em',
            }}
          >
            "Ink is not canvas. It is a conduit. We engrave cosmic symmetry to align the physical form with the singular resonance of the universe."
          </p>

          <p
            ref={subtitleRef}
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '3rem',
              opacity: 0,
              fontFamily: 'var(--font-secondary)',
            }}
          >
            One Energy • Sacred Geometry • Intuitive Mark
          </p>

          <div ref={btnRef} style={{ opacity: 0 }}>
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="btn-gold"
            >
              Initiate Ritual
            </a>
          </div>
        </div>

        {/* Right Column: Floating glass coordinates card */}
        <div className="hero-right-col">
          <div
            ref={cardRef}
            className="glass-panel metadata-card"
            style={{ opacity: 0 }}
          >
            <div className="metadata-item">
              <span className="metadata-label">Celestial Anchor</span>
              <span className="metadata-value">28° 39' N, 77° 13' E</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label">Frequency Tuning</span>
              <span className="metadata-value">432 Hz • Harmonic Flow</span>
            </div>

            <div className="metadata-item">
              <span className="metadata-label">Ritual Status</span>
              <span className="metadata-value" style={{ color: 'var(--color-teal)', textShadow: '0 0 8px var(--color-teal-glow)' }}>
                Aligning Astral Channels
              </span>
            </div>

            <div style={{ height: '1px', background: 'rgba(223, 200, 136, 0.15)', margin: '0.25rem 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-teal)',
                boxShadow: '0 0 10px var(--color-teal)',
                animation: 'pulseGlow 2s infinite ease-in-out'
              }} />
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                Chamber Calibrated
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Floating scroll cue */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.4,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-secondary)',
          }}
        >
          Scroll to Align
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
            animation: 'scrollPulse 2s infinite ease-in-out',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% {
            transform: scaleY(0.5);
            transform-origin: top;
            opacity: 0.3;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
            opacity: 0.9;
          }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </section>
  )
}

export default Hero

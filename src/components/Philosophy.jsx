import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Philosophy = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    if (!section || !header) return

    // Header reveal
    gsap.fromTo(header,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Staggered card entry
    gsap.fromTo(cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  const philosophyItems = [
    {
      num: 'I',
      title: 'Mantra • Intent',
      desc: 'Every mark begins as an internal frequency. We align your cosmic intentions and carve them into clean, meditative vibrations before the ink meets the skin.'
    },
    {
      num: 'II',
      title: 'Yantra • Sacred Geometry',
      desc: 'The visual shell of consciousness. Utilizing precise lines of the Sri Yantra and celestial shapes to map out protective shields and energetic portals on your body.'
    },
    {
      num: 'III',
      title: 'Tantra • The Ritual',
      desc: 'The physical crystallization of energy. Undergoing tattooing as a sacred ritual, embedding cosmic light permanently into your physical avatar.'
    }
  ]

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 2rem',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: '5rem', opacity: 0 }}>
          <span className="text-teal" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-secondary)' }}>
            THE COSMOLOGY
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-light)', fontFamily: 'var(--font-secondary)' }}>
            THE <span className="text-gold">ONE ENERGY</span>
          </h2>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-gold)', marginTop: '1.5rem' }} />
        </div>

        {/* Narrative Grid */}
        <div 
          className="philosophy-grid"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
            gap: '2.5rem',
            alignItems: 'stretch'
          }}
        >
          {philosophyItems.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="glass-panel philosophy-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderRadius: '4px',
                opacity: 0,
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              {/* Number watermark */}
              <span
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '2.5rem',
                  fontSize: '3rem',
                  fontFamily: 'var(--font-display)',
                  color: 'rgba(212, 175, 55, 0.06)',
                  lineHeight: '1',
                  userSelect: 'none',
                }}
              >
                {item.num}
              </span>

              <h3
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-gold)',
                  marginBottom: '1.5rem',
                  letterSpacing: '0.2em',
                  fontFamily: 'var(--font-secondary)'
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: '1.8',
                  letterSpacing: '0.05em',
                  fontWeight: '300',
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Philosophy

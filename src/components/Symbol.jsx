import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SymbolSection = () => {
  const [activeLayer, setActiveLayer] = useState('bindu')
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    const panel = panelRef.current
    if (!header || !panel) return

    gsap.fromTo(header,
      { opacity: 0, y: 40 },
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

    gsap.fromTo(panel,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panel,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  const layers = {
    bhupura: {
      name: 'Bhupura • Outer Gate',
      title: 'Cosmic Threshold & Grounding',
      desc: 'The square outer boundary with four gates represents the physical earth plane and the threshold into the sacred temple of consciousness. In tattoo art, it acts as a protective shield, anchoring one’s spiritual self to the earth, creating stability and defining sacred personal boundaries.',
      color: '#b3923b'
    },
    petals: {
      name: 'Lotus Petals • Circles',
      title: 'Expansion of Consciousness',
      desc: 'The concentric rings of 8 and 16 lotus petals symbolize the gradual opening of the heart and mind. The 16 petals govern the senses and desires, while the 8 petals guide the inner virtues. Tattooing this layer is a commitment to purity, inner healing, and spiritual rebirth.',
      color: '#14b8a6'
    },
    triangles: {
      name: 'Interlocking Triangles • Duality',
      title: 'Harmonizing Shiva & Shakti',
      desc: 'Nine interlocking triangles form 43 smaller stars. The four upward triangles represent Shiva (masculine, spirit, energy), and the five downward triangles represent Shakti (feminine, matter, creation). Their intersections symbolize the delicate balance of existence and the union of opposites.',
      color: '#d4af37'
    },
    bindu: {
      name: 'Bindu & Ohm • The Source',
      title: 'The Spark of Creation & One Energy',
      desc: 'At the exact center of the geometry lies the Bindu (the singularity point) merged with the primordial vibration of ॐ. It represents the unmanifested cosmos, the absolute void from which all form arises, and to which all things return. It is the core anchor of ONE ENERGY.',
      color: '#fff5d7'
    }
  }

  // Petals rendering helper for interactive card
  const renderPetals = (count, r, isActive) => {
    const w = r * 0.25
    const h = r
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count
      return (
        <path
          key={i}
          d={`M 150,${150 - h} C ${150 + w},${150 - h * 0.65} ${150 + w * 0.3},${150} 150,150 C ${150 - w * 0.3},${150} ${150 - w},${150 - h * 0.65} 150,${150 - h} Z`}
          transform={`rotate(${angle} 150 150)`}
          stroke={isActive ? 'var(--color-teal)' : 'var(--color-gold)'}
          strokeWidth={isActive ? '1.2' : '0.6'}
          fill={isActive ? 'var(--color-teal-glow)' : 'none'}
          opacity={isActive ? 0.95 : 0.25}
          style={{ transition: 'all 0.4s ease' }}
        />
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      id="symbol"
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
            THE BLUEPRINT
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-light)', fontFamily: 'var(--font-secondary)' }}>
            GEOMETRY <span className="text-gold">UNVEILED</span>
          </h2>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-gold)', marginTop: '1.5rem' }} />
        </div>

        {/* Interactive Explorer Panel */}
        <div 
          ref={panelRef}
          className="glass-panel symbol-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            borderRadius: '4px',
            opacity: 0,
          }}
        >
          {/* Menu Selector (Left) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--color-text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-secondary)' }}>
              Interactive Layers
            </h3>
            {Object.keys(layers).map((key) => (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                onMouseEnter={() => setActiveLayer(key)}
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  textAlign: 'left',
                  padding: '1rem 1.5rem',
                  fontSize: '0.9rem',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-secondary)',
                  color: activeLayer === key ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  borderLeft: `2px solid ${activeLayer === key ? 'var(--color-gold)' : 'var(--color-gold-glow)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeLayer === key ? 'rgba(223, 200, 136, 0.03)' : 'transparent',
                }}
              >
                {layers[key].name}
              </button>
            ))}
          </div>

          {/* Graphical Display & Copy Card (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
            
            {/* Interactive Miniature Vector Yantra */}
            <svg viewBox="0 0 300 300" style={{ width: '220px', height: '220px', overflow: 'visible' }}>
              <defs>
                <filter id="mini-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Bhupura (Outer Square Gate) */}
              <path
                d="M 5,5 L 125,5 L 125,15 L 175,15 L 175,5 L 295,5 L 295,125 L 285,125 L 285,175 L 295,175 L 295,295 L 175,295 L 175,285 L 125,285 L 125,295 L 5,295 L 5,175 L 15,175 L 15,125 L 5,125 Z"
                stroke={activeLayer === 'bhupura' ? 'var(--color-teal)' : 'var(--color-gold)'}
                strokeWidth={activeLayer === 'bhupura' ? '1.5' : '0.6'}
                fill={activeLayer === 'bhupura' ? 'var(--color-teal-glow)' : 'none'}
                opacity={activeLayer === 'bhupura' ? 0.95 : 0.25}
                style={{ transition: 'all 0.4s ease' }}
              />

              {/* Outer Circles & Petals */}
              <circle cx="150" cy="150" r="135" stroke="var(--color-gold)" strokeWidth="0.5" fill="none" opacity={activeLayer === 'petals' ? 0.8 : 0.2} />
              {renderPetals(16, 135, activeLayer === 'petals')}

              <circle cx="150" cy="150" r="105" stroke="var(--color-gold)" strokeWidth="0.5" fill="none" opacity={activeLayer === 'petals' ? 0.8 : 0.2} />
              {renderPetals(8, 105, activeLayer === 'petals')}

              {/* Inner Triangle Cage */}
              <circle cx="150" cy="150" r="85" stroke="var(--color-gold)" strokeWidth="0.5" fill="none" opacity={activeLayer === 'petals' ? 0.8 : 0.2} />
              
              {/* Triangles */}
              <polygon points="150,45 240,217 60,217" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,255 240,83 60,83" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,71 228,202 72,202" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,229 228,98 72,98" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,93 213,187 87,187" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,207 213,113 87,113" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,112 198,172 102,172" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,188 198,128 102,128" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />
              <polygon points="150,131 184,161 116,161" stroke={activeLayer === 'triangles' ? 'var(--color-teal)' : 'var(--color-gold)'} strokeWidth={activeLayer === 'triangles' ? '1.2' : '0.6'} fill="none" opacity={activeLayer === 'triangles' ? 0.95 : 0.25} style={{ transition: 'all 0.4s ease' }} />

              {/* Central Bindu (Dot) & Om Text */}
              <circle
                cx="150"
                cy="150"
                r={activeLayer === 'bindu' ? '4' : '2'}
                fill={activeLayer === 'bindu' ? 'var(--color-teal)' : 'var(--color-gold)'}
                opacity={activeLayer === 'bindu' ? 0.95 : 0.4}
                style={{ transition: 'all 0.4s ease' }}
              />
              <text
                x="150"
                y="164"
                textAnchor="middle"
                fontSize="32"
                fill={activeLayer === 'bindu' ? 'var(--color-teal)' : 'var(--color-gold)'}
                fontFamily="'Yatra One', 'Cinzel Decorative', serif"
                style={{
                  opacity: activeLayer === 'bindu' ? 0.95 : 0.15,
                  transition: 'all 0.4s ease',
                  filter: activeLayer === 'bindu' ? 'url(#mini-glow)' : 'none',
                  pointerEvents: 'none',
                  userSelect: 'none'
                }}
              >
                ॐ
              </text>
            </svg>

            {/* Content Display */}
            <div style={{ textAlign: 'center', maxWidth: '450px' }}>
              <span className="text-teal" style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'var(--font-secondary)' }}>
                {layers[activeLayer].title}
              </span>
              <h4 style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '0.1em', fontFamily: 'var(--font-secondary)' }}>
                {layers[activeLayer].name}
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.8', fontWeight: '300' }}>
                {layers[activeLayer].desc}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default SymbolSection

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Loader = ({ onComplete }) => {
  const containerRef = useRef(null)
  const dotRef = useRef(null)
  const yantraRef = useRef(null)
  const geometryRef = useRef(null)
  const omRef = useRef(null)
  const pathRefs = useRef([])

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden'

    // Clean up path refs array
    pathRefs.current = pathRefs.current.slice(0, 15)

    // Calculate stroke lengths for draw animation
    const paths = yantraRef.current.querySelectorAll('.yantra-path')
    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = length
      path.style.strokeDashoffset = length
    })

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: onComplete
        })
      }
    })

    // Cinematic sequence (Accelerated 3s total)
    tl.to(dotRef.current, {
      scale: 1.3,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
    .to(dotRef.current, {
      boxShadow: '0 0 20px var(--color-gold), 0 0 40px var(--color-teal)',
      backgroundColor: 'var(--color-teal)',
      duration: 0.4,
    })
    .to(dotRef.current, {
      scale: 0.1,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(yantraRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.1')
    .to(paths, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.02,
      ease: 'power1.inOut'
    }, '-=0.15')
    .to(omRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6')
    .to(geometryRef.current, {
      rotation: 12,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.6')
    // Hold animation for a moment
    .to({}, { duration: 0.4 })

  }, [onComplete])

  // Helper to render petals
  const renderPetals = (count, r) => {
    const w = r * 0.25
    const h = r
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count
      return (
        <path
          key={i}
          className="yantra-path"
          d={`M 200,${200 - h} C ${200 + w},${200 - h * 0.65} ${200 + w * 0.3},${200} 200,200 C ${200 - w * 0.3},${200} ${200 - w},${200 - h * 0.65} 200,${200 - h} Z`}
          transform={`rotate(${angle} 200 200)`}
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.7"
        />
      )
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-cosmic)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-teal-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cinematic Center Dot */}
      <div
        ref={dotRef}
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-gold)',
          position: 'absolute',
          opacity: 0,
          transform: 'scale(0.1)',
          boxShadow: '0 0 20px var(--color-gold-glow), 0 0 40px var(--color-gold-glow)',
        }}
      />

      {/* Sri Yantra + Om Vector Container */}
      <svg
        ref={yantraRef}
        viewBox="0 0 400 400"
        style={{
          width: '90vmin',
          maxWidth: '550px',
          height: '90vmin',
          maxHeight: '550px',
          opacity: 0,
          transform: 'scale(0.85)',
          overflow: 'visible',
        }}
      >
        <defs>
          <filter id="glow-loader" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="goldGradientLoader" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff5d7" />
            <stop offset="70%" stopColor="var(--color-gold)" />
            <stop offset="100%" stopColor="var(--color-gold-muted)" />
          </radialGradient>
        </defs>

        {/* Isolated Yantra Geometry group to rotate independently of central Om */}
        <g ref={geometryRef} style={{ transformOrigin: '200px 200px' }}>
          {/* Double Bhupura (Outer Square Border) */}
          <path
            className="yantra-path"
            d="M 5,5 L 170,5 L 170,20 L 230,20 L 230,5 L 395,5 L 395,170 L 380,170 L 380,230 L 395,230 L 395,395 L 230,395 L 230,380 L 170,380 L 170,395 L 5,395 L 5,230 L 20,230 L 20,170 L 5,170 Z"
            stroke="var(--color-gold)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.4"
          />
          <path
            className="yantra-path"
            d="M 15,15 L 180,15 L 180,30 L 220,30 L 220,15 L 385,15 L 385,180 L 370,180 L 370,220 L 385,220 L 385,385 L 220,385 L 220,370 L 180,370 L 180,385 L 15,385 L 15,220 L 30,220 L 30,180 L 15,180 Z"
            stroke="var(--color-gold)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.5"
          />

          {/* Outer Circular Rings */}
          <circle className="yantra-path" cx="200" cy="200" r="180" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.6" />
          <circle className="yantra-path" cx="200" cy="200" r="172" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.5" />

          {/* 16 Lotus Petals */}
          {renderPetals(16, 172)}

          <circle className="yantra-path" cx="200" cy="200" r="138" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.6" />

          {/* 8 Lotus Petals */}
          {renderPetals(8, 138)}

          <circle className="yantra-path" cx="200" cy="200" r="112" stroke="var(--color-gold)" strokeWidth="1.2" fill="none" opacity="0.7" />

          {/* 9 Interlocking Triangles */}
          {/* Triangle 1 (Down - Large) */}
          <polygon className="yantra-path" points="200,60 320,290 80,290" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 2 (Up - Large) */}
          <polygon className="yantra-path" points="200,340 320,110 80,110" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 3 (Down) */}
          <polygon className="yantra-path" points="200,95 305,270 95,270" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 4 (Up) */}
          <polygon className="yantra-path" points="200,305 305,130 95,130" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 5 (Down) */}
          <polygon className="yantra-path" points="200,125 285,250 115,250" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 6 (Up) */}
          <polygon className="yantra-path" points="200,275 285,150 115,150" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 7 (Down - Small) */}
          <polygon className="yantra-path" points="200,150 265,230 135,230" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 8 (Up - Small) */}
          <polygon className="yantra-path" points="200,250 265,170 135,170" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.8" />
          {/* Triangle 9 (Down - Inner) */}
          <polygon className="yantra-path" points="200,175 245,215 155,215" stroke="var(--color-gold)" strokeWidth="1.2" fill="none" opacity="0.9" />

          {/* Central Bindu (Dot) */}
          <circle className="yantra-path" cx="200" cy="200" r="3" fill="var(--color-gold)" />
        </g>

        {/* Luminous calligraphic ॐ (Ohm) - Stationary & Centered */}
        <text
          ref={omRef}
          x="200"
          y="188"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="48"
          fill="url(#goldGradientLoader)"
          fontFamily="'Yatra One', 'Cinzel Decorative', serif"
          style={{
            opacity: 0,
            userSelect: 'none',
            pointerEvents: 'none',
            filter: 'url(#glow-loader)'
          }}
        >
          ॐ
        </text>
      </svg>

      {/* Loading caption */}
      <div
        style={{
          marginTop: '2rem',
          fontSize: '0.65rem',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'var(--color-gold-muted)',
          fontFamily: "var(--font-secondary)",
          opacity: 0.6,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        Aligning Frequencies
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}

export default Loader

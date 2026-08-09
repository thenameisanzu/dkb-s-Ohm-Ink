import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CentralYantra = () => {
  const containerRef = useRef(null)
  const yantraSvgRef = useRef(null)
  const geometryRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const svg = yantraSvgRef.current
    const geometry = geometryRef.current
    if (!container || !svg || !geometry) return

    // Slow, infinite background rotation
    const rotationTween = gsap.to(geometry, {
      rotation: 360,
      duration: 180,
      ease: 'none',
      repeat: -1
    })

    // ScrollTrigger Parallax & Scaling Transitions
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Animate yantra properties based on scroll depth
    scrollTl
      // Scroll to Philosophy section
      .to(container, {
        scale: 0.85,
        x: '20%',
        opacity: 0.15,
        duration: 1,
        ease: 'power2.inOut'
      })
      // Scroll to Symbol section (make it central and large for interactive highlight)
      .to(container, {
        scale: 1.1,
        x: '0%',
        opacity: 0.25,
        duration: 1,
        ease: 'power2.inOut'
      })
      // Scroll to Contact section
      .to(container, {
        scale: 0.65,
        x: '-20%',
        opacity: 0.08,
        duration: 1,
        ease: 'power2.inOut'
      })

    return () => {
      rotationTween.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === 'body') t.kill()
      })
    }
  }, [])

  // Helper to render petals
  const renderPetals = (count, r) => {
    const w = r * 0.25
    const h = r
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i * 360) / count
      return (
        <path
          key={i}
          d={`M 200,${200 - h} C ${200 + w},${200 - h * 0.65} ${200 + w * 0.3},${200} 200,200 C ${200 - w * 0.3},${200} ${200 - w},${200 - h * 0.65} 200,${200 - h} Z`}
          transform={`rotate(${angle} 200 200)`}
          stroke="var(--color-gold)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.6"
        />
      )
    })
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '80vmin',
        maxWidth: '550px',
        height: '80vmin',
        maxHeight: '550px',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.22,
        willChange: 'transform, opacity',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer soft glowing rings */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '1px solid var(--color-teal-glow)',
          borderRadius: '50%',
          boxShadow: '0 0 100px var(--color-teal-glow)',
          pointerEvents: 'none',
          opacity: 0.25,
        }}
      />

      <svg
        ref={yantraSvgRef}
        viewBox="0 0 400 400"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        <defs>
          <filter id="yantra-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="goldGradientYantra" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff5d7" />
            <stop offset="70%" stopColor="var(--color-gold)" />
            <stop offset="100%" stopColor="var(--color-gold-muted)" />
          </radialGradient>
        </defs>

        {/* Isolated Yantra Geometry group to rotate independently of central Om */}
        <g ref={geometryRef} style={{ transformOrigin: '200px 200px' }}>
          {/* Double Bhupura */}
          <path
            d="M 5,5 L 170,5 L 170,20 L 230,20 L 230,5 L 395,5 L 395,170 L 380,170 L 380,230 L 395,230 L 395,395 L 230,395 L 230,380 L 170,380 L 170,395 L 5,395 L 5,230 L 20,230 L 20,170 L 5,170 Z"
            stroke="var(--color-gold)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 15,15 L 180,15 L 180,30 L 220,30 L 220,15 L 385,15 L 385,180 L 370,180 L 370,220 L 385,220 L 385,385 L 220,385 L 220,370 L 180,370 L 180,385 L 15,385 L 15,220 L 30,220 L 30,180 L 15,180 Z"
            stroke="var(--color-gold)"
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
          />

          {/* Outer Circular Rings */}
          <circle cx="200" cy="200" r="180" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.45" />
          <circle cx="200" cy="200" r="172" stroke="var(--color-gold)" strokeWidth="0.6" fill="none" opacity="0.45" />

          {/* 16 Lotus Petals */}
          {renderPetals(16, 172)}

          <circle cx="200" cy="200" r="138" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.45" />

          {/* 8 Lotus Petals */}
          {renderPetals(8, 138)}

          <circle cx="200" cy="200" r="112" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.5" />

          {/* 9 Interlocking Triangles */}
          <polygon points="200,60 320,290 80,290" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,340 320,110 80,110" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,95 305,270 95,270" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,305 305,130 95,130" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,125 285,250 115,250" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,275 285,150 115,150" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,150 265,230 135,230" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,250 265,170 135,170" stroke="var(--color-gold)" strokeWidth="0.8" fill="none" opacity="0.6" />
          <polygon points="200,175 245,215 155,215" stroke="var(--color-gold)" strokeWidth="1" fill="none" opacity="0.75" />

          {/* Central Bindu */}
          <circle cx="200" cy="200" r="2.5" fill="var(--color-gold)" opacity="0.9" />
        </g>

        {/* ॐ Symbol - Stationary & Centered */}
        <text
          x="200"
          y="192"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="48"
          fill="url(#goldGradientYantra)"
          fontFamily="'Yatra One', 'Cinzel Decorative', serif"
          style={{
            userSelect: 'none',
            pointerEvents: 'none',
            filter: 'url(#yantra-glow)',
            opacity: 0.9,
          }}
        >
          ॐ
        </text>
      </svg>
    </div>
  )
}

export default CentralYantra

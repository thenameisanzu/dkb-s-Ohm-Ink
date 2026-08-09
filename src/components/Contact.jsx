import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hours, setHours] = useState(3)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    placement: '',
    intent: ''
  })

  const ritualGuides = {
    1: {
      name: 'Single Sigil Anchor',
      desc: 'Focused on minimal, precise geometric symbols or sacred mantras.'
    },
    2: {
      name: 'Dual Mandala Nodes',
      desc: 'For medium-sized interlocking structures or twin focal points.'
    },
    3: {
      name: 'Sri Yantra Alignment',
      desc: 'Detailed central yantras, interlocking grids, and energetic shields.'
    },
    4: {
      name: 'Celestial Conduit',
      desc: 'Extensive sleeve or chest segments integrating organic geometry flow.'
    },
    5: {
      name: 'Vessel Transcendence',
      desc: 'A full-day ritual mapping complex, multi-layered geometry across your skin.'
    }
  }

  const headerRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    const header = headerRef.current
    const form = formRef.current
    if (!header || !form) return

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

    gsap.fromTo(form,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: form,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
      setFormData({ name: '', email: '', placement: '', intent: '' })
      setHours(3)
    }, 2000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section
      id="contact"
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
      <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: '4rem', textAlign: 'center', opacity: 0 }}>
          <span className="text-teal" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-secondary)' }}>
            THE RITUAL
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: 'var(--color-text-light)', fontFamily: 'var(--font-secondary)' }}>
            ALIGN YOUR <span className="text-gold">FREQUENCY</span>
          </h2>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--color-gold)', margin: '1.5rem auto 0' }} />
        </div>

        {/* Glassmorphic Form Card */}
        <div
          ref={formRef}
          className="glass-panel contact-form-panel"
          style={{
            borderRadius: '4px',
            opacity: 0,
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
            transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {!formSubmitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Name / Identifier
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(5, 30, 26, 0.3)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '1rem',
                    color: 'var(--color-text-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-gold)'
                    e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Digital Vessel (Email)
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(5, 30, 26, 0.3)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '1rem',
                    color: 'var(--color-text-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-gold)'
                    e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Placement field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Body Placement & Geometry
                </label>
                <input
                  type="text"
                  name="placement"
                  placeholder="e.g. Chest Center, Right Arm Sleeve"
                  value={formData.placement}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(5, 30, 26, 0.3)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '1rem',
                    color: 'var(--color-text-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-gold)'
                    e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Session Duration / Ritual Intensity Counter (inspired by counter template) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Ritual Intensity (Estimated Duration)
                </label>
                
                <div 
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(5, 30, 26, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.15)',
                  }}
                >
                  {/* Decrement Button */}
                  <button
                    type="button"
                    onClick={() => setHours((prev) => Math.max(1, prev - 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-gold)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-gold)',
                      fontSize: '1.25rem',
                      lineHeight: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--color-teal)'
                      e.target.style.color = '#fff'
                      e.target.style.borderColor = 'var(--color-teal)'
                      e.target.style.boxShadow = '0 0 10px var(--color-teal-glow)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = 'var(--color-gold)'
                      e.target.style.borderColor = 'var(--color-gold)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    -
                  </button>

                  {/* Counter Value */}
                  <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 className="text-gold" style={{ fontSize: '1.8rem', lineHeight: '1', fontFamily: 'var(--font-secondary)', fontWeight: 'bold' }}>
                      {hours}{hours === 5 ? '+' : ''} <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em', fontWeight: '300', textTransform: 'lowercase', color: 'var(--color-text-light)' }}>hr{hours > 1 ? 's' : ''}</span>
                    </h3>
                  </div>

                  {/* Increment Button */}
                  <button
                    type="button"
                    onClick={() => setHours((prev) => Math.min(5, prev + 1))}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-gold)',
                      backgroundColor: 'transparent',
                      color: 'var(--color-gold)',
                      fontSize: '1.25rem',
                      lineHeight: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      userSelect: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--color-teal)'
                      e.target.style.color = '#fff'
                      e.target.style.borderColor = 'var(--color-teal)'
                      e.target.style.boxShadow = '0 0 10px var(--color-teal-glow)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = 'var(--color-gold)'
                      e.target.style.borderColor = 'var(--color-gold)'
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Dynamic Guide Info */}
                <div 
                  style={{ 
                    padding: '0.5rem 0.25rem', 
                    transition: 'all 0.5s ease',
                  }}
                >
                  <span className="text-teal" style={{ fontSize: '0.7rem', fontWeight: '500', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', fontFamily: 'var(--font-secondary)' }}>
                    Ritual Level: {ritualGuides[hours].name}
                  </span>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    {ritualGuides[hours].desc}
                  </p>
                </div>
              </div>

              {/* Intent field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Intent & Energy Concept
                </label>
                <textarea
                  name="intent"
                  required
                  rows="4"
                  placeholder="Describe the energy, vibrations, and story behind this tattoo..."
                  value={formData.intent}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: 'rgba(5, 30, 26, 0.3)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '1rem',
                    color: 'var(--color-text-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    lineHeight: '1.6',
                    resize: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-gold)'
                    e.target.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(212, 175, 55, 0.25)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{
                  marginTop: '1rem',
                  alignSelf: 'center',
                  width: '100%',
                  maxWidth: '300px',
                }}
              >
                {isSubmitting ? 'Channeling...' : 'Transmit Intent'}
              </button>

            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <span className="text-teal" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.5rem' }}>
                ॐ
              </span>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '1rem', fontFamily: 'var(--font-secondary)', letterSpacing: '0.15em' }}>
                Intent Transmitted
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.8', maxWidth: '400px', margin: '0 auto 2rem' }}>
                Your request has entered the void and is aligning with our dimensional schedule. We will reach out when the frequency matches.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="btn-gold"
                style={{ fontSize: '0.7rem', padding: '0.6rem 1.5rem' }}
              >
                Book Another Ritual
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '6rem', textAlign: 'center', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(230, 241, 239, 0.35)', fontFamily: 'var(--font-secondary)' }}>
          © {new Date().getFullYear()} DKB'S OHM INK. ONE ENERGY. ALL RIGHTS RESERVED.
        </div>
      </div>
    </section>
  )
}

export default Contact

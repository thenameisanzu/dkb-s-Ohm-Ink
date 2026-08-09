import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    intent: ''
  })

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
      setFormData({ name: '', email: '', intent: '' })
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
      <div style={{ maxWidth: '520px', margin: '0 auto', width: '100%' }}>
        
        {/* Section Header */}
        <div ref={headerRef} style={{ marginBottom: '3.5rem', textAlign: 'center', opacity: 0 }}>
          <span className="text-teal" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', display: 'block', marginBottom: '0.75rem', fontFamily: 'var(--font-secondary)' }}>
            THE CONDUIT
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'var(--color-text-light)', fontFamily: 'var(--font-secondary)' }}>
            TRANSMIT <span className="text-gold">INTENT</span>
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              {/* Name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Name / Identifier
                </label>
                <div className="relative-input-wrapper">
                  <span className="focus-bracket focus-bracket--tl" />
                  <span className="focus-bracket focus-bracket--tr" />
                  <span className="focus-bracket focus-bracket--bl" />
                  <span className="focus-bracket focus-bracket--br" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
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
              </div>

              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Digital Vessel (Email)
                </label>
                <div className="relative-input-wrapper">
                  <span className="focus-bracket focus-bracket--tl" />
                  <span className="focus-bracket focus-bracket--tr" />
                  <span className="focus-bracket focus-bracket--bl" />
                  <span className="focus-bracket focus-bracket--br" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
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
              </div>

              {/* Intent field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontFamily: 'var(--font-secondary)' }}>
                  Intent & Energy Concept
                </label>
                <div className="relative-input-wrapper">
                  <span className="focus-bracket focus-bracket--tl" />
                  <span className="focus-bracket focus-bracket--tr" />
                  <span className="focus-bracket focus-bracket--bl" />
                  <span className="focus-bracket focus-bracket--br" />
                  <textarea
                    name="intent"
                    required
                    rows="4"
                    placeholder="Describe the energy, vibrations, and story behind this tattoo..."
                    value={formData.intent}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
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
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold"
                style={{
                  marginTop: '0.5rem',
                  alignSelf: 'center',
                  width: '100%',
                  maxWidth: '240px',
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
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
                Your frequencies have been recorded. We will align our channels and respond shortly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="btn-gold"
                style={{
                  fontSize: '0.65rem',
                  padding: '0.75rem 1.5rem',
                  letterSpacing: '0.15em',
                }}
              >
                Transmit Another Concept
              </button>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div 
          style={{ 
            marginTop: '3.5rem', 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item"
            style={{ fontSize: '0.68rem', letterSpacing: '0.3em' }}
          >
            Instagram
          </a>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-teal)', opacity: 0.5 }} />
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item"
            style={{ fontSize: '0.68rem', letterSpacing: '0.3em' }}
          >
            WhatsApp
          </a>
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

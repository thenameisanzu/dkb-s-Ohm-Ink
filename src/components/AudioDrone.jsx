import React, { useState, useEffect, useRef } from 'react'

const AudioDrone = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)
  const oscillatorsRef = useRef([])

  const initAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // 1. Gain Node for smooth fade-ins and fade-outs
      const gainNode = ctx.createGain()
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNodeRef.current = gainNode

      // 2. Filter to warm up the sound (remove harsh high frequencies)
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(250, ctx.currentTime) // warm cutoff
      filter.Q.setValueAtTime(1, ctx.currentTime)

      // 3. LFO (Low Frequency Oscillator) to modulate filter cutoff (gives breathing wind texture)
      const lfo = ctx.createOscillator()
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime) // extremely slow modulation

      const lfoGain = ctx.createGain()
      lfoGain.gain.setValueAtTime(80, ctx.currentTime) // sweep range +/- 80Hz

      lfo.connect(lfoGain)
      lfoGain.connect(filter.frequency)

      // 4. Fundamental Oscillators (432 Hz and 434 Hz to create a 2 Hz binaural beat)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(432, ctx.currentTime)

      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(434, ctx.currentTime)

      // 5. Sub-Bass Oscillator (108 Hz, fundamental / 4, triangle wave for organic warmth)
      const oscSub = ctx.createOscillator()
      oscSub.type = 'triangle'
      oscSub.frequency.setValueAtTime(108, ctx.currentTime)

      // Connect nodes: Oscillators -> Filter -> Main Gain -> Output
      osc1.connect(filter)
      osc2.connect(filter)
      oscSub.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(ctx.destination)

      // Start oscillators
      osc1.start(0)
      osc2.start(0)
      oscSub.start(0)
      lfo.start(0)

      // Store references for cleanup
      oscillatorsRef.current = [osc1, osc2, oscSub, lfo]
    } catch (err) {
      console.warn('Web Audio API not supported in this browser:', err)
    }
  }

  const togglePlay = () => {
    const ctx = audioCtxRef.current
    const gainNode = gainNodeRef.current

    if (!ctx) {
      // First interaction: Initialize audio context and play
      initAudio()
      setIsPlaying(true)
      const targetCtx = audioCtxRef.current
      const targetGain = gainNodeRef.current
      if (targetCtx && targetGain) {
        targetGain.gain.setValueAtTime(0, targetCtx.currentTime)
        targetGain.gain.linearRampToValueAtTime(0.12, targetCtx.currentTime + 1.5) // 1.5s fade-in
      }
      return
    }

    if (isPlaying) {
      // Fade out and suspend
      gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8) // 0.8s fade-out
      setTimeout(() => {
        if (ctx.state === 'running') {
          ctx.suspend()
        }
      }, 850)
      setIsPlaying(false)
    } else {
      // Resume and fade in
      if (ctx.state === 'suspended') {
        ctx.resume()
      }
      gainNode.gain.setValueAtTime(0, ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5) // 1.5s fade-in
      setIsPlaying(true)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oscillatorsRef.current.length > 0) {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop()
          } catch (e) {}
        })
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close()
        } catch (e) {}
      }
    }
  }, [])

  return (
    <div className="audio-toggle-container" onClick={togglePlay}>
      <div className="audio-toggle-circle">
        {isPlaying ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
            <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" />
            <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" />
          </svg>
        )}
      </div>
      <span 
        style={{ 
          fontSize: '0.6rem', 
          letterSpacing: '0.25em', 
          textTransform: 'uppercase', 
          color: isPlaying ? 'var(--color-gold)' : 'var(--color-text-muted)', 
          fontFamily: 'var(--font-secondary)', 
          transition: 'color 0.3s ease' 
        }}
      >
        Drone {isPlaying ? 'On' : 'Off'}
      </span>
      <div className="audio-wave-visualizer">
        <span className={`audio-wave-bar ${isPlaying ? 'playing' : ''}`} />
        <span className={`audio-wave-bar ${isPlaying ? 'playing' : ''}`} />
        <span className={`audio-wave-bar ${isPlaying ? 'playing' : ''}`} />
        <span className={`audio-wave-bar ${isPlaying ? 'playing' : ''}`} />
      </div>
    </div>
  )
}

export default AudioDrone

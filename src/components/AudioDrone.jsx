import React, { useState, useEffect, useRef } from 'react'

// Singleton Audio instance to prevent React StrictMode range-request collisions
let globalAudio = null

const getAudioInstance = () => {
  if (typeof window !== 'undefined' && !globalAudio) {
    const audio = new Audio('/audio/ambient.mp3')
    audio.preload = 'auto'
    audio.loop = true
    audio.volume = 0
    audio.load() // Force aggressive background buffering immediately
    globalAudio = audio
  }
  return globalAudio
}

let globalPlayRef = null

export const triggerAudioPlay = () => {
  if (globalPlayRef) {
    globalPlayRef()
  } else {
    const audio = getAudioInstance()
    if (audio && audio.paused) {
      audio.play().then(() => {
        audio.volume = 0.4
      }).catch(() => {})
    }
  }
}

const AudioDrone = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const fadeIntervalRef = useRef(null)
  const hasInteractedRef = useRef(false)

  const fadeVolume = (targetVolume, duration, callback) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
    }

    const audio = getAudioInstance()
    if (!audio) return
    
    const step = 0.05
    const intervalTime = (duration * step) / Math.max(Math.abs(audio.volume - targetVolume), 0.01)

    fadeIntervalRef.current = setInterval(() => {
      if (targetVolume > audio.volume) {
        audio.volume = Math.min(audio.volume + step, targetVolume)
      } else {
        audio.volume = Math.max(audio.volume - step, targetVolume)
      }

      if (audio.volume === targetVolume) {
        clearInterval(fadeIntervalRef.current)
        fadeIntervalRef.current = null
        if (callback) callback()
      }
    }, Math.max(intervalTime, 30))
  }

  const playAudio = () => {
    const audio = getAudioInstance()
    if (audio && audio.paused) {
      audio.play().then(() => {
        fadeVolume(0.4, 1500) // Smoothly fade in volume to 40% over 1.5s
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Autoplay prevented or ambient.mp3 file missing from public/audio/ directory:', err)
      })
    }
  }

  const pauseAudio = () => {
    const audio = getAudioInstance()
    if (audio) {
      fadeVolume(0, 800, () => {
        audio.pause()
        setIsPlaying(false)
      })
    }
  }

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio()
    } else {
      playAudio()
    }
  }

  // Cleanup and Autoplay triggers
  useEffect(() => {
    globalPlayRef = playAudio

    // 1. Try to play immediately on mount (if browser media engagement permits)
    playAudio()

    const handleAutoplay = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true
        playAudio()
        removeListeners()
      }
    }

    const removeListeners = () => {
      window.removeEventListener('click', handleAutoplay)
      window.removeEventListener('keydown', handleAutoplay)
      window.removeEventListener('touchstart', handleAutoplay)
      window.removeEventListener('wheel', handleAutoplay)
      window.removeEventListener('scroll', handleAutoplay)
      window.removeEventListener('touchmove', handleAutoplay)
    }

    // 2. Bind interaction listeners for browser safety triggers
    window.addEventListener('click', handleAutoplay)
    window.addEventListener('keydown', handleAutoplay)
    window.addEventListener('touchstart', handleAutoplay)
    window.addEventListener('wheel', handleAutoplay)
    window.addEventListener('scroll', handleAutoplay)
    window.addEventListener('touchmove', handleAutoplay)

    // 3. Periodic checker to update UI if immediate autoplay succeeded
    const checkPlayingInterval = setInterval(() => {
      const audio = getAudioInstance()
      if (audio && !audio.paused) {
        setIsPlaying(true)
        removeListeners()
        clearInterval(checkPlayingInterval)
      }
    }, 300)

    return () => {
      globalPlayRef = null
      removeListeners()
      clearInterval(checkPlayingInterval)
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
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
        Resonance {isPlaying ? 'Active' : 'Muted'}
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

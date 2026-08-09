import React, { useEffect, useRef } from 'react'

const CosmicCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles = []
    const particleCount = 75
    const colors = [
      'rgba(223, 200, 136, 0.25)', // Champagne Gold
      'rgba(168, 85, 247, 0.22)',  // Luminous Amethyst
      'rgba(36, 10, 69, 0.25)',    // Deep Violet
    ]

    const mouse = { x: null, y: null, radius: 150 }

    // Particle Class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.ox = Math.random() * width
        this.oy = Math.random() * height
        this.rx = 0
        this.ry = 0
        this.radius = Math.random() * 2.5 + 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.vx = Math.random() * 0.4 - 0.2
        this.vy = Math.random() * 0.4 - 0.35 // Drift upwards slightly
        this.alpha = Math.random() * 0.5 + 0.1
        this.pulseSpeed = Math.random() * 0.01 + 0.005
        this.pulseDir = Math.random() > 0.5 ? 1 : -1
      }

      update() {
        this.ox += this.vx
        this.oy += this.vy

        // Wrap around boundaries
        if (this.ox < 0) this.ox = width
        if (this.ox > width) this.ox = 0
        if (this.oy < 0) this.oy = height
        if (this.oy > height) this.oy = 0

        // Actual positioned coordinate
        this.x = this.ox + this.rx
        this.y = this.oy + this.ry

        // Wrap actual coordinates as well
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0

        // Fade in/out pulsing
        this.alpha += this.pulseSpeed * this.pulseDir
        if (this.alpha > 0.8) {
          this.alpha = 0.8
          this.pulseDir = -1
        } else if (this.alpha < 0.1) {
          this.alpha = 0.1
          this.pulseDir = 1
        }

        // Mouse repulsion logic
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const angle = Math.atan2(dy, dx)
            // Displacement up to 48px elastically
            const targetRx = Math.cos(angle) * force * 48
            const targetRy = Math.sin(angle) * force * 48
            
            this.rx += (targetRx - this.rx) * 0.12
            this.ry += (targetRy - this.ry) * 0.12
          } else {
            // Spring back slowly when cursor goes out of range
            this.rx += (0 - this.rx) * 0.08
            this.ry += (0 - this.ry) * 0.08
          }
        } else {
          // Spring back slowly when cursor is active but leaves the document
          this.rx += (0 - this.rx) * 0.08
          this.ry += (0 - this.ry) * 0.08
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        
        // Add glowing drop shadows to gold particles
        if (this.color.includes('223, 200, 136')) {
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(223, 200, 136, 0.6)'
        } else {
          ctx.shadowBlur = 6
          ctx.shadowColor = 'rgba(168, 85, 247, 0.4)'
        }

        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw background space flow
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Generate a soft cosmic dust glow center occasionally
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Event listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      particles.forEach((p) => p.reset())
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}

export default CosmicCanvas

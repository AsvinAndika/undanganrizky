import React, { useState, useEffect, useRef } from 'react'

const COLORS = ['#F87171', '#FB923C', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA']

const Gift = () => {
  const [open, setOpen] = useState(false)
  const [showIban, setShowIban] = useState(false)
  const [confetti, setConfetti] = useState([])
  const containerRef = useRef(null)
  const IBAN = 'BCA 1234 5678 9012 3456 7890 123'
  const IBAN_PLACEHOLDER = 'BCA •••• •••• •••• •••• •••• •••'

  useEffect(() => {
    let t
    if (confetti.length) {
      t = setTimeout(() => setConfetti([]), 2200)
    }
    return () => clearTimeout(t)
  }, [confetti])

  const toggleOpen = () => {
    setOpen(v => {
      const willOpen = !v
      if (willOpen) launchConfetti(36)
      return willOpen
    })
  }

  const revealIban = () => {
    if (!showIban) {
      setShowIban(true)
    }
  }

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(IBAN)
    } catch {
      // ignore
    }
  }

  const launchConfetti = (count = 60) => {
    const container = containerRef.current
    const rect = container ? container.getBoundingClientRect() : { width: 320 }
    const pieces = Array.from({ length: count }).map((_, i) => {
      const left = (Math.random() * 0.8 + 0.1) * rect.width // Menyebar dari tengah
      const size = Math.floor(Math.random() * 8) + 6
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const delay = Math.random() * 150 // Delay lebih singkat agar meledak bersamaan
      const duration = 1800 + Math.random() * 1000 // Durasi jatuh lebih bervariasi

      // Variabel fisika untuk lintasan parabola
      const tx = (Math.random() - 0.5) * 500 // Jarak sebaran ke kiri/kanan (-250px s/d 250px)
      const tyPeak = -(Math.random() * 100 + 50) // Titik tertinggi lambungan ke atas
      const tyEnd = Math.random() * 300 + 200 // Titik jatuh ke bawah
      const rot = Math.random() * 720 - 360 // Putaran acak yang lebih ekstrem

      const borderRadius = Math.random() > 0.5 ? '50%' : `${Math.floor(Math.random() * 6)}px`
      
      return {
        id: `${Date.now()}-${i}`,
        left,
        size,
        color,
        delay,
        duration,
        tx: `${tx}px`,
        tyPeak: `${tyPeak}px`,
        tyEnd: `${tyEnd}px`,
        rot: `${rot}deg`,
        borderRadius
      }
    })
    setConfetti(pieces)
  }

  return (
    <section className="relative overflow-hidden bg-[#fff1d7] bg-cover bg-center p-4 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-serif text-[#642828] text-5xl md:text-6xl text-wedding-olive mb-6 mx-0 px-0 my-5">Gifts</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">Your presence is what matters most to us.<br className="hidden md:block" />If you wish to give us a gift, you can do so in the way that suits you best.</p>
        </div>

        <div className="rounded-2xl bg-[#642828] border-2 shadow-sm overflow-hidden animate-fade-in bg-wedding-olive border-wedding-olive relative" style={{ animationDelay: '0.2s' }} ref={containerRef}>
          <button
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
            onClick={toggleOpen}
            aria-expanded={open}
          >
            <span className="font-serif text-lg text-white">Contribution</span>
            <div className={`transition-transform duration-300 ${open ? 'rotate-0' : 'rotate-180'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-muted-foreground">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </button>

          <div className={`overflow-hidden bg-white transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-6 pb-6 pt-2 border-t border-border bg-primary-foreground">
              <p className="text-muted-foreground text-sm leading-relaxed mb-2">If you prefer, the gift can be in cash.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">If it suits you better, you can also make a bank transfer:</p>

              <div className="text-center">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Number</p>
                  <p className="font-mono text-sm text-foreground/80 tracking-wide select-all">{showIban ? IBAN : IBAN_PLACEHOLDER}</p>
                  <div className="mt-3">
                    {!showIban ? (
                      <button type="button" onClick={(e) => { e.stopPropagation(); revealIban(); }} className="text-sm text-[#642828] underline">Show Number</button>
                    ) : (
                      <button type="button" onClick={(e) => { e.stopPropagation(); copyIban(); }} className="px-3 py-1 bg-[#642828] text-white rounded text-sm">Copy</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* confetti pieces overlay */}
          
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-visible">
            {confetti.map(p => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: p.left,
                  bottom: 24,
                  width: p.size,
                  height: p.size * (0.6 + Math.random() * 0.8),
                  background: p.color,
                  borderRadius: p.borderRadius,
                  transform: `rotate(${p.rot})`,
                  animation: `confetti-rise ${p.duration}ms cubic-bezier(.2,.8,.2,1) ${p.delay}ms forwards`,
                  // CSS variables for advanced keyframe behavior
                  ['--tx']: p.tx,
                  ['--rot']: p.rot
                }}
              />
            ))}
          </div>
      </div>

    
      <style>{`
        @keyframes confetti-rise {
          0% { transform: translateY(0) translateX(0) rotate(0); opacity: 1 }
          40% { opacity: 1 }
          100% { transform: translateY(-260px) translateX(var(--tx)) rotate(calc(var(--rot) + 360deg)); opacity: 0 }
        }
      `}</style>
    </section>
  )
}

export default Gift

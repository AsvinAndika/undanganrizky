import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#F87171', '#FB923C', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA']

const Gift = () => {
  const [confetti, setConfetti] = useState([])
  const containerRef = useRef(null)
  const ACCOUNTS = [
    { bank: 'BNI', number: '0123456789', name: 'Rizky Dian Arhaman' },
    { bank: 'BRI', number: '0123456789', name: 'Jihan Shava Amani' }
  ]

  useEffect(() => {
    let t
    if (confetti.length) {
      t = setTimeout(() => setConfetti([]), 2200)
    }
    return () => clearTimeout(t)
  }, [confetti])

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      // small confetti burst on copy
      launchConfetti(18)
      setToast({ show: true, text: 'Nomor rekening tersalin' })
    } catch {
      // ignore
    }
  }

  const [toast, setToast] = useState({ show: false, text: '' })

  useEffect(() => {
    let t
    if (toast.show) {
      t = setTimeout(() => setToast({ show: false, text: '' }), 1800)
    }
    return () => clearTimeout(t)
  }, [toast])

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
      const height = size * (0.6 + Math.random() * 0.8)
      
      return {
        id: `${Date.now()}-${i}`,
        left,
        size,
        height,
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
    <section className="relative overflow-hidden bg-[#ffe7ba] bg-cover bg-center p-4 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 relative z-10 mb-4">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-[#642828] text-5xl md:text-6xl text-wedding-olive mb-6 mx-0 px-0 my-5 font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Hadiah</h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan tanda kasih untuk kami, dapat melalui:</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 }} viewport={{ once: true }} className="rounded-2xl bg-[#642828] border-2 shadow-sm overflow-hidden bg-wedding-olive border-wedding-olive relative" style={{ animationDelay: '0.2s' }} ref={containerRef}>
          <div className="p-6 bg-white border-t border-border">
            
            <div className="space-y-6">
              {ACCOUNTS.map((acc, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: idx * 0.06 }} viewport={{ once: true }} className="rounded-lg bg-white shadow-md p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded flex items-center justify-center">
                      {acc.bank === 'BNI' ? (
                        <img src="/public/assets/BNI.png" alt="BNI" className="w-10 h-6 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}} />
                      ) : acc.bank === 'BRI' ? (
                        <img src="/public/assets/BRI.png" alt="BRI" className="w-10 h-6 object-contain" onError={(e)=>{e.currentTarget.style.display='none'}} />
                      ) : (
                        <svg width="20" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="6" width="20" height="12" rx="2" fill="#FDE68A" stroke="#f3a34a"/></svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Nomor Rekening :</div>
                      <div className="font-mono text-sm text-foreground/90 tracking-wide select-all">{acc.number}</div>
                      <div className="text-sm text-muted-foreground mt-1">Atas Nama : <span className="text-foreground font-semibold">{acc.name}</span></div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button onClick={() => copyText(acc.number)} className="w-full px-4 py-2 bg-[#f3a34a] text-white rounded-md flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="11" height="11" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      <span className="text-sm">Salin Rekening</span>
                    </button>
                  </div>
                </motion.div>
              ))}
              <p className="text-muted-foreground text-center text-sm leading-relaxed mb-6">Mohon untuk memastikan rekening atau alamat kado sudah sesuai, sebelum anda mengirimkan hadiah. Jika ada ragu jangan sungkan untuk menanyakan kepada yang bersangkutan.</p>

            </div>
            
          </div>
          {/* Toast confirmation */}
          {toast.show ? (
            <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50">
              <div className="bg-black/80 text-white text-sm px-4 py-2 rounded-md">{toast.text}</div>
            </div>
          ) : null}
        </motion.div>
        <div className="pointer-events-none absolute inset-0 overflow-visible">
            {confetti.map(p => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: p.left,
                  bottom: 24,
                  width: p.size,
                  height: p.height,
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
          {/* <div className="mt-1 flex justify-center">
          <img src="public/assets/bingkai.png" alt="ornament" className="w-90 opacity-80" />
        </div> */}
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

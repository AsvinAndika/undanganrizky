import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Countdown = ({ targetDate }) => {
  const getRemaining = useCallback(() => {
    if (!targetDate) return null
    const now = new Date()
    const diff = new Date(targetDate) - now
    if (diff <= 0) return null
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    return { days, hours, minutes, seconds }
  }, [targetDate])

  const [t, setT] = useState(getRemaining())

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [getRemaining])

  if (!t)
    return (
      <div className="mt-6 text-center">
        <div className="text-2xl text-amber-200">Acara telah berlangsung</div>
      </div>
    )

  const parts = [
    { value: t.days, label: 'Days' },
    { value: t.hours, label: 'Hours' },
    { value: t.minutes, label: 'Minutes' },
    { value: t.seconds, label: 'Seconds' },
  ]

  return (
    <div className="relative overflow-hidden bg-cover bg-[#fff1d7] bg-center p-4 shadow-lg">
      <div className="mb-1 flex justify-center">
          <img src="/assets/bingkai1.png" alt="ornament" className="w-90 opacity-80" />
        </div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: 'easeOut' }} viewport={{ once: true }} className="bg-[#642828] backdrop-blur-sm px-3 py-6 sm:px-8 sm:py-6 rounded-2xl w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl overflow-visible border-2 border-amber-400/70 shadow-sm mb-1">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-3">
          <div className="text-xs text-amber-200 uppercase tracking-widest">Counting The Days</div>
          <div className="font-serif text-lg md:text-2xl text-amber-50">Kami Berharap Bisa Merayakan Bersama Anda</div>
        </motion.div>

        <div className="flex items-center justify-center gap-6 whitespace-nowrap">
          {parts.map((p, i) => (
            <motion.div key={p.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }} viewport={{ once: true }} className="flex flex-col items-center shrink-0">
              <div className="w-10 h-10 sm:w-14 md:w-20 rounded-full bg-amber-50/5 flex items-center justify-center ring-2 ring-amber-400/90 shadow-md">
                <div className="text-base sm:text-xl md:text-3xl font-serif text-amber-100">{String(p.value).padStart(2, '0')}</div>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider text-amber-200">{p.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="mb-3 flex justify-center">
          <img src="/assets/bingkai.png" alt="ornament" className="w-90 opacity-80" />
        </div>
    </div>
  )
}

export default Countdown

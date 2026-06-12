import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const Gallery = () => {
  const images = [
     { src: '/assets/galeri/galeri6.jpg', isLandscape: true, isFullWidth: true }, 
    { src: '/assets/galeri/galeri10.jpg', isLandscape: true },
    { src: '/assets/galeri/galeri2.jpg', isLandscape: false },
    { src: '/assets/galeri/galeri3.jpg', isLandscape: false },
    { src: '/assets/galeri/galeri12.jpg', isLandscape: true },
    { src: '/assets/galeri/galeri13.jpg', isLandscape: true },
    { src: '/assets/galeri/galeri7.jpg', isLandscape: false },
    { src: '/assets/galeri/galeri11.jpg', isLandscape: false },
    { src: '/assets/galeri/galeri8.jpg', isLandscape: false }, 
    { src: '/assets/galeri/galeri9.jpg', isLandscape: true },
    { src: '/assets/galeri/galeri1.jpg', isLandscape: true, isFullWidth: true }, 
  ]

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)

  const openAt = (i) => {
    setIndex(i)
    setOpen(true)
  }

  const next = useCallback(() => setIndex(i => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex(i => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, next, prev])

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (touchStartX == null) return
    const dx = e.changedTouches[0].clientX - touchStartX
    if (dx > 50) prev()
    if (dx < -50) next()
    setTouchStartX(null)
  }

  return (
    <section className="relative overflow-hidden bg-[#fff1d7] bg-cover bg-center p-4 shadow-lg">
      <div className="max-w-3xl mx-auto px-4 mt-2 mb-4">
        <div className="text-center mb-6">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-sm text-amber-500 uppercase tracking-widest">Memori</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="text-5xl text-[#642828] md:text-6xl text-wedding-olive mt-3 font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Galeri</motion.h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }} viewport={{ once: true }} className="bg-[#fff1d7] rounded-2xl shadow p-6 border border-[#e19823]">
          
          {/* GRID CONTAINER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 auto-rows-[120px] sm:auto-rows-[150px]">
            {images.map((img, i) => {
              // Jika isFullWidth true, berikan span kolom penuh dan gunakan tinggi 2 baris (atau sesuaikan) agar proporsional
              const colSpan = img.isFullWidth ? 'col-span-2 sm:col-span-3 row-span-2' : (img.isLandscape ? 'row-span-1' : 'row-span-2')

              return (
                <motion.div 
                  key={i} 
                  className={`overflow-hidden rounded-md w-full h-full ${colSpan}`}
                  initial={{ opacity: 0, y: 14 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.7, delay: i * 0.06 }} 
                  viewport={{ once: true }}
                >
                  <img
                    src={img.src}
                    alt={`gallery-${i}`}
                    onClick={() => openAt(i)}
                    className="w-full h-full object-cover cursor-pointer transform transition-transform duration-300 hover:scale-102"
                  />
                </motion.div>
              )
            })}
          </div>

        </motion.div>
      </div>

      <div className="mt-2 flex justify-center">
          <img src="/assets/bungaa3.png" alt="ornament" className="w-70 opacity-100" />
      </div>

      {/* Lightbox / Preview Mode */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <button aria-label="close" onClick={() => setOpen(false)} className="absolute top-6 right-6 text-amber-50 bg-[#642828] rounded-full w-10 h-10 flex items-center justify-center shadow">✕</button>
          <button aria-label="prev" onClick={prev} className="absolute left-4 sm:left-8 text-amber-50 bg-[#642828] rounded-full w-10 h-10 flex items-center justify-center shadow">‹</button>
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={images[index].src}
              alt={`lightbox-${index}`}
              className="max-w-full max-h-full object-contain rounded-md"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>
          <button aria-label="next" onClick={next} className="absolute right-4 sm:right-8 text-amber-50 bg-[#642828] rounded-full w-10 h-10 flex items-center justify-center shadow">›</button>
        </div>
      )}
    </section>
  )
}

export default Gallery
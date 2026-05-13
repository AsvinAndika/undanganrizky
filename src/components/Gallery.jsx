
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Gallery = () => {
  const images = [
    'public/assets/galeri/galeri1.jpg',
    'public/assets/galeri/galeri2.jpg',
    // 'public/assets/galeri/galeri3.jpg',
    // 'public/assets/galeri/galeri4.jpg',
    // 'public/assets/galeri/galeri5.jpg',
    // 'public/assets/galeri/galeri6.jpg',
    // 'public/assets/galeri/galeri7.jpg',
  ]

  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(null)
  const [featured, setFeatured] = useState(0)
  const [prevFeatured, setPrevFeatured] = useState(null)
  const [isFading, setIsFading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const openAt = (i) => {
    setIndex(i)
    setOpen(true)
  }

  const next = () => setIndex(i => (i + 1) % images.length)
  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // rotate featured image every 10 seconds, pause on open or hover
  useEffect(() => {
    const startFade = () => {
      const nextIdx = (featured + 1) % images.length
      // keep a copy of current as prev, set next as featured but start with isFading=false
      setPrevFeatured(featured)
      setFeatured(nextIdx)
      setIsFading(false)
      // allow DOM to render new featured with opacity-0, then trigger fade
      setTimeout(() => {
        setIsFading(true)
        // after fade duration clear prev
        setTimeout(() => setPrevFeatured(null), 700)
      }, 50)
    }

    const id = setInterval(() => {
      if (open || isHovered) return
      startFade()
    }, 7000)
    return () => clearInterval(id)
  }, [images.length, featured, open, isHovered])

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
      <div className="max-w-3xl mx-auto px-4 mt-8 mb-8">
        <div className="text-center mb-6">
          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-sm text-amber-500 uppercase tracking-widest">Memori</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="text-5xl text-[#642828] md:text-6xl text-wedding-olive mt-3 font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Galeri</motion.h2>
          {/* <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.06 }} viewport={{ once: true }} className="mt-3 text-sm text-[#642828] max-w-lg mx-auto">A collection of moments we treasure — feel free to send yours.</motion.p> */}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }} viewport={{ once: true }} className="bg-[#fff1d7] rounded-2xl shadow p-6 border border-[#e19823]">
          <div className="grid grid-cols-3 grid-rows-3 gap-3">
            <div
              className="col-span-2 row-span-3 overflow-hidden rounded-md relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Crossfade layers */}
              {prevFeatured !== null && (
                <img
                  src={images[prevFeatured]}
                  alt={`gallery-prev-${prevFeatured}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                />
              )}

              <img
                src={images[featured]}
                alt={`gallery-${featured}`}
                onClick={() => openAt(featured)}
                className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-700 ${isFading ? 'opacity-100' : 'opacity-100'}`}
              />
            </div>

            {images.map((src, i) => {
              if (i === featured) return null
              return (
                <motion.div key={i} className="overflow-hidden rounded-md" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.06 }} viewport={{ once: true }}>
                  <img
                    src={src}
                    alt={`gallery-${i}`}
                    onClick={() => openAt(i)}
                    className="w-full h-40 sm:h-48 object-cover cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <button aria-label="close" onClick={() => setOpen(false)} className="absolute top-6 right-6 text-amber-50 bg-[#642828] rounded-full w-10 h-10 flex items-center justify-center shadow">✕</button>
          <button aria-label="prev" onClick={prev} className="absolute left-4 sm:left-8 text-amber-50 bg-[#642828] rounded-full w-10 h-10 flex items-center justify-center shadow">‹</button>
          <div className="max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={images[index]}
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

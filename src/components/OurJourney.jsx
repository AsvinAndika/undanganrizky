
import { motion } from 'framer-motion'

const entries = [
  {
    year: '2021',
    title: 'Awal kisah',
    text: 'Our paths crossed in the most unexpected way. What started as a chance encounter became the beginning of our beautiful journey together.'
  },
  {
    year: '2022',
    title: 'Menjalin Hubungan',
    text: 'We discovered our shared love for exploration and adventure. From late-night conversations to spontaneous trips, every moment brought us closer.'
  },
  {
    year: '2026',
    title: 'Lamaran',
    text: 'We knew this was forever. Building our life together, supporting each other’s dreams, and growing stronger with each passing day.'
  },
  {
    year: '2026',
    title: 'Menikah',
    text: 'With a heart full of love and dreams for our future, the question was asked and answered with tears of joy.'
  }
]

const OurJourney = () => {
  return (
    <section className="relative overflow-hidden bg-cover bg-center p-4">
      <div className="max-w-3xl mx-auto px-6 mt-4">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="text-sm text-amber-500">Perjalanan Kami</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} className="text-4xl md:text-5xl font-bold text-red-950/90 mb-5 mt-3" style={{ fontFamily: "'Great Vibes', cursive" }}>Cerita Cinta</motion.h2>
        </div>

        <div className="mt-8 relative max-w-xl mx-auto">
          {/* vertical line placed behind the dots */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-red-950/90 z-0" />

          <div className="space-y-14 mb-10">
            {entries.map((e) => (
              <motion.div
                key={`${e.year}-${e.title}`}
                className="flex items-start relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{ hidden: {}, visible: {} }}
              >
                <div className="w-10 shrink-0 flex items-start justify-center">
                  <motion.div
                    // dot animates immediately when item visible
                    variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } } }}
                    className="w-4 h-4 rounded-full bg-red-950/90 mt-2 z-20"
                  />
                </div>

                <div className="ml-6 pl-6">
                  <motion.div className="text-xs text-amber-500 italic -mt-1" variants={{ hidden: { opacity: 0, x: -24 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: d } }) }} custom={0.04}>{e.year}</motion.div>

                  <motion.h3 className="text-xl font-serif text-red-950/90 mt-1" variants={{ hidden: { opacity: 0, x: -28 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut', delay: d } }) }} custom={0.04}>{e.title}</motion.h3>

                  <motion.p className="mt-2 text-gray-600 leading-relaxed" variants={{ hidden: { opacity: 0, x: -32 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.75, ease: 'easeOut', delay: d } }) }} custom={0.04}>{e.text}</motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut', delay: 1.6 }} viewport={{ once: true, amount: 0.3 }} className="absolute left-0 bottom-0 w-full flex justify-start">
            <div className="-ml-1">
              <svg className="w-12 h-12 glow-heart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0%" stopColor="#460809" />
                    <stop offset="100%" stopColor="#AD6161" />
                  </linearGradient>
                </defs>
                <path fill="url(#g1)" d="M12 21s-6-3.7-8.2-6.1C1 12.2 4 7.5 8 9.5 9.7 10.6 12 13 12 13s2.3-2.4 4-3.5c4-2 7 2.7 4.2 5.4C18 17.3 12 21 12 21z" />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }} viewport={{ once: true, amount: 0.3 }} className="mt-2 flex justify-center">
          <img src="public/assets/bungaa5.png" alt="ornament" className="w-80 opacity-100" />
        </motion.div>
      </div>
    </section>
  )
}

export default OurJourney

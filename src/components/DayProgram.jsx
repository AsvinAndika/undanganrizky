
const items = [
  { time: '19:45', title: 'Pembukaan', desc: "" , icon: 'resepsi'},
  { time: '19:50', title: 'Pembacaan Ayat Suci Al-Quran', desc: "" , icon: 'quran'},
  { time: '19:50', title: 'Sambutan Keluarga', desc: "" , icon: 'family'},
  { time: '19:50', title: 'Ceramah', desc: "" , icon: 'speaker'},
  { time: '20:20', title: 'Makan Malam & Hiburan', desc: "" , icon: 'dinner'},
  { time: '22:00', title: 'Acara Bebas', desc: "" , icon: 'jam1'},
]


import { motion } from 'framer-motion'

const DayProgram = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#fff1d7] bg-cover bg-center text-amber-50 p-8 shadow-lg"
      style={{ backgroundImage: "url('/assets/backred.jpg')" }}>
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-4xl font-bold"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Susunan Acara
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-amber-200 mt-2"
          >
            Jadilah Saksi Momen Bahagia Kami
          </motion.p>
        </div>

        <div className="mt-8 relative max-w-xl mx-auto pl-8">
          {/* static vertical line */}
          <div className="absolute left-14 top-6 bottom-6 w-px bg-amber-200/30" />

          <div className="space-y-16">
            {items.map((it) => (
              <motion.div
                key={it.time}
                className="relative flex items-start"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={{ hidden: {}, visible: {} }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-12 flex items-start justify-center"
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } } }}
                >
                  <div className="w-10 h-10 rounded-full bg-olive-900 border border-amber-300 flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={`/assets/${it.icon}.png`}
                      alt={it.icon}
                      className="w-6 h-6 object-contain"
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.35 } } }}
                    />
                  </div>
                </motion.div>

                <div className="ml-14">
                  <motion.div className="flex items-center space-x-4">
                    {/* <motion.span
                      className="bg-amber-100 text-olive-900 text-xs font-medium px-3 py-1 rounded-full"
                      variants={{ hidden: { opacity: 0, x: -20 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: d } }) }}
                      custom={0.04}
                    >
                      {it.time}
                    </motion.span> */}

                    <motion.h3
                      className="font-serif text-lg"
                      variants={{ hidden: { opacity: 0, x: -28 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay: d } }) }}
                      custom={0.04}
                    >
                      {it.title}
                    </motion.h3>
                  </motion.div>

                  <motion.p
                    className="text-amber-200 mt-2"
                    variants={{ hidden: { opacity: 0, x: -32 }, visible: (d = 0.04) => ({ opacity: 1, x: 0, transition: { duration: 0.65, ease: 'easeOut', delay: d } }) }}
                    custom={0.04}
                  >
                    {it.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DayProgram

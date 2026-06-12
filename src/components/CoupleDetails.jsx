import { motion } from 'framer-motion';

const CoupleDetails = () => {
  // Varians untuk animasi sederhana
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section
      className="relative overflow-hidden bg-[#fff1d7] bg-cover bg-center text-amber-50 p-4 shadow-lg"
      style={{ backgroundImage: "url('/assets/backround.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Animasi Pojok Atas - Slide dari kiri atas */}
      <motion.img 
        initial={{ x: -100, y: -100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src="/assets/pojokatas.png" 
        alt="" 
        className="absolute top-0 left-0 w-36 md:w-56" 
      />

      {/* Animasi Pojok Bawah - Slide dari kanan bawah */}
      <motion.img 
        initial={{ x: 100, y: 100, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        src="/assets/pojokbawah.png" 
        alt="" 
        className="absolute bottom-0 right-0 w-36 md:w-56" 
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 max-w-2xl mx-auto text-center py-20 px-0 text-amber-50">
        
        {/* Logo JR */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-1 mb-1"
        >
          <img src="/assets/JR.png" alt="ornament" className="mx-auto w-35 md:w-25 opacity-90" />
        </motion.div>

        {/* Bismillah */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-4 mb-3"
        >
          <img src="/assets/bismilah.png" alt="ornament" className="mx-auto w-60 md:w-70 opacity-90" />
        </motion.div>

        <motion.p 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm tracking-widest text-amber-100 p-4"
        >
          DENGAN PENUH RASA SYUKUR DAN CINTA, KAMI MENGUNDANG BAPAK/IBU/SAUDARA/I UNTUK HADIR DAN MENJADI SAKSI DI HARI BAHAGIA KAMI.
        </motion.p>

        {/* Mempelai Wanita */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="mt-10 text-3xl md:text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#f5d29a' }}>
            Jihan Shava Amani, S.S.
          </h1>
          <p className="mt-0 text-sm text-amber-100 p-4">Putri ke-dua dari bapak Rudi Widjanarko dan Ibu Fadiah Elyana</p>
        </motion.div>

        {/* Ornamen "Dan" */}
        <motion.div 
          initial={{ opacity: 0, rotate: -180 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="mt-1 mb-1"
        >
          <img src="/assets/dan.png" alt="ornament" className="mx-auto w-25 md:w-15 opacity-90" />
        </motion.div>

        {/* Mempelai Pria */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#f5d29a' }}>
            Rizky Dian Arhaman, S.Pd.,Gr.
          </h2>
          <p className="mt-0 text-sm text-amber-100 p-4">Putra pertama dari bapak Wahid Hasyim dan Ibu Baiq Muradah</p>
        </motion.div>

        {/* Bunga Bawah */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <img src="/assets/bungaa8.png" alt="ornament" className="mx-auto w-40 md:w-44 opacity-90" />
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleDetails;
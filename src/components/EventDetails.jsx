import { motion } from 'framer-motion'

const EventDetails = () => {
  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.6530628799392!2d115.16643366399761!3d-8.822448273165586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b000559bfa1%3A0xedcdbbb29c031fda!2sFasum%20Bukit%20Ungasan%20Permai!5e0!3m2!1sid!2sid!4v1779461375230!5m2!1sid!2sid" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  const lat = -8.8256103
  const lng = 115.163779
  const placeLabel = 'Fasum Bukit Ungasan Permai, Badung, Bali'

  const openInMaps = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isAndroid = /Android/i.test(navigator.userAgent)

    if (isIOS) {
      // Open Apple Maps
      window.location.href = `maps://?q=${encodeURIComponent(placeLabel)}`
      return
    }

    if (isAndroid) {
      // Try geo: URI to open native maps app on Android; fallback to web
      const geo = `geo:${lat},${lng}?q=${encodeURIComponent(placeLabel)}`
      const fallback = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeLabel)}`
      // attempt to open native app
      window.location.href = geo
      // if app isn't installed, open web fallback shortly after
      setTimeout(() => window.open(fallback, '_blank'), 700)
      return
    }

    // Desktop / unknown: open Google Maps web
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeLabel)}`, '_blank')
  }

  return (
    <section className="relative overflow-hidden bg-[#fff1d7] bg-cover bg-center p-4 shadow-lg">
       {/* <div className="absolute inset-0 bg-black/5" /> */}
      <div className="max-w-2xl mx-auto px-4 mb-4">
        <div className="text-center mt-4 mb-6">
          {/* <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-sm text-amber-700 uppercase tracking-widest">Join Us</motion.p> */}
          <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="text-[#642828] text-4xl md:text-5xl text-wedding-olive mt-2 font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Detail Acara</motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.06 }} viewport={{ once: true }} className="mt-3 text-sm text-gray-900 max-w-lg mx-auto">Dengan segala kerendahan hati kami bermaksud ingin mengundang bapak/ibu/saudara/i untuk hadir didalam acara pernikahan kami, yang akan diselenggarakan pada.</motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }} viewport={{ once: true }} className="rounded-2xl bg-[#642828] border-2 border-[#e19823] shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#e19823] mx-auto mb-4">
              <img src="/assets/bintang.png" alt="event" className="w-9 h-9" />
            </div>

            <h2 className="text-3xl font-medium text-amber-50" style={{ fontFamily: "'Great Vibes', cursive" }}>Akad Nikah</h2>
            <div className="mt-3 text-amber-50 flex items-center justify-center gap-3 text-sm">
              <div>Minggu 28 Juni 2026</div>
            </div>
            <div className="mt-3 text-amber-50 flex items-center justify-center gap-3 text-sm">
              <img src="/assets/jam.png" alt="time" className="w-4 h-4 inline-block" />
              <div>pukul 19.00 WITA - Selesai</div>
            </div>

            <div className="mt-4 text-sm text-amber-50">
              <div className="font-medium">LOKASI</div>
              <div className="mt-1 text-amber-50"> jl. Merak, perum. Ungasan permai, br.santhi karya, Ungasan, Badung, Bali</div>
            </div>

            <div className="mt-4 w-full rounded-md overflow-hidden shadow-sm">
              <iframe
                title="event-map"
                src={mapSrc}
                className="w-full h-40 md:h-48"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* <p className="mt-4 text-sm text-amber-50">Join us as we exchange our vows in an intimate ceremony surrounded by our loved ones.</p> */}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="#" onClick={openInMaps} role="button" className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#e19823] rounded-md text-sm text-amber-700 bg-white hover:bg-amber-50"> 
                <img src="/assets/lokasi2.png" alt="maps" className="w-6 h-6" />
                Open in Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventDetails

import{ useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const RSVP = () => {
  const [name, setName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const raw = params.get('to')
      if (!raw) return ''
      return decodeURIComponent(raw.replace(/\+/g, ' '))
    } catch {
      return ''
    }
  })
  const [attend, setAttend] = useState('yes')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [apiAvailable, setApiAvailable] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const messagesRef = useRef(null)
  const [highlightId, setHighlightId] = useState(null)

  const formatRelativeTime = (iso) => {
    try {
      const now = new Date().getTime()
      const past = new Date(iso).getTime()
      let diff = Math.floor((now - past) / 1000)
      if (isNaN(diff) || diff < 0) return ''

      if (diff < 60) return 'baru saja'
      if (diff < 3600) {
        const m = Math.floor(diff / 60)
        return `${m} menit yang lalu`
      }
      if (diff < 86400) {
        const h = Math.floor(diff / 3600)
        const m = Math.floor((diff % 3600) / 60)
        return m > 0 ? `${h} jam ${m} menit yang lalu` : `${h} jam yang lalu`
      }
      const days = Math.floor(diff / 86400)
      if (days < 30) return `${days} hari yang lalu`
      const months = Math.floor(days / 30)
      if (months < 12) return `${months} bulan yang lalu`
      const years = Math.floor(months / 12)
      return `${years} tahun yang lalu`
    } catch {
      return ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return

    const entry = {
      id: Date.now(),
      name: name.trim(),
      attend,
      message: message.trim(),
      time: new Date().toISOString()
    }

    if (apiAvailable === null || apiAvailable === true) {
      // try POST to API (if available). If apiAvailable is null we still attempt once.
      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      }).then(r => {
        if (!r.ok) return Promise.reject(r)
        return r.json()
      }).then(data => {
        setMessages(Array.isArray(data) ? data : (Array.isArray(messages) ? messages : []))
        setApiAvailable(true)
        setHighlightId(entry.id)
        setName('')
        setAttend('yes')
        setMessage('')
      }).catch(() => {
        // mark API unavailable and fallback to local storage update
        setApiAvailable(false)
        const updated = [entry, ...messages]
        setMessages(updated)
        try { localStorage.setItem('undangan_rsvp_messages', JSON.stringify(updated)) } catch {}
        setHighlightId(entry.id)
        setName('')
        setAttend('yes')
        setMessage('')
      })
    } else {
      // API not available -> persist locally
      const updated = [entry, ...messages]
      setMessages(updated)
      try { localStorage.setItem('undangan_rsvp_messages', JSON.stringify(updated)) } catch {}
      setHighlightId(entry.id)
      setName('')
      setAttend('yes')
      setMessage('')
    }
  }

  // Scroll to top and clear highlight after a short delay when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (highlightId) {
      const t = setTimeout(() => setHighlightId(null), 900)
      return () => clearTimeout(t)
    }
  }, [messages, highlightId])

  // on mount: try load from /api/messages, then /messages.json, then localStorage
  useEffect(() => {
    let did = false
    fetch('/api/messages').then(r => {
      if (!r.ok) return Promise.reject(r)
      return r.json()
    }).then(data => {
      if (did) return
      setApiAvailable(true)
      if (Array.isArray(data)) setMessages(data)
    }).catch(() => {
      // try public/messages.json
      fetch('/messages.json').then(r => r.ok ? r.json() : Promise.reject()).then(data => {
        if (did) return
        setApiAvailable(false)
        if (Array.isArray(data)) setMessages(data)
      }).catch(() => {
        // fallback to localStorage
        try {
          const raw = localStorage.getItem('undangan_rsvp_messages')
          if (raw) {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) setMessages(parsed)
          }
        } catch {}
        setApiAvailable(false)
      })
    })
    return () => { did = true }
  }, [])

  // load messages from server on mount
  useEffect(() => {
    fetch('/api/messages').then(r => r.ok ? r.json() : Promise.reject()).then(data => {
      if (Array.isArray(data)) setMessages(data)
    }).catch(() => {
      // ignore, keep empty
    })
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#642828] bg-cover bg-center p-4 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 mt-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-6">
          <p className="text-sm text-amber-200 uppercase tracking-widest">berikan</p>
          <h2 className="text-4xl text-[#faf4eb] md:text-6xl text-wedding-olive mt-3 font-bold"  style={{ fontFamily: "'Great Vibes', cursive" }}>Doa & Ucapan</h2>
          {/* <p className="mt-3 text-sm text-[#faf4eb]">Please let us know if you'll be joining us by October 22, 2026</p> */}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.06 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow p-6 border border-[#e19823]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Nama Lengkap *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Nama Lengkap" required className="w-full p-3 border border-[#642828] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e19823]" />
            </div>

            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Konfirmasi Kehadiran *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attend" value="yes" checked={attend === 'yes'} onChange={() => setAttend('yes')} />
                  <span className="text-sm">Hadir</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attend" value="no" checked={attend === 'no'} onChange={() => setAttend('no')} />
                  <span className="text-sm">Tidak Hadir</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Ucapan Untuk Pasangan</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tulis Ucapan..." rows={4} className="w-full p-3 border border-[#642828] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e19823]" />
            </div>

            <div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#642828] text-amber-50 rounded-md text-base shadow border border-[#e19823]">
                <img src="/assets/kirim.png" alt="send" className="w-5 h-5" />
                Kirim Doa & Ucapan
              </button>
            </div>
          </form>
        </motion.div>

        {/* submitted messages (nested card) */}
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }} viewport={{ once: true }} className="mt-3 mb-3">
          <div className="bg-[#faf4eb] rounded-lg p-4 border border-[#e19823]">
            <h3 className="text-lg font-serif text-[#642828] mb-3">Ucapan</h3>
            <div ref={messagesRef} className="space-y-3 max-h-72 overflow-auto">
              {(showAll ? messages : messages.slice(0, 3)).map(m => (
                <div key={m.id} className={`p-3 bg-[#faf4eb] rounded-md shadow-sm border border-[#642828] ${m.id === highlightId ? 'animate-pulse' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#642828]">{m.name}</div>
                      <div className="text-sm text-gray-700">{m.attend === 'yes' ? 'Hadir' : 'Tidak Hadir'}</div>
                    </div>
                    <div className="text-xs text-gray-600" title={new Date(m.time).toLocaleString()}>{formatRelativeTime(m.time)}</div>
                  </div>
                  <div className="mt-2 text-gray-800 text-sm">{m.message}</div>
                </div>
              ))}
            </div>

            {messages.length > 3 && (
              <div className="mt-3 text-center">
                <button onClick={() => setShowAll(s => !s)} className="text-sm text-[#642828] underline">
                  {showAll ? 'Lihat Sedikit' : `Lihat lainnya (${messages.length - 3} Lainnya)`}
                </button>
              </div>
            )}
          </div>
        </motion.div>
        <div className="mt-2 flex justify-center">
          <img src="/assets/bungaa3.png" alt="ornament" className="w-70 opacity-100" />
        </div>
      </div>
    </section>
  )
}

export default RSVP

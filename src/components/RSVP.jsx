import React, { useState } from 'react'

const RSVP = () => {
  const [name, setName] = useState('')
  const [attend, setAttend] = useState('yes')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [showAll, setShowAll] = useState(false)

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

    setMessages(prev => [entry, ...prev])
    setName('')
    setAttend('yes')
    setMessage('')
  }

  return (
    <section className="relative overflow-hidden bg-[#642828] bg-cover bg-center p-4 shadow-lg">
      <div className="max-w-2xl mx-auto px-4 mt-10">
        <div className="text-center mb-6">
          <p className="text-sm text-amber-200 uppercase tracking-widest">Be Our Guest</p>
          <h2 className="font-serif text-5xl text-[#faf4eb] md:text-6xl text-wedding-olive mt-2">RSVP</h2>
          <p className="mt-3 text-sm text-[#faf4eb]">Please let us know if you'll be joining us by October 22, 2026</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-[#e19823]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Full Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required className="w-full p-3 border border-[#642828] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e19823]" />
            </div>

            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Will you be attending? *</label>
              <div className="flex gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attend" value="yes" checked={attend === 'yes'} onChange={() => setAttend('yes')} />
                  <span className="text-sm">Joyfully Accept</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="attend" value="no" checked={attend === 'no'} onChange={() => setAttend('no')} />
                  <span className="text-sm">Regretfully Decline</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-medium text-sm text-[#642828] mb-2 font-serif">Message for the Couple</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Share your well wishes..." rows={4} className="w-full p-3 border border-[#642828] rounded-md focus:outline-none focus:ring-2 focus:ring-[#e19823]" />
            </div>

            <div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#642828] text-amber-50 rounded-md text-base shadow border border-[#e19823]">
                <img src="/assets/send-icon.png" alt="send" className="w-4 h-4" />
                Send RSVP
              </button>
            </div>
          </form>
        </div>

        {/* submitted messages (nested card) */}
        <div className="mt-6 mb-6">
          <div className="bg-[#faf4eb] rounded-lg p-4 border border-[#e19823]">
            <h3 className="text-lg font-serif text-[#642828] mb-3">Messages</h3>
            <div className="space-y-3 max-h-72 overflow-auto">
              {(showAll ? messages : messages.slice(0, 3)).map(m => (
                <div key={m.id} className="p-3 bg-#faf4eb rounded-md shadow-sm border border-[#642828]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#642828]">{m.name}</div>
                      <div className="text-sm text-gray-700">{m.attend === 'yes' ? 'Hadir' : 'Tidak Hadir'}</div>
                    </div>
                    <div className="text-xs text-gray-600">{new Date(m.time).toLocaleString()}</div>
                  </div>
                  <div className="mt-2 text-gray-800 text-sm">{m.message}</div>
                </div>
              ))}
            </div>

            {messages.length > 3 && (
              <div className="mt-3 text-center">
                <button onClick={() => setShowAll(s => !s)} className="text-sm text-[#642828] underline">
                  {showAll ? 'See less' : `See more (${messages.length - 3} more)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RSVP

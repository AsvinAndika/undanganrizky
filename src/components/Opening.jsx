import { useState, useRef } from 'react'

const Opening = ({ onComplete = () => {} }) => {
  const [fading, setFading] = useState(false)
  const [guestName] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const raw = params.get('to')
      if (raw) {
        return decodeURIComponent(raw.replace(/\+/g, ' '))
      }
    } catch {
      // ignore
    }
    return ''
  })
  const [nameFading, setNameFading] = useState(false)
  const videoRef = useRef(null)

  const handleVideoClick = async () => {
    if (!videoRef.current) return
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play()
        // fade guest name when playback starts
        setNameFading(true)
      }
    } catch {
      // Handle play error silently
    }
  }

  const handleEnded = () => {
    setFading(true)
    setTimeout(() => onComplete(), 700)
  }

  return (
    <div className="fixed inset-0 ">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 controls-hidden ${fading ? 'opacity-0' : 'opacity-100'}`}
        src="/assets/opening1.mp4"
        onClick={handleVideoClick}
        onEnded={handleEnded}
        playsInline
      />

      {/* Guest name + invite text overlay (fades with opening) */}
      <div className={`pointer-events-none fixed inset-0 flex flex-col items-center justify-end pb-24 transition-opacity duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}>
        {guestName ? (
          <div className={`mt-2 mb-8 text-center transition-opacity duration-500 ${nameFading ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-sm mb-3 text-white opacity-80">Kepada :</div>
            <div className="mt-1 text-white text-2xl font-serif font-semibold">{guestName}</div>
            <div className="mt-2 h-0.5 bg-white w-32 mx-auto rounded" />
            <div className="mt-2 h-0.5 bg-white w-20 mx-auto rounded" />
          </div>
        ) : null}
        {/* small instruction telling guests they can tap anywhere to open maps */}
        <div className={`pointer-events-none mb-6 transition-opacity duration-500 ${fading ? 'opacity-0' : (nameFading ? 'opacity-0' : 'opacity-100')}`}>
          <div className="text-center text-white text-xs opacity-80 px-3 py-1 bg-black/30 rounded">Tekan di mana saja untuk membuka Undangan</div>
        </div>
      </div>

      {/* fade overlay to white when ending */}
      <div className={`pointer-events-none fixed inset-0 transition-opacity duration-700 ${fading ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}

export default Opening

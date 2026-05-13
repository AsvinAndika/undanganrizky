import { useState, useRef, useEffect } from 'react'

const Opening = ({ onComplete = () => {} }) => {
  const [fading, setFading] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [nameFading, setNameFading] = useState(false)
  const videoRef = useRef(null)

  // Parse ?to=Name+Here from URL and decode pluses
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const raw = params.get('to')
      if (raw) {
        const decoded = decodeURIComponent(raw.replace(/\+/g, ' '))
        setGuestName(decoded)
      }
    } catch (e) {
      // ignore
    }
  }, [])

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
      </div>

      {/* fade overlay to white when ending */}
      <div className={`pointer-events-none fixed inset-0 transition-opacity duration-700 ${fading ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}

export default Opening

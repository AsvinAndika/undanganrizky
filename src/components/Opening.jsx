import React, { useState, useRef } from 'react'

const Opening = ({ onComplete = () => {} }) => {
  const [fading, setFading] = useState(false)
  const videoRef = useRef(null)

  const handleVideoClick = async () => {
    if (!videoRef.current) return
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play()
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
        src="public/assets/opening1.mp4"
        onClick={handleVideoClick}
        onEnded={handleEnded}
        playsInline
      />

      {/* fade overlay to white when ending */}
      <div className={`pointer-events-none fixed inset-0 transition-opacity duration-700 ${fading ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  )
}

export default Opening

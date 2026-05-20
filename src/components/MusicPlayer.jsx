import { useEffect, useRef, useState, useMemo } from 'react'

const MusicPlayer = ({ src = '/assets/music1.mp3' }) => {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Normalize to array of candidate sources. Add a sensible fallback.
  const sources = useMemo(() => Array.isArray(src) ? src : [src, '/assets/music1.mp3'], [src])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onEnded = () => setPlaying(false)
    const onError = () => {
      // Try next source if available
      if (currentIndex + 1 < sources.length) {
        const next = currentIndex + 1
        setCurrentIndex(next)
      } else {
        console.warn('All audio sources failed to load')
      }
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [currentIndex, sources])

  // When currentIndex or sources change, set the audio src and load it.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = sources[currentIndex]
    audio.load()
  }, [currentIndex, sources])

  // Try to autoplay on mount; if blocked, wait for first user interaction.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let cleanedUp = false

    const tryPlay = async () => {
      try {
        // Ensure audio is unmuted for audible play
        audio.muted = false
        await audio.play()
        setPlaying(true)
        removeInteractionListeners()
      } catch {
        // Autoplay was blocked by browser
      }
    }

    const onUserGesture = async () => {
      if (cleanedUp) return
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // ignore
      } finally {
        removeInteractionListeners()
      }
    }

    const removeInteractionListeners = () => {
      cleanedUp = true
      document.removeEventListener('click', onUserGesture)
      document.removeEventListener('touchstart', onUserGesture)
      document.removeEventListener('keydown', onUserGesture)
    }

    // initial attempt
    tryPlay()

    // if blocked, add listeners to play on first gesture
    document.addEventListener('click', onUserGesture, { once: true })
    document.addEventListener('touchstart', onUserGesture, { once: true })
    document.addEventListener('keydown', onUserGesture, { once: true })

    return () => {
      removeInteractionListeners()
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
      } else {
        await audio.play()
        setPlaying(true)
      }
    } catch (err) {
      console.warn('Audio play failed', err)
    }
  }

  return (
    <div className="music-player" aria-hidden={false}>
      <audio ref={audioRef} preload="auto">
        <source src={sources[currentIndex]} type="audio/mpeg" />
      </audio>
      <button onClick={toggle} aria-pressed={playing} title={playing ? 'Stop music' : 'Play music'}>
        <span className="sr-only">{playing ? 'Stop music' : 'Play music'}</span>
        {playing ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="5" width="4" height="14" rx="1" fill="white" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="white" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 3v18l15-9L5 3z" fill="white" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default MusicPlayer

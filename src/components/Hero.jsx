import React from 'react'

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className={`absolute inset-0 w-full h-full object-cover controls-hidden`}
        src="src/assets/hero-video.mp4"
        playsInline
        autoPlay
        muted
        loop
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-amber-50">
          <div className="text-sm uppercase tracking-widest text-amber-200">We're getting married</div>
          <h1 className="mt-4 text-4xl md:text-6xl font-serif">Rizky &amp; Jihan</h1>
          <p className="mt-4 text-sm md:text-base">22 November 2026</p>
        </div>
      </div>
    </section>
  )
}

export default Hero

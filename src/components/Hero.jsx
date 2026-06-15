
const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className={`absolute inset-0 w-full h-full object-cover controls-hidden`}
        src="/assets/hero-video1.mp4"
        playsInline
        autoPlay
        muted
        loop
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center text-amber-50">
          <div className="text-sm uppercase tracking-widest text-amber-200">The Wedding Of</div>
          <h1 className="mt-4 text-5xl md:text-6xl font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Jihan  &amp;  Rizky</h1>
          <p className="mt-4 text-sm md:text-base">28 Juni 2026</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 text-center">
        <a className="inline-flex flex-col items-center gap-2 text-amber-50 text-sm md:text-base hover:text-amber-200 transition-colors">
          <span>Info Selengkapnya</span>
          <svg
            className="h-5 w-5 animate-bounce"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Hero

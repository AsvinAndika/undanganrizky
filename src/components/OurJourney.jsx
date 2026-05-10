import React from 'react'

const entries = [
  {
    year: '2020',
    title: 'How We Met',
    text: 'Our paths crossed in the most unexpected way. What started as a chance encounter became the beginning of our beautiful journey together.'
  },
  {
    year: '2021',
    title: 'First Adventure',
    text: 'We discovered our shared love for exploration and adventure. From late-night conversations to spontaneous trips, every moment brought us closer.'
  },
  {
    year: '2023',
    title: 'Moving Forward',
    text: 'We knew this was forever. Building our life together, supporting each other’s dreams, and growing stronger with each passing day.'
  },
  {
    year: '2025',
    title: 'The Proposal',
    text: 'With a heart full of love and dreams for our future, the question was asked and answered with tears of joy.'
  }
]

const OurJourney = () => {
  return (
    <section className="relative py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <div className="text-sm text-amber-500">Our Journey</div>
          <h2 className="font-serif text-4xl md:text-5xl text-red-950/90 mb-5">Our Love Story</h2>
        </div>

        <div className="mt-8 relative max-w-xl mx-auto">
          {/* vertical line placed behind the dots */}
          <div className="absolute left-5 top-2 bottom-2 w-px bg-red-950/90 z-0" />

          <div className="space-y-16 mb-10">
            {entries.map((e, idx) => (
              <div key={e.year} className="flex items-start relative z-10">
                <div className="w-10 flex-shrink-0 flex items-start justify-center">
                  <div className="w-4 h-4 rounded-full bg-red-950/90 mt-2 z-20" />
                </div>

                <div className="ml-6 pl-6">
                  <div className="text-xs text-amber-500 italic -mt-1">{e.year}</div>
                  <h3 className="text-xl font-serif text-red-950/90 mt-1">{e.title}</h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">{e.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* heart ornament at end of line */}
          <div className="absolute left-0 bottom-0 w-full flex justify-start">
            <div className="-ml-1">
              <svg className="w-12 h-12 glow-heart" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#460809" />
                  <stop offset="100%" stopColor="#AD6161" />
                </linearGradient>
              </defs>
              <path fill="url(#g1)" d="M12 21s-6-3.7-8.2-6.1C1 12.2 4 7.5 8 9.5 9.7 10.6 12 13 12 13s2.3-2.4 4-3.5c4-2 7 2.7 4.2 5.4C18 17.3 12 21 12 21z" />
            </svg>
            </div>
          </div>
        <div className="mt-30 flex justify-center">
        </div>
        </div>
        {/* floral ornament centered at very bottom of this section */}
        <div className="mt-10 flex justify-center">
          <img src="src/assets/burung.png" alt="ornament" className="w-60 opacity-90" />
        </div>
      </div>
    </section>
  )
}

export default OurJourney

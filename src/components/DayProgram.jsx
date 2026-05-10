import React from 'react'

const items = [
  { time: '4:30 PM', title: 'Guest Arrival', desc: 'Welcome and reception' , icon: 'users'},
  { time: '5:00 PM', title: 'Ceremony', desc: 'Civil wedding' , icon: 'heart'},
  { time: '6:00 PM', title: 'Cocktail', desc: 'Aperitifs and drinks' , icon: 'glass'},
  { time: '8:00 PM', title: 'Dinner', desc: 'Wedding banquet' , icon: 'knife'},
  { time: '10:30 PM', title: 'First Dance', desc: "The newlyweds' dance" , icon: 'dance'},
  { time: '11:00 PM', title: 'Party', desc: "Let's dance!" , icon: 'music'},
  { time: '2:30 AM', title: 'End', desc: 'Goodbye' , icon: 'sparkles'},
]


const DayProgram = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#642828] bg-cover bg-center text-amber-50 p-8 shadow-lg"
      style={{ backgroundImage: "url('src/assets/backred.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10">
        <div className="text-center">
        <h2 className="font-serif text-3xl">Day Program</h2>
        <p className="text-amber-200 mt-2">What we have prepared for you</p>
      </div>

      <div className="mt-8 relative max-w-xl mx-auto pl-8">
        {/* vertical line placed near left inside the centered container */}
        <div className="absolute left-14 top-6 bottom-6 w-px bg-amber-200/30" />

        <div className="space-y-8">
          {items.map((it) => (
            <div key={it.time} className="relative">
              {/* icon box positioned more to the left */}
              <div className="absolute left-0 top-0 w-12 flex items-start justify-center">
                <div className="w-10 h-10 rounded-full bg-olive-900 border border-amber-300 flex items-center justify-center overflow-hidden">
                  {/* image icon - place files in public/icons/<name>.png (or .svg) */}
                  <img src={`/icons/${it.icon}.png`} alt={it.icon} className="w-5 h-5 object-contain" />
                </div>
              </div>

              <div className="ml-14">
                <div className="flex items-center space-x-4">
                  <span className="bg-amber-100 text-olive-900 text-xs font-medium px-3 py-1 rounded-full">{it.time}</span>
                  <h3 className="font-serif text-lg">{it.title}</h3>
                </div>
                <p className="text-amber-200 mt-2">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  )
}

export default DayProgram

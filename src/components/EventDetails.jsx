import React from 'react'

const EventDetails = () => {
  const mapQuery = encodeURIComponent('Gedung Serbaguna Jl. Merdeka No 10 Jakarta')
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`

  // Event details for calendar
  const eventTitle = 'Wedding Ceremony - Rizky & Diana'
  const eventLocation = 'Mairie du 19ème arrondissement, 5-7 Place Armand Carrel, 75019 Paris, France'
  const eventDescription = "Join us as we exchange our vows in an intimate ceremony surrounded by our loved ones."
  // Date: 10 Oct 2026, 16:00 local (adjust as needed)
  const eventStart = new Date(2026, 9, 10, 16, 0, 0)
  const eventEnd = new Date(2026, 9, 10, 18, 0, 0)

  const fmtICS = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const fmtGoogle = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'

  const handleAddToCalendar = () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//undanganrizky//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@undanganrizky`,
      `DTSTAMP:${fmtICS(new Date())}`,
      `DTSTART:${fmtICS(eventStart)}`,
      `DTEND:${fmtICS(eventEnd)}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription}`,
      `LOCATION:${eventLocation}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    if (isMobile) {
      // On mobile, navigating to the .ics URL often opens the calendar app
      window.location.href = url
      // revoke later
      setTimeout(() => URL.revokeObjectURL(url), 20000)
      return
    }

    // Desktop: trigger download and open Google Calendar as an option
    const a = document.createElement('a')
    a.href = url
    a.download = 'wedding-event.ics'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 20000)

    // Open Google Calendar as convenience
    const gDates = `${fmtGoogle(eventStart)}/${fmtGoogle(eventEnd)}`
    const gUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${gDates}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`
    window.open(gUrl, '_blank')
  }

  return (
    <section className="relative overflow-hidden bg-[#642828] bg-cover bg-center p-4 shadow-lg"
     style={{ backgroundImage: "url('public/assets/backwhite.jpg')" }}>
       <div className="absolute inset-0 bg-black/5" />
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-6">
          <p className="text-sm text-amber-700 uppercase tracking-widest">Join Us</p>
          <h2 className="font-serif text-[#642828] text-4xl md:text-5xl text-wedding-olive mt-2">Event Details</h2>
          <p className="mt-3 text-sm text-gray-900 max-w-lg mx-auto">We can't wait to celebrate this special day with you. Here's everything you need to know.</p>
        </div>

        <div className="rounded-2xl bg-[#642828] border-2 border-[#e19823] shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#e19823] mx-auto mb-4">
              <img src="public/assets/event-icon.png" alt="event" className="w-6 h-6" />
            </div>

            <h2 className="text-3xl font-serif font-medium text-amber-50">Wedding Ceremony</h2>
            <div className="mt-3 text-amber-50 flex items-center justify-center gap-3 text-sm">
              <img src="public/assets/time-icon.png" alt="time" className="w-4 h-4 inline-block" />
              <div>4:00 PM</div>
            </div>

            <div className="mt-4 text-sm text-amber-50">
              <div className="font-medium">Mairie du 19ème arrondissement</div>
              <div className="mt-1 text-amber-50">5-7 Place Armand Carrel<br/>75019 Paris, France</div>
            </div>

            <div className="mt-4 w-full rounded-md overflow-hidden shadow-sm">
              <iframe
                title="event-map"
                src={mapSrc}
                className="w-full h-40 md:h-48 border-0"
                loading="lazy"
              />
            </div>

            <p className="mt-4 text-sm text-amber-50">Join us as we exchange our vows in an intimate ceremony surrounded by our loved ones.</p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#e19823] rounded-md text-sm text-amber-700 bg-white hover:bg-amber-50"> 
                <img src="public/assets/maps-placeholder.png" alt="maps" className="w-4 h-4" />
                Open in Maps
              </a>

              <button onClick={handleAddToCalendar} className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#e19823] rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                <img src="public/assets/calendar-placeholder.png" alt="calendar" className="w-4 h-4" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventDetails

import React from 'react'
import Hero from './Hero'
import OurJourney from './OurJourney'
import DayProgram from './DayProgram'
import Gift from './Gift'
import EventDetails from './EventDetails'
import RSVP from './RSVP'
import Countdown from './Countdown'
import Footer from './Footer'

const Invitation = () => {
  return (
    <div className="bg-[#faf4eb] text-olive-900">
      <Hero />
      <main className="max-w-1xl mx-auto">
        <OurJourney />
        <Countdown targetDate={new Date('2026-10-10T10:00:00')} />
        <DayProgram />
        <Gift />
        <EventDetails />
        <RSVP />
      </main>
      <Footer />
    </div>
  )
}

export default Invitation

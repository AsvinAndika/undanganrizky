import Hero from './Hero'
import CoupleDetails from './CoupleDetails'
import MusicPlayer from './MusicPlayer'
import OurJourney from './OurJourney'
import DayProgram from './DayProgram'
import Gift from './Gift'
import EventDetails from './EventDetails'
import RSVP from './RSVP'
import Gallery from './Gallery'
import Countdown from './Countdown'
import Footer from './Footer'

const Invitation = () => {
  return (
    <div className="bg-[#faf4eb] text-olive-900">
      <Hero />
      <main className="max-w-1xl mx-auto">
        <CoupleDetails />
        <Countdown targetDate={new Date('2026-06-28T19:30:00')} />
        <OurJourney />
        <EventDetails />
        <DayProgram />
        <Gift />
        <RSVP />
        <Gallery />
      </main>
      <MusicPlayer src="/assets/music1.mp3" />
      <Footer />
    </div>
  )
}

export default Invitation

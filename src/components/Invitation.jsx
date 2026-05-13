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
        <OurJourney />
        <Countdown targetDate={new Date('2026-07-27T10:00:00')} />
        <DayProgram />
        <Gift />
        <EventDetails />
        <RSVP />
        <Gallery />
      </main>
      <MusicPlayer src="public/assets/music1.mp3" />
      <Footer />
    </div>
  )
}

export default Invitation

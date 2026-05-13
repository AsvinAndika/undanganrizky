import { useState } from 'react'
import Opening from './components/Opening'
import Invitation from './components/Invitation'

const App = () => {
  const [opened, setOpened] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      {!opened ? (
        <Opening onComplete={() => setOpened(true)} />
      ) : (
        <Invitation />
      )}
    </div>
  )
}

export default App
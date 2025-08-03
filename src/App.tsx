import GameCanvas from '@/components/GameCanvas'
import ControlePanel from './components/ControlPanel'
import NewGameDialog from './components/NewGameDialog'
import Information from './components/Information'
import PlayerTurnCard from './components/PlayerTurnCard'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4">
      <Information />
      <NewGameDialog />
      <ControlePanel />
      <PlayerTurnCard />
      <GameCanvas />
    </div>
  )
}

export default App

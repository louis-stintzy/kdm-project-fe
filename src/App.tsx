import GameCanvas from '@/components/GameCanvas'
import ControlePanel from './components/ControlPanel'
import NewGameDialog from './components/NewGameDialog'
import Information from './components/Information'

function App() {
  return (
    <>
      <Information />
      <NewGameDialog />
      <ControlePanel />
      <GameCanvas />
    </>
  )
}

export default App

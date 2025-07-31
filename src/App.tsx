import GameCanvas from '@/components/GameCanvas'
import ControlePanel from './components/ControlPanel'
import NewGameDialog from './components/NewGameDialog'

function App() {
  return (
    <>
      <NewGameDialog />
      <ControlePanel />
      <GameCanvas />
    </>
  )
}

export default App

import { Layer, Stage } from 'react-konva'
import Domino from './components/Domino'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <GameBoard />
        <Domino />
      </Layer>
    </Stage>
  )
}

export default App

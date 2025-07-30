import { Layer, Stage } from 'react-konva'
import GameBoard from '@/components/GameBoard'
import DominoDrawInterface from './DominoDrawInterface/DominoDrawInterface'

function GameCanvas() {
  return (
    <Stage width={1200} height={800}>
      <Layer>
        <GameBoard />
      </Layer>
      <Layer>
        <DominoDrawInterface />
      </Layer>
    </Stage>
  )
}

export default GameCanvas

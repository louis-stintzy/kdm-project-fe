import { Group, Rect } from 'react-konva'
import { CELL_SIZE } from '@/constants/board'
import type { Terrain, Tile } from '@/types/domino.types'

interface DominoProps {
  x: number
  y: number
  tiles: [Tile, Tile]
}

function Domino({ x, y, tiles }: DominoProps) {
  const tileColor = (terrain: Terrain) => {
    switch (terrain) {
      case 'wheat':
        return '#ffcc00'
      case 'forest':
        return '#003300'
      case 'lake':
        return '#0000ff'
      case 'grass':
        return '#00ff00'
      case 'swamp':
        return '#808080'
      case 'mine':
        return '#999999'
      default:
        return '#ffffff'
    }
  }

  return (
    <Group x={x} y={y} draggable>
      <Rect
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill={tileColor(tiles[0].terrain)}
      />
      <Rect
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill={tileColor(tiles[1].terrain)}
      />
    </Group>
  )
}

export default Domino

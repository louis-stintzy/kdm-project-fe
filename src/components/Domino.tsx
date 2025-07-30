import { Group, Rect } from 'react-konva'
import { CELL_SIZE } from '@/constants/board'
import type { Terrain, Tile } from '@/types/domino.types'

interface DominoProps {
  x: number
  y: number
  tiles: [Tile, Tile]
  playPhase?: 'draft' | 'placement' | null // Optional prop for play phase
}

function Domino({ x, y, tiles, playPhase }: DominoProps) {
  const tileColor = (terrain: Terrain) => {
    switch (terrain) {
      case 'wheat':
        return '#ffcc33'
      case 'forest':
        return '#006600'
      case 'lake':
        return '#0099ff'
      case 'grass':
        return '#00ff00'
      case 'swamp':
        return '#996600'
      case 'mine':
        return '#999999'
      default:
        return '#ffffff'
    }
  }

  return (
    <Group draggable={playPhase === 'placement'}>
      <Rect
        x={x}
        y={y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        stroke={'black'}
        strokeWidth={0.5}
        fill={tileColor(tiles[0].terrain)}
      />
      <Rect
        x={x + CELL_SIZE}
        y={y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        stroke={'black'}
        strokeWidth={0.5}
        fill={tileColor(tiles[1].terrain)}
      />
    </Group>
  )
}

export default Domino

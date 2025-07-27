import { Group, Rect } from 'react-konva'
import { CELL_SIZE } from '@/constants/board'

function Domino() {
  return (
    <Group draggable>
      <Rect x={700} y={20} width={CELL_SIZE} height={CELL_SIZE} fill="blue" />
      <Rect
        x={700 + CELL_SIZE}
        y={20}
        width={CELL_SIZE}
        height={CELL_SIZE}
        fill="green"
      />
    </Group>
  )
}

export default Domino

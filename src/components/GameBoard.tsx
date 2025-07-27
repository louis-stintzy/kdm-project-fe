import { Group, Rect } from 'react-konva'
import { BOARD_SIZE, CASTLE_POSITIONS, CELL_SIZE } from '@/constants/board'

function GameBoard() {
  return (
    <Group draggable>
      {Array.from({ length: BOARD_SIZE }).flatMap(
        // `flatMap` flattens into a single array
        (_, rowIndex) =>
          Array.from({ length: BOARD_SIZE }).map((_, colIndex) => (
            <Rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * CELL_SIZE}
              y={rowIndex * CELL_SIZE}
              width={CELL_SIZE}
              height={CELL_SIZE}
              fill={
                rowIndex === CASTLE_POSITIONS.y &&
                colIndex === CASTLE_POSITIONS.x
                  ? 'gold'
                  : '#f0f0f0'
              }
              stroke="black"
              strokeWidth={0.05}
            />
          )),
      )}
    </Group>
  )
}

export default GameBoard

import { usePlayer } from '@/store/hooks/usePlayer'
import type { PawnId } from '@/types/player.types'
import { Circle } from 'react-konva'

function Pawns() {
  const { pawns, shuffledPawnOrder, updatePawnPosition } = usePlayer()
  if (!shuffledPawnOrder.length) return null

  const handleDragEnd = (
    pawnId: PawnId,
    newPosition: { x: number; y: number },
  ) => {
    updatePawnPosition(pawnId, newPosition)
  }

  return (
    <>
      {pawns.map((pawn) => (
        <Circle
          key={pawn.id}
          draggable={pawn.isDraggable}
          x={pawn.position?.x}
          y={pawn.position?.y}
          radius={15}
          stroke={pawn.isDraggable ? 'black' : 'gray'}
          strokeWidth={2}
          fill={pawn.color.hex}
          onDragEnd={(e) => {
            const newPosition = { x: e.target.x(), y: e.target.y() }
            handleDragEnd(pawn.id, newPosition)
          }}
        />
      ))}
    </>
  )
}

export default Pawns

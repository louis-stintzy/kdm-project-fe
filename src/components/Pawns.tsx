import { CELL_SIZE } from '@/constants/board'
import { PAWNS_SIZE } from '@/constants/pawns'
import { useDomino } from '@/store/hooks/useDomino'
import { usePlayer } from '@/store/hooks/usePlayer'
import type { PawnId } from '@/types/player.types'
import { Circle } from 'react-konva'

function Pawns() {
  const { currentDominos, nextDominos, turn, playPhase } = useDomino()
  const {
    pawns,
    // shuffledPawnOrder,
    updatePawnPosition,
    pawnTakesPositionOnDomino,
  } = usePlayer()

  // if (turn === 0 || !currentDominos.length) return null
  // if (!shuffledPawnOrder.length) return null

  const handleDragEnd = (
    pawnId: PawnId,
    newPosition: { x: number; y: number },
  ) => {
    updatePawnPosition(pawnId, newPosition)

    if (playPhase === 'draft' && turn === 1 && currentDominos.length) {
      console.log(`Pawn ${pawnId} placed at`, newPosition)
      // TODO: prévoir la largeur du pion
      const targetDomino = currentDominos.find(
        (domino) =>
          domino.position?.x !== undefined &&
          domino.position?.y !== undefined &&
          newPosition.x >= domino.position?.x &&
          newPosition.x <= domino.position?.x + CELL_SIZE * 2 &&
          newPosition.y >= domino.position?.y &&
          newPosition.y <= domino.position?.y + CELL_SIZE,
      )
      if (targetDomino) {
        console.log('Pawn placed on a domino: ', targetDomino)
        pawnTakesPositionOnDomino(pawnId, true, targetDomino)
        // TODO: confirmer le choix du domino + placer le pion au centre du domino (voir placeDomino de la slice domino) + si ok PR et passer à la phase placement
      } else {
        console.log('No domino found')
        pawnTakesPositionOnDomino(pawnId, false)
      }
      return
    }
    if (playPhase === 'draft' && turn !== 1) {
      console.log(`Pawn ${pawnId} placed at`, newPosition)
      console.log(nextDominos)
    }
  }

  return (
    <>
      {pawns.map((pawn) => (
        <Circle
          key={pawn.id}
          draggable={pawn.isDraggable}
          x={pawn.position?.x}
          y={pawn.position?.y}
          radius={PAWNS_SIZE}
          stroke={pawn.isDraggable ? `${pawn.color.hex}75` : `black`}
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

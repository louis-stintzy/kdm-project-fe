import { useDomino } from '@/store/hooks/useDomino'
import Domino from '@/components/Domino'

function CurrentDominos() {
  const { currentDominos, playPhase } = useDomino()
  return (
    <>
      {currentDominos.map((domino) => {
        // Ensure domino has a position before rendering
        if (!domino.position) {
          console.error('Domino position is undefined:', domino)
          return null
        }
        // Ensure playPhase is defined before passing it to Domino
        if (playPhase === undefined) {
          console.error('Play phase is undefined')
          return null
        }
        return (
          <Domino
            key={domino.id}
            x={domino.position.x}
            y={domino.position.y}
            tiles={domino.tiles}
            playPhase={playPhase} // Pass playPhase to Domino if needed
          />
        )
      })}
    </>
  )
}

export default CurrentDominos

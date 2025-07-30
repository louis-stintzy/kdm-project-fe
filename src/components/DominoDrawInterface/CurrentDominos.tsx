import { useDomino } from '@/store/hooks/useDomino'
import Domino from '@/components/Domino'

function CurrentDominos() {
  const { currentDominos, playPhase } = useDomino()
  return (
    <>
      {currentDominos.map((domino, index) => (
        <Domino
          key={domino.id}
          x={700}
          y={20 + index * 60}
          tiles={domino.tiles}
          playPhase={playPhase} // Pass playPhase to Domino if needed
        />
      ))}
    </>
  )
}

export default CurrentDominos

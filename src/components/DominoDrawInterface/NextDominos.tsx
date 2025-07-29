import { useDomino } from '@/store/hooks/useDomino'
import Domino from '../Domino'

function NextDominos() {
  const { nextDominos } = useDomino()
  return (
    <>
      {nextDominos.map((domino, index) => (
        <Domino
          key={domino.id}
          x={820}
          y={20 + index * 60}
          tiles={domino.tiles}
        />
      ))}
    </>
  )
}

export default NextDominos

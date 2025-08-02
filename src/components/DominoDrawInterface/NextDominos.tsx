import { useDomino } from '@/store/hooks/useDomino'
import Domino from '../Domino'
import {
  DOMINO_SPACING,
  STARTING_X_POSITION_NEXT_DOMINOS,
} from '@/constants/drawInterface'

function NextDominos() {
  const { nextDominos } = useDomino()
  return (
    <>
      {nextDominos.map((domino, index) => (
        <Domino
          key={domino.id}
          x={STARTING_X_POSITION_NEXT_DOMINOS}
          y={index * DOMINO_SPACING}
          tiles={domino.tiles}
        />
      ))}
    </>
  )
}

export default NextDominos

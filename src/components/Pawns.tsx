import { usePlayer } from '@/store/hooks/usePlayer'
import { Circle } from 'react-konva'

function Pawns() {
  const { pawns, mixedPawns } = usePlayer()
  if (!mixedPawns) return null
  return (
    <>
      {pawns.map((pawn, index) => (
        <Circle
          key={pawn.id}
          x={700}
          y={25 + 5 + index * 80}
          radius={10}
          stroke="black"
          strokeWidth={1}
          fill={pawn.color.hex}
        />
      ))}
    </>
  )
}

export default Pawns

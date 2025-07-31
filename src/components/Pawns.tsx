import { usePlayer } from '@/store/hooks/usePlayer'
import { Circle } from 'react-konva'

function Pawns() {
  const { pawns } = usePlayer()
  return (
    <>
      {pawns.map((pawn, index) => (
        <Circle
          key={pawn.id}
          x={200}
          y={0 + index * 20}
          radius={10}
          fill={pawn.color.hex}
        />
      ))}
    </>
  )
}

export default Pawns

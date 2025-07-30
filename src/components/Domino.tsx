import { Group, Rect, Image } from 'react-konva'
import { CELL_SIZE } from '@/constants/board'
import type { DominoTiles, Terrain } from '@/types/domino.types'
import crownSrc from '@/assets/crown.png'
import { useEffect, useState } from 'react'

interface DominoProps {
  x: number
  y: number
  tiles: DominoTiles
  playPhase?: 'draft' | 'placement' | null // Optional prop for play phase
}

function Domino({ x, y, tiles, playPhase }: DominoProps) {
  const CROWN_SIZE = 20

  const [crownImg, setCrownImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new window.Image()
    img.src = crownSrc
    img.onload = () => setCrownImg(img)
  }, [])

  const tileColor = (terrain: Terrain) => {
    switch (terrain) {
      case 'wheat':
        return '#ffcc33'
      case 'forest':
        return '#006600'
      case 'lake':
        return '#0099ff'
      case 'grass':
        return '#00ff00'
      case 'swamp':
        return '#996600'
      case 'mine':
        return '#000000'
      default:
        return '#ffffff'
    }
  }

  return (
    <Group draggable={playPhase === 'placement'}>
      <Rect
        x={x}
        y={y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        stroke={'black'}
        strokeWidth={0.5}
        fill={tileColor(tiles[0].terrain)}
      />
      {crownImg &&
        Array.from({ length: tiles[0].crowns }).map((_, index) => (
          <Image
            key={index}
            x={x + CELL_SIZE - index * 20 - 25}
            y={y + 5}
            width={CROWN_SIZE}
            height={CROWN_SIZE}
            image={crownImg}
          />
        ))}
      <Rect
        x={x + CELL_SIZE}
        y={y}
        width={CELL_SIZE}
        height={CELL_SIZE}
        stroke={'black'}
        strokeWidth={0.5}
        fill={tileColor(tiles[1].terrain)}
      />
      {crownImg &&
        Array.from({ length: tiles[1].crowns }).map((_, index) => (
          <Image
            key={index}
            x={x + CELL_SIZE + CELL_SIZE - index * 20 - 25}
            y={y + 5}
            width={CROWN_SIZE}
            height={CROWN_SIZE}
            image={crownImg}
          />
        ))}
    </Group>
  )
}

export default Domino

import { DOMINOS } from '@/constants/dominos'

export type DominoId = (typeof DOMINOS)[number]['id']
export type DominoLabel = (typeof DOMINOS)[number]['label']
export type DominoOrder = (typeof DOMINOS)[number]['order']
export type DominoTiles = (typeof DOMINOS)[number]['tiles']
export type DominoTile = (typeof DOMINOS)[number]['tiles'][number]

export type Terrain = DominoTile['terrain']

export interface DominoPosition {
  x: number
  y: number
}

export interface Domino {
  id: DominoId
  label: DominoLabel
  order: DominoOrder
  tiles: DominoTiles
  isDraggable: boolean
  position?: DominoPosition
}

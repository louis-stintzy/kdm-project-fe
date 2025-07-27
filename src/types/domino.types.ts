export type Terrain = 'wheat' | 'forest' | 'lake' | 'grass' | 'swamp' | 'mine'

export interface Tile {
  terrain: Terrain
  crowns: number
}

export interface Domino {
  id: number
  label: string
  order: number
  tiles: [Tile, Tile]
}

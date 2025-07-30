import { PAWN_COLORS } from '@/constants/player'
import type { DominoId } from './domino.types'

// ----- Pawn Types -----

export type PawnId =
  | 'yellow-1'
  | 'yellow-2'
  | 'blue-1'
  | 'blue-2'
  | 'green-1'
  | 'green-2'
  | 'pink-1'
  | 'pink-2'
  | 'brown-1'
  | 'brown-2'

export type PawnColorName = keyof typeof PAWN_COLORS
export type PawnColorHex = (typeof PAWN_COLORS)[PawnColorName]

export interface PawnColor {
  name: PawnColorName
  hex: PawnColorHex
}

export interface PawnPosition {
  x: number
  y: number
}

export interface Pawn {
  id: PawnId
  color: PawnColor
  position: PawnPosition
  playerId?: PlayerId
  selectedDominoId?: DominoId | null
}

// ----- Player Types -----

export type PlayerId =
  | 'player-1'
  | 'player-2'
  | 'player-3'
  | 'player-4'
  | 'player-5'

export interface Player {
  id: PlayerId
  name: string
  pawns: Pawn[]
  score: number
}

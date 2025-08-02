import { PAWN_COLORS, PAWNS } from '@/constants/pawns'
import type { DominoId } from './domino.types'

// ----- Pawn Types -----

export type PawnId = (typeof PAWNS)[number]['id']
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
  isDraggable: boolean
  playerId?: PlayerId
  selectedDominoId?: DominoId
  position?: PawnPosition
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
  pawnIds: PawnId[]
  score: number
}

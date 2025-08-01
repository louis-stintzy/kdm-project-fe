import type {
  Pawn,
  PawnColorName,
  PawnId,
  Player,
  PlayerId,
} from '@/types/player.types'
import type { StateCreator } from 'zustand'

export interface PlayerState {
  dialogOpen: boolean
  playersForm: {
    player1: {
      name: string
      color: PawnColorName | ''
    }
    player2: {
      name: string
      color: PawnColorName | ''
    }
  }
  players: Player[]
  pawns: Pawn[]
  currentPlayerId: PlayerId | null
  currentPawnOrder: (PawnId | null)[]
  nextPawnOrder: (PawnId | null)[]
}

export interface PlayerActions {
  toggleDialog: () => void
  setPlayersForm: (
    player: 'player1' | 'player2',
    field: 'name' | 'color',
    value: string,
  ) => void
  resetPlayersForm: () => void
  addPlayer: (player: Player) => void
  addPawns: (pawns: Pawn[]) => void
  removePlayer: (playerId: PlayerId) => void
  shufflePawns: () => void
  placePawn: (
    pawnId: PawnId,
    dominoList: 'currentDominos' | 'nextDominos',
    listPosition: keyof PlayerState['currentPawnOrder'],
  ) => void
  resetPlayerState: () => void
}
export interface PlayerSlice extends PlayerState, PlayerActions {}

// Use Fisher-Yates shuffle algorithm to shuffle the pawns array
const shufflePawns = (pawns: Pawn[]): Pawn[] => {
  const shuffledArray = [...pawns]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]] // Swap elements at i and j, ";" is used to avoid automatic semicolon insertion issues
  }
  return shuffledArray
}

export const initialPlayerState: PlayerState = {
  dialogOpen: false,
  playersForm: {
    player1: { name: 'Clover', color: '' },
    player2: { name: 'Sam', color: '' },
  },
  players: [],
  pawns: [],
  currentPlayerId: null,
  currentPawnOrder: Array.from({ length: 5 }, () => null),
  nextPawnOrder: Array.from({ length: 5 }, () => null),
}

export const createPlayerSlice: StateCreator<PlayerSlice> = (set) => ({
  ...initialPlayerState,
  toggleDialog: () => set((state) => ({ dialogOpen: !state.dialogOpen })),
  setPlayersForm: (player, field, value) =>
    set((state) => ({
      playersForm: {
        ...state.playersForm,
        [player]: { ...state.playersForm[player], [field]: value },
      },
    })),
  resetPlayersForm: () =>
    set(() => ({
      playersForm: initialPlayerState.playersForm,
    })),
  addPlayer: (player) =>
    set((state) => ({ players: [...state.players, player] })),
  addPawns: (pawns) => set((state) => ({ pawns: [...state.pawns, ...pawns] })),
  removePlayer: (playerId) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    })),
  shufflePawns: () => set((state) => ({ pawns: shufflePawns(state.pawns) })),
  placePawn: (pawnId, dominoList, listPosition) =>
    set((state) => {
      const targetList =
        dominoList === 'currentDominos'
          ? state.currentPawnOrder
          : state.nextPawnOrder
      const updatedList = {
        ...targetList,
        [listPosition]: pawnId,
      }
      return dominoList === 'currentDominos'
        ? { currentPawnOrder: updatedList }
        : { nextPawnOrder: updatedList }
    }),
  resetPlayerState: () => set(() => initialPlayerState),
})

import { CELL_SIZE } from '@/constants/board'
import {
  DOMINO_SPACING,
  STARTING_X_POSITION_CURRENT_DOMINOS,
  STARTING_X_POSITION_NEXT_DOMINOS,
  STARTING_X_POSITION_PAWNS,
} from '@/constants/drawInterface'
import type { Domino } from '@/types/domino.types'
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
  shuffledPawnOrder: PawnId[]
  currentPlayer: Player | null
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
  pawnCanTakePosition: (
    pawnOrderList: 'shuffledPawnOrder' | 'currentPawnOrder',
  ) => void
  updatePawnPosition: (
    pawnId: PawnId,
    newPosition: { x: number; y: number },
  ) => void
  pawnTakesPositionOnDomino: (
    pawnId: PawnId,
    onDomino: boolean,
    domino?: Domino,
  ) => void
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
  shuffledPawnOrder: [],
  currentPlayer: null,
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
  shufflePawns: () =>
    set((state) => {
      const shuffledPawns = shufflePawns(state.pawns)
      return {
        pawns: shuffledPawns.map((pawn, index) => ({
          ...pawn,
          position: {
            x: STARTING_X_POSITION_PAWNS,
            y: Math.ceil(CELL_SIZE / 2 + index * DOMINO_SPACING),
          },
        })),
        shuffledPawnOrder: shuffledPawns.map((pawn) => pawn.id),
      }
    }),
  pawnCanTakePosition: (pawnOrderList) =>
    set((state) => {
      const targetPawnOrder =
        pawnOrderList === 'shuffledPawnOrder'
          ? state.shuffledPawnOrder
          : state.currentPawnOrder
      const targetPawnId = targetPawnOrder[0]
      const targetPawn = state.pawns.find((pawn) => pawn.id === targetPawnId)
      if (!targetPawn) {
        console.error('Pawn not found:', targetPawnId)
        return state
      }
      const targetPlayer = state.players.find(
        (player) => player.id === targetPawn.playerId,
      )
      if (!targetPlayer) {
        console.error('Player not found for pawn:', targetPawnId)
        return state
      }
      const updatedTargetPawn = {
        ...targetPawn,
        isDraggable: true,
        currentPawn: true,
      }
      const updatedPawnOrder = targetPawnOrder.filter(
        (id) => id !== targetPawnId,
      )
      return {
        ...state,
        [pawnOrderList]: updatedPawnOrder,
        pawns: state.pawns.map((pawn) =>
          pawn.id === targetPawnId ? updatedTargetPawn : pawn,
        ),
        currentPlayer: targetPlayer,
      }
    }),
  updatePawnPosition: (pawnId, newPosition) =>
    set((state) => ({
      pawns: state.pawns.map((pawn) =>
        pawn.id === pawnId ? { ...pawn, position: newPosition } : pawn,
      ),
    })),
  pawnTakesPositionOnDomino: (pawnId, onDomino, domino?) =>
    set((state) => {
      const targetPawn = state.pawns.find((pawn) => pawn.id === pawnId)
      if (!targetPawn) {
        console.error('Pawn not found:', pawnId)
        return state
      }
      const updatedPawn = {
        ...targetPawn,
        selectedDomino: {
          confirmed: false,
          domino: onDomino ? domino : undefined,
        },
      }
      return {
        pawns: state.pawns.map((pawn) =>
          pawn.id === pawnId ? updatedPawn : pawn,
        ),
      }
    }),
  placePawn: (pawnId, dominoList, listPosition) =>
    set((state) => {
      const targetList =
        dominoList === 'currentDominos'
          ? state.currentPawnOrder
          : state.nextPawnOrder
      const pawnOrderList2 =
        dominoList === 'currentDominos' ? 'currentPawnOrder' : 'nextPawnOrder'
      const updatedList = {
        ...targetList,
        [listPosition]: pawnId,
      }
      const targetPawn = state.pawns.find((pawn) => pawn.id === pawnId)
      if (!targetPawn) {
        console.error('Pawn not found:', pawnId)
        return state
      }
      const updatedPawn = {
        ...targetPawn,
        currentPawn: false,
        isDraggable: false,
        selectedDomino: {
          confirmed: true,
          domino: targetPawn.selectedDomino?.domino,
        },
        position: {
          x:
            dominoList === 'currentDominos'
              ? STARTING_X_POSITION_CURRENT_DOMINOS + CELL_SIZE
              : STARTING_X_POSITION_NEXT_DOMINOS + CELL_SIZE,
          y: Math.ceil(
            CELL_SIZE / 2 + DOMINO_SPACING * (listPosition as number),
          ),
        },
      }
      const targetPawnOrder =
        dominoList === 'currentDominos'
          ? state.shuffledPawnOrder
          : state.currentPawnOrder
      // ----- If there are no pawns left to place, move on to the domino placement phase -----
      if (targetPawnOrder.length === 0) {
        console.log('No pawns left to place')
        return {
          pawns: state.pawns.map((pawn) =>
            pawn.id === pawnId ? updatedPawn : pawn,
          ),
          currentPlayer: null,
          [pawnOrderList2]: updatedList,
        }
      }
      const nextTargetPawnId = targetPawnOrder[0]
      const nextTargetPawn = state.pawns.find(
        (pawn) => pawn.id === nextTargetPawnId,
      )
      if (!nextTargetPawn) {
        console.error('Pawn not found:', nextTargetPawnId)
        return state
      }
      const nextTargetPlayer = state.players.find(
        (player) => player.id === nextTargetPawn.playerId,
      )
      if (!nextTargetPlayer) {
        console.error('Player not found for pawn:', nextTargetPawnId)
        return state
      }
      const updatedNextTargetPawn = {
        ...nextTargetPawn,
        isDraggable: true,
        currentPawn: true,
      }
      const updatedPawnOrder = targetPawnOrder.filter(
        (id) => id !== nextTargetPawnId,
      )
      const pawnOrderList1 =
        dominoList === 'currentDominos'
          ? 'shuffledPawnOrder'
          : 'currentPawnOrder'

      return {
        pawns: state.pawns
          .map((pawn) => (pawn.id === pawnId ? updatedPawn : pawn))
          .map((pawn) =>
            pawn.id === nextTargetPawnId ? updatedNextTargetPawn : pawn,
          ),
        [pawnOrderList1]: updatedPawnOrder,
        [pawnOrderList2]: updatedList,
        currentPlayer: nextTargetPlayer,
      }
    }),
  resetPlayerState: () => set(() => initialPlayerState),
})

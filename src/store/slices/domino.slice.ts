import { DOMINOS } from '@/constants/dominos'
import type { Domino } from '@/types/domino.types'
import type { StateCreator } from 'zustand'

const DOMINOS_COUNT = DOMINOS.length // Total number of dominos
const NUMBER_OF_DRAWNS = 5 // Number of dominos drawn per turn
const MAX_TURNS = Math.ceil(DOMINOS_COUNT / NUMBER_OF_DRAWNS)
const MIDDLE_INDEX = 2 // The index of the domino to be discarded, which is the middle one in a 5-element array

export interface DominoState {
  stackDominos: Domino[]
  currentDominos: Domino[]
  nextDominos: Domino[]
  discardedDominos: Domino[]
  turn: number
}

export interface DominoActions {
  initDominos: () => void
  drawDominos: (turn: number) => void
  discardDomino: (turn: number, playersNumber: number) => void
  removeFromCurrent: (domino: Domino) => void
  advanceTurn: () => void
  resetState: () => void
}

export interface DominoSlice extends DominoState, DominoActions {}

// Use Fisher-Yates shuffle algorithm to shuffle the dominos array
const shuffleDominos = (dominos: Domino[]): Domino[] => {
  const shuffledArray = [...dominos]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]] // Swap elements at i and j, ";" is used to avoid automatic semicolon insertion issues
  }
  return shuffledArray
}

// Draw and sort the 5 dominos
const drawAndSortDominos = (dominos: Domino[]): Domino[] => {
  return dominos.slice(0, 5).sort((a, b) => a.order - b.order)
}

export const initialDominoState: DominoState = {
  stackDominos: [],
  currentDominos: [],
  nextDominos: [],
  discardedDominos: [],
  turn: 0,
}

export const createDominoSlice: StateCreator<DominoSlice> = (set) => ({
  ...initialDominoState,

  initDominos: () => {
    set(() => ({
      stackDominos: shuffleDominos([...DOMINOS]),
      currentDominos: [],
      nextDominos: [],
      discardedDominos: [],
      turn: 1,
    }))
  },

  drawDominos: (turn) => {
    set((state) => {
      const drawnDominos = drawAndSortDominos(state.stackDominos)
      const updatedStack = state.stackDominos.slice(NUMBER_OF_DRAWNS)
      return {
        stackDominos: updatedStack,
        currentDominos: turn === 1 ? drawnDominos : state.currentDominos,
        nextDominos: turn === 1 ? [] : drawnDominos,
      }
    })
  },

  discardDomino: (turn, playersNumber) => {
    set((state) => {
      if (playersNumber !== 2 && playersNumber !== 4) {
        console.error('Invalid number of players for discard action')
        return state
      }

      const targetDominos =
        turn === 1 ? state.currentDominos : state.nextDominos
      const discardedDomino = targetDominos[MIDDLE_INDEX]
      const remainingDominos = targetDominos.filter(
        (_, i) => i !== MIDDLE_INDEX,
      )

      return {
        discardedDominos: [...state.discardedDominos, discardedDomino],
        currentDominos: turn === 1 ? remainingDominos : state.currentDominos,
        nextDominos: turn === 1 ? [] : remainingDominos,
      }
    })
  },

  removeFromCurrent: (domino) => {
    set((state) => ({
      currentDominos: state.currentDominos.filter((d) => d.id !== domino.id),
    }))
  },

  advanceTurn: () => {
    set((state) => {
      if (state.turn >= MAX_TURNS) {
        console.error('Maximum number of turns reached')
        return state
      }
      return {
        currentDominos: state.nextDominos,
        nextDominos: [],
        turn: state.turn + 1,
      }
    })
  },

  resetState: () => set(initialDominoState),
})

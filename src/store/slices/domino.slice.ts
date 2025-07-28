import { DOMINOS } from '@/constants/dominos'
import type { Domino } from '@/types/domino.types'
import type { StateCreator } from 'zustand'

export interface DominoState {
  stackDominos: Domino[]
  currentDominos: Domino[]
  nextDominos: Domino[]
  discardedDominos: Domino[]
}

export interface DominoActions {
  initDominoState: () => void
  //   setCurrentDominos: (dominos: Domino[]) => void
  //   setNextDominos: (dominos: Domino[]) => void
  //   addToDiscarded: (domino: Domino) => void
  //   removeFromCurrent: (domino: Domino) => void
  //   removeFromStack: (dominos: Domino[]) => void
  //   removeFromNext: (dominos: Domino[]) => void
}

export interface DominoSlice extends DominoState, DominoActions {}

// Use Fisher-Yates shuffle algorithm to shuffle the dominos array
const shuffleDominos = (dominos: Domino[]) => {
  const shuffledArray = [...dominos]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Random index from 0 to i
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]] // Swap elements at i and j, ";" is used to avoid automatic semicolon insertion issues
  }
  return shuffledArray
}

export const initialDominoState: DominoState = {
  stackDominos: shuffleDominos([...DOMINOS]),
  currentDominos: [],
  nextDominos: [],
  discardedDominos: [],
}

export const createDominoSlice: StateCreator<DominoSlice> = (set) => ({
  ...initialDominoState,

  initDominoState: () => set(initialDominoState),

  //   setCurrentDominos: (dominos) => set({ currentDominos: dominos }),
  //   setNextDominos: (dominos) => set({ nextDominos: dominos }),

  //   addToDiscarded: (domino) =>
  //     set((state) => ({
  //       discardedDominos: [...state.discardedDominos, domino],
  //     })),

  //   removeFromCurrent: (domino) =>
  //     set((state) => ({
  //       currentDominos: state.currentDominos.filter((d) => d.id !== domino.id),
  //     })),

  //   removeFromStack: (dominos) =>
  //     set((state) => ({
  //       stackDominos: state.stackDominos.filter(
  //         (d) => !dominos.some((d2) => d2.id === d.id),
  //       ),
  //     })),

  //   removeFromNext: (dominos) =>
  //     set((state) => ({
  //       nextDominos: state.nextDominos.filter(
  //         (d) => !dominos.some((d2) => d2.id === d.id),
  //       ),
  //     })),
})

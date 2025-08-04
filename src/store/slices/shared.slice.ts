import type { StateCreator } from 'zustand'
import type { DominoSlice } from './domino.slice'
import type { PlayerSlice } from './player.slice'

interface SharedSlice {
  dominoCanTakePosition: () => void
}

export const createSharedSlice: StateCreator<
  // Typer StateCreator dans DominoSlice & PlayerSlice, voir https://zustand.docs.pmnd.rs/guides/typescript
  DominoSlice & PlayerSlice,
  [], // devtools middleware ?
  [],
  [SharedSlice]
> = (set, get) => ({
  dominoCanTakePosition: () =>
    console.log('Domino can take position action triggered'),
})

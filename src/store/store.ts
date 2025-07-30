import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createDominoSlice, type DominoSlice } from './slices/domino.slice'
import { createPlayerSlice, type PlayerSlice } from './slices/player.slice'

type StoreState = DominoSlice & PlayerSlice

export const useGameStore = create<StoreState>()(
  devtools(
    (...a) => ({
      ...createDominoSlice(...a),
      ...createPlayerSlice(...a),
    }),
    { name: 'appStore' },
  ),
)

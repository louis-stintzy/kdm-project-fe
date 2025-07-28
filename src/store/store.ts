import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createDominoSlice, type DominoSlice } from './slices/domino.slice'

type StoreState = DominoSlice

export const useBoundStore = create<StoreState>()(
  devtools(
    (...a) => ({
      ...createDominoSlice(...a),
    }),
    { name: 'appStore' },
  ),
)

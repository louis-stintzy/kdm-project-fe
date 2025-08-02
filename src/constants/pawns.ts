export const PAWNS_SIZE = 16

export const PAWN_COLORS = {
  yellow: '#F7E03D',
  blue: '#0053BA',
  green: '#059C18',
  pink: '#F73D8F',
  brown: '#5E3400',
} as const

export const PAWNS = [
  {
    id: 'yellow-1',
    color: { name: 'yellow', hex: PAWN_COLORS.yellow },
  },
  {
    id: 'yellow-2',
    color: { name: 'yellow', hex: PAWN_COLORS.yellow },
  },
  {
    id: 'blue-1',
    color: { name: 'blue', hex: PAWN_COLORS.blue },
  },
  {
    id: 'blue-2',
    color: { name: 'blue', hex: PAWN_COLORS.blue },
  },
  {
    id: 'green-1',
    color: { name: 'green', hex: PAWN_COLORS.green },
  },
  {
    id: 'green-2',
    color: { name: 'green', hex: PAWN_COLORS.green },
  },
  {
    id: 'pink-1',
    color: { name: 'pink', hex: PAWN_COLORS.pink },
  },
  {
    id: 'pink-2',
    color: { name: 'pink', hex: PAWN_COLORS.pink },
  },
  {
    id: 'brown-1',
    color: { name: 'brown', hex: PAWN_COLORS.brown },
  },
  {
    id: 'brown-2',
    color: { name: 'brown', hex: PAWN_COLORS.brown },
  },
] as const

import { useGameStore } from '@/store/store'

export const usePlayer = () => {
  const players = useGameStore((state) => state.players)
  const pawns = useGameStore((state) => state.pawns)
  const currentPlayerId = useGameStore((state) => state.currentPlayerId)
  const currentPawnOrder = useGameStore((state) => state.currentPawnOrder)
  const nextPawnOrder = useGameStore((state) => state.nextPawnOrder)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const removePlayer = useGameStore((state) => state.removePlayer)
  const shufflePawns = useGameStore((state) => state.shufflePawns)
  const placePawn = useGameStore((state) => state.placePawn)
  const resetPlayerState = useGameStore((state) => state.resetPlayerState)

  return {
    players,
    pawns,
    currentPlayerId,
    currentPawnOrder,
    nextPawnOrder,
    addPlayer,
    removePlayer,
    shufflePawns,
    placePawn,
    resetPlayerState,
  }
}

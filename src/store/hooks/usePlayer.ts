import { useGameStore } from '@/store/store'

export const usePlayer = () => {
  const dialogOpen = useGameStore((state) => state.dialogOpen)
  const playersForm = useGameStore((state) => state.playersForm)
  const players = useGameStore((state) => state.players)
  const pawns = useGameStore((state) => state.pawns)
  const mixedPawns = useGameStore((state) => state.mixedPawns)
  const currentPlayerId = useGameStore((state) => state.currentPlayerId)
  const currentPawnOrder = useGameStore((state) => state.currentPawnOrder)
  const nextPawnOrder = useGameStore((state) => state.nextPawnOrder)
  const toggleDialog = useGameStore((state) => state.toggleDialog)
  const setPlayersForm = useGameStore((state) => state.setPlayersForm)
  const resetPlayersForm = useGameStore((state) => state.resetPlayersForm)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const addPawns = useGameStore((state) => state.addPawns)
  const removePlayer = useGameStore((state) => state.removePlayer)
  const shufflePawns = useGameStore((state) => state.shufflePawns)
  const placePawn = useGameStore((state) => state.placePawn)
  const resetPlayerState = useGameStore((state) => state.resetPlayerState)

  return {
    dialogOpen,
    playersForm,
    players,
    pawns,
    mixedPawns,
    currentPlayerId,
    currentPawnOrder,
    nextPawnOrder,
    toggleDialog,
    setPlayersForm,
    resetPlayersForm,
    addPlayer,
    addPawns,
    removePlayer,
    shufflePawns,
    placePawn,
    resetPlayerState,
  }
}

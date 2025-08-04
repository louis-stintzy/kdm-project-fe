import { useGameStore } from '@/store/store'

export const usePlayer = () => {
  const dialogOpen = useGameStore((state) => state.dialogOpen)
  const playersForm = useGameStore((state) => state.playersForm)
  const players = useGameStore((state) => state.players)
  const pawns = useGameStore((state) => state.pawns)
  const shuffledPawnOrder = useGameStore((state) => state.shuffledPawnOrder)
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const currentPawnOrder = useGameStore((state) => state.currentPawnOrder)
  const nextPawnOrder = useGameStore((state) => state.nextPawnOrder)
  const toggleDialog = useGameStore((state) => state.toggleDialog)
  const setPlayersForm = useGameStore((state) => state.setPlayersForm)
  const resetPlayersForm = useGameStore((state) => state.resetPlayersForm)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const addPawns = useGameStore((state) => state.addPawns)
  const removePlayer = useGameStore((state) => state.removePlayer)
  const shufflePawns = useGameStore((state) => state.shufflePawns)
  const pawnCanTakePosition = useGameStore((state) => state.pawnCanTakePosition)
  const updatePawnPosition = useGameStore((state) => state.updatePawnPosition)
  const pawnTakesPositionOnDomino = useGameStore(
    (state) => state.pawnTakesPositionOnDomino,
  )
  const placePawn = useGameStore((state) => state.placePawn)
  const dominoCanTakePosition = useGameStore(
    (state) => state.dominoCanTakePosition,
  )
  const resetPlayerState = useGameStore((state) => state.resetPlayerState)

  return {
    dialogOpen,
    playersForm,
    players,
    pawns,
    shuffledPawnOrder,
    currentPlayer,
    currentPawnOrder,
    nextPawnOrder,
    toggleDialog,
    setPlayersForm,
    resetPlayersForm,
    addPlayer,
    addPawns,
    removePlayer,
    shufflePawns,
    pawnCanTakePosition,
    updatePawnPosition,
    pawnTakesPositionOnDomino,
    placePawn,
    dominoCanTakePosition,
    resetPlayerState,
  }
}

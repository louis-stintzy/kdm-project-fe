import { useGameStore } from '@/store/store'

export const useDomino = () => {
  const stackDominos = useGameStore((state) => state.stackDominos)
  const currentDominos = useGameStore((state) => state.currentDominos)
  const nextDominos = useGameStore((state) => state.nextDominos)
  const discardedDominos = useGameStore((state) => state.discardedDominos)
  const turn = useGameStore((state) => state.turn)
  const playPhase = useGameStore((state) => state.playPhase)
  const initDominos = useGameStore((state) => state.initDominos)
  const drawDominos = useGameStore((state) => state.drawDominos)
  const discardDomino = useGameStore((state) => state.discardDomino)
  const removeFromCurrent = useGameStore((state) => state.removeFromCurrent)
  const advanceTurn = useGameStore((state) => state.advanceTurn)
  const resetDominoState = useGameStore((state) => state.resetDominoState)

  return {
    stackDominos,
    currentDominos,
    nextDominos,
    discardedDominos,
    turn,
    playPhase,
    initDominos,
    drawDominos,
    discardDomino,
    removeFromCurrent,
    advanceTurn,
    resetDominoState,
  }
}

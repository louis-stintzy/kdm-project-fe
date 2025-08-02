import { useDomino } from '@/store/hooks/useDomino'
import {
  Dices,
  Hand,
  Play,
  RotateCcw,
  SkipForward,
  Trash2,
  UsersRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlayer } from '@/store/hooks/usePlayer'

function ControlePanel() {
  const {
    players,
    pawns,
    shuffledPawnOrder,
    currentPawnOrder,
    toggleDialog,
    shufflePawns,
    canTakePosition,
    resetPlayerState,
  } = usePlayer()
  const {
    currentDominos,
    nextDominos,
    turn,
    playPhase,
    initDominos,
    drawDominos,
    discardDomino,
    advanceTurn,
    resetDominoState,
  } = useDomino()

  const handleNewGame = () => {
    toggleDialog()
  }

  const handleShufflePawns = () => {
    if (shuffledPawnOrder.length !== 0) return
    shufflePawns()
  }

  const handleInitAndDraw = () => {
    initDominos()
    drawDominos(1)
  }

  const handleDiscardMiddle = () => {
    discardDomino(turn, 2) // 2 joueurs
  }

  const handleSelectDomino = () => {
    if (turn === 1 && shuffledPawnOrder.length) {
      canTakePosition('shuffledPawnOrder')
      return
    }
    if (currentPawnOrder.length) {
      canTakePosition('currentPawnOrder')
      return
    }
    console.error('No pawns available to select a domino')
  }

  const handleAdvanceTurn = () => {
    advanceTurn()
  }

  const handleDrawDominos = () => {
    drawDominos(turn)
  }

  const handleReset = () => {
    resetDominoState()
    resetPlayerState()
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleNewGame}
          disabled={players.length > 1}
          className="flex items-center gap-2"
        >
          <UsersRound className="w-4 h-4" />
          Nouvelle Partie
        </Button>
        <Button
          onClick={handleShufflePawns}
          disabled={
            turn !== 0 || players.length < 2 || shuffledPawnOrder.length !== 0
          }
          className="flex items-center gap-2"
        >
          <Dices className="w-4 h-4" />
          Mélanger les pions
        </Button>
        <Button
          onClick={handleInitAndDraw}
          disabled={
            turn !== 0 || players.length < 2 || !shuffledPawnOrder.length
          }
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Initialiser & Tirer
        </Button>

        <Button
          onClick={handleDiscardMiddle}
          variant="destructive"
          disabled={
            turn === 1 ? currentDominos.length !== 5 : nextDominos.length !== 5
          }
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Éliminer le milieu
        </Button>

        <Button
          onClick={handleSelectDomino}
          disabled={
            players.length < 2 ||
            playPhase !== 'draft' ||
            pawns.some((pawn) => pawn.isDraggable) ||
            !shuffledPawnOrder.length
          }
          className="flex items-center gap-2"
        >
          <Hand className="w-4 h-4" />
          Choisir un domino
        </Button>

        <Button
          onClick={handleAdvanceTurn}
          disabled={playPhase !== 'placement'}
          className="flex items-center gap-2"
        >
          <SkipForward className="w-4 h-4" />
          Tour suivant
        </Button>

        <Button
          onClick={handleDrawDominos}
          disabled={playPhase !== 'placement'}
          className="flex items-center gap-2"
        >
          <Dices className="w-4 h-4" />
          Tirer
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}

export default ControlePanel

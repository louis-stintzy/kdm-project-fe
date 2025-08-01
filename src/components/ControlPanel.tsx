import { useDomino } from '@/store/hooks/useDomino'
import {
  Dices,
  Play,
  RotateCcw,
  SkipForward,
  Trash2,
  UsersRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePlayer } from '@/store/hooks/usePlayer'

function ControlePanel() {
  const { players, toggleDialog, resetPlayerState } = usePlayer()
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
  const handleInitAndDraw = () => {
    initDominos()
    drawDominos(1)
  }

  const handleDiscardMiddle = () => {
    discardDomino(turn, 2) // 2 joueurs
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
        onClick={handleInitAndDraw}
        disabled={turn !== 0 || players.length < 2}
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
  )
}

export default ControlePanel

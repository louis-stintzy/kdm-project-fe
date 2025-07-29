import { useDomino } from '@/store/hooks/useDomino'
import { Play, RotateCcw, SkipForward, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function ControlePanel() {
  const {
    currentDominos,
    nextDominos,
    turn,
    initDominos,
    drawDominos,
    discardDomino,
    removeFromCurrent,
    advanceTurn,
    resetDominoState,
  } = useDomino()

  const handleInitAndDraw = () => {
    initDominos()
    drawDominos(1)
  }

  const handleDiscardMiddle = () => {
    discardDomino(turn, 2) // 2 joueurs
  }

  const handleAdvanceTurn = () => {
    if (nextDominos.length === 0) {
      drawDominos(turn + 1)
    }
    advanceTurn()
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={handleInitAndDraw}
        disabled={turn !== 0}
        className="flex items-center gap-2"
      >
        <Play className="w-4 h-4" />
        Initialiser & Tirer
      </Button>

      <Button
        onClick={handleDiscardMiddle}
        variant="destructive"
        // disabled={currentDominos.length !== 5}
        className="flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Éliminer le milieu
      </Button>

      <Button
        onClick={handleAdvanceTurn}
        // disabled={currentDominos.length === 0}
        className="flex items-center gap-2"
      >
        <SkipForward className="w-4 h-4" />
        Tour suivant
      </Button>

      <Button
        onClick={resetDominoState}
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

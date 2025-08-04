import { usePlayer } from '@/store/hooks/usePlayer'
import { useDomino } from '@/store/hooks/useDomino'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import {
  Check,
  Gamepad2,
  MessageCircle,
  MessageCircleQuestionMark,
} from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

function PlayerTurnCard() {
  const { turn, playPhase, currentDominos } = useDomino()
  const { pawns, currentPlayer, placePawn } = usePlayer()
  const playerName = currentPlayer ? currentPlayer.name : 'No Player'
  const currentPawn = pawns.find((pawn) => pawn.currentPawn === true)
  const pawnColor = currentPawn ? currentPawn.color.hex : '#cccccc'

  const getMessage = (requestConfirmation: boolean) => {
    if (playPhase === 'draft') {
      return requestConfirmation
        ? 'Confirmer la sélection du domino ?'
        : 'Sélection du domino.'
    }
    if (playPhase === 'placement') {
      return requestConfirmation
        ? 'Confirmer le placement du domino ?'
        : 'Placement du domino.'
    }
    return 'No action available.'
  }

  const handleConfirmAction = () => {
    if (playPhase === 'draft') {
      // Logique pour confirmer la sélection du domino
      console.log('Confirming draft phase action')
      if (turn === 1 && currentPawn?.selectedDomino?.domino) {
        const selectedDomino = currentPawn.selectedDomino.domino
        const selectedDominoPosition = currentDominos.findIndex(
          (domino) => domino.id === selectedDomino.id,
        )
        placePawn(currentPawn.id, 'currentDominos', selectedDominoPosition)
      }
    } else if (playPhase === 'placement') {
      // Logique pour confirmer le placement du domino
      console.log('Confirming placement phase action')
    }
  }

  return (
    <Card
      className="w-full max-w-lg mx-auto shadow-lg border-2 transition-all duration-200"
      style={{
        borderColor: pawnColor,
        backgroundColor: `${pawnColor}10`,
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: pawnColor }}
            />
            <CardTitle className="text-lg font-semibold">
              {playerName}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Gamepad2 className="w-3 h-3" />
            Tour {turn}
          </Badge>
        </div>
        {currentPawn?.selectedDomino?.domino &&
        currentPawn?.selectedDomino?.confirmed === false ? (
          <CardDescription className="flex items-center gap-2 text-base font-medium leading-9">
            <MessageCircleQuestionMark className="w-4 h-4" />
            {getMessage(true)}
            <Button
              onClick={handleConfirmAction}
              variant={'secondary'}
              className="flex items-center gap-2 rounded-full hover:cursor-pointer hover:border-1 hover:border-white"
              size={'sm'}
              style={{
                color: pawnColor,
                borderColor: `${pawnColor}75`,
              }}
            >
              <Check className="w-4 h-4" />
              Confirmer
            </Button>
          </CardDescription>
        ) : (
          <CardDescription className="flex items-center gap-2 text-base font-medium leading-9">
            <MessageCircle className="w-4 h-4" />
            {getMessage(false)}
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  )
}

export default PlayerTurnCard

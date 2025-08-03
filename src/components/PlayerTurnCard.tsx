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
  const { turn, playPhase } = useDomino()
  const { pawns, currentPlayer } = usePlayer()
  const playerName = currentPlayer ? currentPlayer.name : 'No Player'
  const currentPawn = pawns.find((pawn) => pawn.currentPawn === true)
  const pawnColor = currentPawn ? currentPawn.color.hex : '#ccc'

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
    } else if (playPhase === 'placement') {
      // Logique pour confirmer le placement du domino
      console.log('Confirming placement phase action')
    }
  }

  //   const canConfirm = () => {
  //     if (!currentPlayer) return false
  //     if (playPhase === 'draft') {
  //       // Vérifier si un pion est sélectionné/déplaçable
  //       return pawns.some(
  //         (pawn) => pawn.isDraggable && pawn.playerId === currentPlayer.id,
  //       )
  //     }
  //     if (playPhase === 'placement') {
  //       // Logique pour vérifier si un domino est placé (à adapter selon votre logique)
  //       return true // À adapter selon votre implémentation
  //     }
  //     return false
  //   }

  return (
    <Card
      className="w-full max-w-lg mx-auto shadow-lg border-2 transition-all duration-200"
      style={{
        borderColor: pawnColor,
        backgroundColor: `${pawnColor}10`, // couleur de fond très légère
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
              variant={'ghost'}
              //   disabled={!canConfirm()}
              className="flex items-center gap-2 hover:cursor-pointer"
              //   size={'sm'}
              style={{
                color: pawnColor,
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

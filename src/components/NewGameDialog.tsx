import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { usePlayer } from '@/store/hooks/usePlayer'
import { useState } from 'react'
import type { PawnColorName, Player } from '@/types/player.types'
import { PAWNS } from '@/constants/pawns'

function NewGameDialog() {
  const initiallyAvailableColors: PawnColorName[] = [
    'yellow',
    'blue',
    'green',
    'pink',
    'brown',
  ]
  const [availableColors, setAvailableColors] = useState({
    player1: initiallyAvailableColors,
    player2: initiallyAvailableColors,
  })
  const {
    dialogOpen,
    playersForm,
    toggleDialog,
    setPlayersForm,
    resetPlayersForm,
    addPlayer,
  } = usePlayer()

  const handleColorSelect = (
    player: 'player1' | 'player2',
    value: PawnColorName,
  ) => {
    setPlayersForm(player, 'color', value)
    setAvailableColors((prev) => ({
      ...prev,
      [player]: availableColors[player],
      [player === 'player1' ? 'player2' : 'player1']:
        initiallyAvailableColors.filter(
          (color: PawnColorName) => color !== value,
        ),
    }))
  }

  const handleSubmit = () => {
    if (!playersForm.player1.name && !playersForm.player2.name) {
      console.error('Players must have names')
      return
    }
    if (!playersForm.player1.color || !playersForm.player2.color) {
      console.error('Players must select a color')
      return
    }
    if (playersForm.player1.color === playersForm.player2.color) {
      console.error('Players must have different colors')
      return
    }

    const player1: Player = {
      id: 'player-1',
      name: playersForm.player1.name,
      pawns: PAWNS.filter(
        (pawn) => pawn.color.name === playersForm.player1.color,
      ).map((pawn) => ({
        ...pawn,
        playerId: 'player-1',
      })),
      score: 0,
    }

    addPlayer(player1)

    const player2: Player = {
      id: 'player-2',
      name: playersForm.player2.name,
      pawns: PAWNS.filter(
        (pawn) => pawn.color.name === playersForm.player2.color,
      ).map((pawn) => ({
        ...pawn,
        playerId: 'player-2',
      })),
      score: 0,
    }

    addPlayer(player2)

    resetPlayersForm()
    setAvailableColors({
      player1: initiallyAvailableColors,
      player2: initiallyAvailableColors,
    })

    toggleDialog()
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialog}>
      {/* <form onSubmit={handleSubmit}> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle partie</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Entrez les noms et choisissez les couleurs des pions des joueurs pour
          commencer une nouvelle partie.
        </DialogDescription>

        <div className="grid gap-4">
          {/* ----- JOUEUR 1 ----- */}
          <div className="grid gap-3">
            <Label htmlFor="name-1">Joueur 1</Label>
            <Input
              id="name-1"
              name="name-1"
              value={playersForm.player1.name}
              onChange={(e) =>
                setPlayersForm('player1', 'name', e.target.value)
              }
            />
            <Select
              value={playersForm.player1.color}
              onValueChange={(value: PawnColorName) => {
                handleColorSelect('player1', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Couleur des pions" />
              </SelectTrigger>
              <SelectContent>
                {availableColors.player1.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ----- JOUEUR 2 ----- */}
          <div className="grid gap-3">
            <Label htmlFor={`name-2`}>Joueur 2</Label>
            <Input
              id={`name-2`}
              name="name-2"
              value={playersForm.player2.name}
              onChange={(e) =>
                setPlayersForm('player2', 'name', e.target.value)
              }
            />
            <Select
              value={playersForm.player2.color}
              onValueChange={(value: PawnColorName) => {
                handleColorSelect('player2', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Couleur des pions" />
              </SelectTrigger>
              <SelectContent>
                {availableColors.player2.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            disabled={
              availableColors.player1.length === 5 ||
              availableColors.player2.length === 5
            }
            type="button"
            onClick={handleSubmit}
          >
            Jouer
          </Button>
        </DialogFooter>
      </DialogContent>
      {/* </form> */}
    </Dialog>
  )
}

export default NewGameDialog

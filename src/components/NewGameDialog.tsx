import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //   DialogTrigger,
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

function NewGameDialog() {
  const initiallyAvailableColors = ['yellow', 'blue', 'green', 'pink', 'brown']
  const [availableColors, setAvailableColors] = useState({
    player1: initiallyAvailableColors,
    player2: initiallyAvailableColors,
  })
  const { dialogOpen, toggleDialog } = usePlayer()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={toggleDialog}>
      <form onSubmit={handleSubmit}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouvelle partie</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Entrez les noms et couleurs des joueurs pour commencer une nouvelle
            partie.
          </DialogDescription>
          <div className="grid gap-4">
            {/* JOUEUR 1 */}
            <div className="grid gap-3">
              <Label htmlFor={`name-1`}>Joueur 1</Label>
              <Input id={`name-1}`} name="name" defaultValue={`Clover`} />
              <Select
                name="color"
                onValueChange={(value) => {
                  setAvailableColors((prev) => ({
                    ...prev,
                    player1: initiallyAvailableColors,
                    player2: initiallyAvailableColors.filter(
                      (color) => color !== value,
                    ),
                  }))
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

            {/* JOUEUR 2 */}
            <div className="grid gap-3">
              <Label htmlFor={`name-2`}>Joueur 2</Label>
              <Input id={`name-2`} name="name" defaultValue={`Sam`} />
              <Select
                name="color"
                onValueChange={(value) => {
                  setAvailableColors((prev) => ({
                    ...prev,
                    player1: initiallyAvailableColors.filter(
                      (color) => color !== value,
                    ),
                    player2: initiallyAvailableColors,
                  }))
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
            <Button type="submit">Jouer</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default NewGameDialog

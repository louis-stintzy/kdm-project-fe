import { useDomino } from '@/store/hooks/useDomino'
import { usePlayer } from '@/store/hooks/usePlayer'

function Information() {
  const { players, currentPlayer } = usePlayer()
  const { playPhase, turn } = useDomino()
  return (
    <>
      <h2>Game Information</h2>
      <p>Turn: {turn}</p>
      <p>Player: {currentPlayer?.name}</p>
      <p>Phase: {playPhase}</p>
      <p>
        Score:{' '}
        {players.map((player) => (
          <span key={player.id}>
            {player.name} {player.score}{' '}
          </span>
        ))}
      </p>
    </>
  )
}

export default Information

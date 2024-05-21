export default function Dice({
  number,
  canRoll,
  roll,
  value
}: {
  number: number
  value: number
  roll: () => void
  canRoll: boolean
}) {
  return (
    <div>
      <h1>Dé {number}</h1>
      <h2>{value}</h2>
      <button onClick={roll} disabled={!canRoll}>
        Lancé
      </button>
    </div>
  )
}

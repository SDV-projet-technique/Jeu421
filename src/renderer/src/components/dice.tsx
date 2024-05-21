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
    <div className="flex flex-col items-center justify-center border-2 border-black rounded-md max-w-fit p-6 aspect-square">
      <h2>Dé {number}</h2>
      <h3>{value}</h3>
      <button onClick={roll} disabled={!canRoll}>
        Lancer
      </button>
    </div>
  )
}

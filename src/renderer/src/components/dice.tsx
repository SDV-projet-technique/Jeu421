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
  return <h3 className="aspect-square border-black border-2 rounded-md p-10">{value}</h3>
}

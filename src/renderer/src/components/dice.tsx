import one from '../assets/1.svg'
import two from '../assets/2.svg'
import three from '../assets/3.svg'
import four from '../assets/4.svg'
import five from '../assets/5.svg'
import six from '../assets/6.svg'

export default function Dice({ value }: { value: number }) {
  const getImg = (value: number) => {
    switch (value) {
      case 1:
        return one
      case 2:
        return two
      case 3:
        return three
      case 4:
        return four
      case 5:
        return five
      case 6:
        return six
      default:
        return one
    }
  }

  return <img src={getImg(value)} alt={value.toString()} className="w-[10%] aspect-square" />
}

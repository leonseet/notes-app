import { TbAirBalloon } from "react-icons/tb"

interface BrandLogoProps {
  className?: string
}

const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <div className="flex gap-4 items-center">
      <TbAirBalloon className="w-7 h-auto -mx-2" />
      <h1 className="font-bold">NoteFlix</h1>
    </div>
  )
}

export default BrandLogo

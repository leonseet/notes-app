import { TbAirBalloon } from "react-icons/tb"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  className?: string
}

const BrandLogo = ({ className }: BrandLogoProps) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <TbAirBalloon className="w-7 h-auto -mx-2" />
      <h1 className="font-bold">NoteFlix</h1>
    </div>
  )
}

export default BrandLogo

import { Button } from "./ui/button"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import CommandButton from "./CommandButton"

interface DashboardTopbarProps {
  section: string
}

const DashboardTopbar = ({ section }: DashboardTopbarProps) => {
  return (
    <div className="flex h-16 items-center justify-between px-7">
      <p className="font-bold">{section}</p>
      <div className="flex gap-4 items-center">
        <Button variant="background" size="xs" className="space-x-2">
          <SlidersHorizontal className="w-4 h-4" />
          <p>Display</p>
          <ChevronDown className="w-4 h-4" />
        </Button>
        <CommandButton />
      </div>
    </div>
  )
}

export default DashboardTopbar

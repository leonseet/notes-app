import BrandLogo from "./BrandLogo"
import AvatarDropDown from "./AvatarDropDown"
import { Button } from "./ui/button"
import { PlusSquare, FileText, ListChecks, LogOut } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import DashboardNewNoteButton from "./DashboardNewNoteButton"

interface DashboardSidebarProps {}

const DashboardSidebar = ({}: DashboardSidebarProps) => {
  return (
    <>
      <div className="flex h-16 items-center justify-between px-2">
        <BrandLogo />
        <AvatarDropDown user={""} />
      </div>

      <div className="w-full">
        <DashboardNewNoteButton />
      </div>

      <div className="mt-4 flex-1">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/notes">
            <Button variant="sidenav" size="xs">
              <FileText className="h-5 w-5" />
              <p className="text-md">Notes</p>
            </Button>
          </Link>
          <Link href="/dashboard/todos">
            <Button variant="sidenav" size="xs">
              <ListChecks className="h-5 w-5" />
              <p className="text-md">Todos</p>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <Separator />
        <Button variant="sidenav" size="xs">
          <LogOut className="h-5 w-5" />
          <p>Log out</p>
        </Button>
      </div>
    </>
  )
}

export default DashboardSidebar

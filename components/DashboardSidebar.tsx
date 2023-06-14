import BrandLogo from "./BrandLogo"
import AvatarDropDown from "./AvatarDropDown"
import { Button } from "./ui/button"
import { PlusSquare, FileText, ListChecks, LogOut } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface DashboardSidebarProps {}

const DashboardSidebar = ({}: DashboardSidebarProps) => {
  return (
    <>
      <div className="flex justify-between h-16 items-center px-2">
        <BrandLogo />
        <AvatarDropDown user={""} />
      </div>

      <div className="w-full">
        <Button size="sm" variant="background" className="w-full justify-start space-x-2">
          <PlusSquare className="w-5 h-5" />
          <p>New Note</p>
        </Button>
      </div>

      <div className="flex-1 mt-4">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/notes">
            <Button variant="sidenav" size="xs">
              <FileText className="w-5 h-5" />
              <p className="text-md">Notes</p>
            </Button>
          </Link>
          <Link href="/dashboard/todos">
            <Button variant="sidenav" size="xs">
              <ListChecks className="w-5 h-5" />
              <p className="text-md">Todos</p>
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Separator />
        <Button variant="sidenav" size="xs">
          <LogOut className="w-5 h-5" />
          <p>Log out</p>
        </Button>
      </div>
    </>
  )
}

export default DashboardSidebar

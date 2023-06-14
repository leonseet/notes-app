import Link from "next/link"
import { Button } from "./ui/button"
import { Settings2, UserSquare, ChevronLeft } from "lucide-react"

interface SettingsSidebarProps {}

const SettingsSidebar = ({}: SettingsSidebarProps) => {
  return (
    <>
      <Link href="/dashboard/notes" className="flex h-16 items-center px-2 gap-5">
        <ChevronLeft className="w-6 h-6" />
        <p className="text-[22px]">Settings</p>
      </Link>

      <div className="flex-1 mt-4">
        <div className="flex flex-col gap-2">
          <Link href="/settings/profile">
            <Button variant="sidenav" size="xs">
              <UserSquare className="w-5 h-5" />
              <p className="text-md">Profile</p>
            </Button>
          </Link>
          <Link href="/settings/preference">
            <Button variant="sidenav" size="xs">
              <Settings2 className="w-5 h-5" />
              <p className="text-md">Preference</p>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default SettingsSidebar

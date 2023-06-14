import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LucideSettings, LogOut } from "lucide-react"
import { FaUser } from "react-icons/fa"
import Link from "next/link"
// import { signOut } from "next-auth/react"
// import { User } from "@prisma/client"

interface AvatarDropDownProps {
  //   user: User
  user: any
}

// const onSignOut = () => {
//   signOut({ callbackUrl: "/login" })
// }

const AvatarDropDown = ({ user }: AvatarDropDownProps) => {
  //   const fallbackName =
  //     user.name
  //       ?.split(" ")
  //       .map((n) => n[0])
  //       .join("") ?? ""

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Avatar className="w-7 h-7">
            <AvatarImage src={user.image ?? ""} />
            {/* <AvatarFallback className="text-xs">AA</AvatarFallback> */}
            <AvatarFallback className="text-xs">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={6} className="bg-background w-56 ml-48">
          <DropdownMenuItem>
            <Link href="/settings/profile" className="cursor-pointer flex items-center gap-2">
              <LucideSettings className="w-5 h-5" />
              <p>Settings</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            <p>Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default AvatarDropDown

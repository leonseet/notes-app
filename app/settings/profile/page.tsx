import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Settings Profile",
}

export default async function ProfilePage() {
  return (
    <div>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="container my-20">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-secondary-foreground">Manage your account profile</p>
          </div>

          <Separator className=" mt-8 mb-12" />

          <div className="flex flex-col gap-10">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">Name</h2>
              <p>Please enter your full name or display name</p>
              <Input type="text" placeholder="Name" className="w-72 mt-3" />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">Email</h2>
              <p>Please enter your email</p>
              <Input type="email" placeholder="Email" className="w-72 mt-3" />
            </div>
          </div>

          <div className="mt-12">
            <Button>Save</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

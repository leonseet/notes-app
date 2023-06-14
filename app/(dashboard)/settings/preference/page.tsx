import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SelectTheme from "@/components/SelectTheme"

export const metadata = {
  title: "Settings Preference",
}

export default async function PreferencePage() {
  return (
    <div>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        <div className="container my-20">
          <div>
            <h1 className="text-3xl font-bold">Preference</h1>
            <p className="text-secondary-foreground">Manage your preferences</p>
          </div>

          <Separator className=" mt-8 mb-12" />

          <div className="flex flex-col gap-10">
            {/* Theme */}
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">Theme</h2>
              <p>Select your theme</p>
              <SelectTheme />
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

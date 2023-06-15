import CommandButton from "@/components/CommandButton"
import SettingsSidebar from "@/components/SettingsSidebar"

interface SettingsLayoutProps {
  children?: React.ReactNode
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-[300px] flex-col md:flex md:border-r md:light:border-slate-200 md:dark:border-slate-800 px-5">
        <SettingsSidebar />
      </aside>
      <div className="flex-1">{children}</div>
      <div className="hidden">
        <CommandButton />
      </div>
    </div>
  )
}

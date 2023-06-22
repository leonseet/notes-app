"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { CommandIcon, ArrowRight, Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import useNewNote from "@/hooks/use-new-note"

interface CommandButtonProps {}

const CommandButton = ({}: CommandButtonProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const { setTheme } = useTheme()
  const { createNewNote, isLoading } = useNewNote()

  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleThemeChange = (theme: string) => {
    setTheme(theme)
    setOpen(false)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const handleNewNote = async () => {
    createNewNote()
    if (!isLoading) {
      setOpen(false)
    }
  }

  return (
    <div>
      <Button variant="background" size="xs" className="space-x-2">
        <div className="flex items-center gap-0.5">
          <CommandIcon className="h-3 w-3" />
          <p>K</p>
        </div>
        <p>Command</p>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() => handleThemeChange("dark")}
              className="flex gap-2"
              value="change theme to dark"
            >
              <p>Change theme to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Dark</p>
            </CommandItem>
            <CommandItem
              onSelect={() => handleThemeChange("light")}
              className="flex gap-2"
              value="change theme to light"
            >
              <p>Change theme to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Light</p>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => handleNavigate("/settings/profile")}
              className="flex gap-2"
              value="go to profile"
            >
              <p>Go to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Profile</p>
            </CommandItem>
            <CommandItem
              onSelect={() => handleNavigate("/settings/preference")}
              className="flex gap-2"
              value="go to preference"
            >
              <p>Go to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Preference</p>
            </CommandItem>
            <CommandItem
              onSelect={() => handleNavigate("/dashboard/notes")}
              className="flex gap-2"
              value="go to notes"
            >
              <p>Go to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Notes</p>
            </CommandItem>
            <CommandItem
              onSelect={() => handleNavigate("/dashboard/todos")}
              className="flex gap-2"
              value="go to todos"
            >
              <p>Go to</p>
              <ArrowRight className="h-0.5 w-0.5" />
              <p>Todos</p>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Actions">
            <CommandItem onSelect={handleNewNote} value="create new note" className="flex">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create New Note
            </CommandItem>
            <CommandItem value="log out">Log Out</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CommandButton

"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "next-themes"

interface SelectThemeProps {}

const SelectTheme = () => {
  const { theme, setTheme } = useTheme()
  const handleThemeChange = (theme: string) => {
    setTheme(theme)
  }

  return (
    <>
      <Select defaultValue={theme} onValueChange={handleThemeChange}>
        <SelectTrigger className="w-72 mt-3">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectTheme

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type Note = {
  id: string
  title?: string
  description?: string
  date: string
}

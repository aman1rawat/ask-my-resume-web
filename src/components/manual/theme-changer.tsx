'use client'

import { useTheme } from 'next-themes'
import { ThemeChangerSwitch } from './theme-changer-switch'

export function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  function toggleTheme(value: boolean) {
    const newTheme = value ? 'dark' : 'light'

    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  const isDark = theme === 'dark'

  return (
    <ThemeChangerSwitch
      checked={isDark}
      onCheckedChange={toggleTheme}
      className="cursor-pointer"
    />
  )
}

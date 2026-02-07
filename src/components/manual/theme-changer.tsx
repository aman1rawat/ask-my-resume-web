'use client'

import { useTheme } from 'next-themes'
import { ThemeChangerSwitch } from './theme-changer-switch'
import { useEffect, useState } from 'react'

export function ToggleTheme() {
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

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

  if (!mounted) {
    return null
  }

  return (
    <ThemeChangerSwitch
      checked={isDark}
      onCheckedChange={toggleTheme}
      className="cursor-pointer"
    />
  )
}

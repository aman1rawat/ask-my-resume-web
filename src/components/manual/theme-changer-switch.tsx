'use client'

import { Switch as SwitchPrimitive } from 'radix-ui'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ComponentProps, useState } from 'react'

export function ThemeChangerSwitch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false)

  const controlled = checked !== undefined
  const state = controlled ? checked : isChecked

  function handleChange(v: boolean) {
    if (!controlled) setIsChecked(v)
    onCheckedChange?.(v)
  }

  return (
    <SwitchPrimitive.Root
      checked={state}
      onCheckedChange={handleChange}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border border-transparent outline-none transition-colors duration-300',
        'focus-visible:ring-2 focus-visible:ring-ring/50',
        state ? 'bg-primary' : 'bg-input dark:bg-input/80',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'flex size-5 items-center justify-center rounded-full bg-background shadow-xs transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]',
          state ? 'translate-x-[calc(100%-2px)]' : 'translate-x-[2px]',
        )}
      >
        <Moon
          className={cn(
            'absolute size-3 text-primary-foreground transition-all duration-300',
            state
              ? 'opacity-100 scale-100 rotate-0'
              : 'opacity-0 scale-50 rotate-90',
          )}
        />

        <Sun
          className={cn(
            'absolute size-3 text-foreground transition-all duration-300',
            state
              ? 'opacity-0 scale-50 -rotate-90'
              : 'opacity-100 scale-100 rotate-0',
          )}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

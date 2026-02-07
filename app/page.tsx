import { ToggleTheme } from '@/components/manual/theme-changer'

export default function ChatInterfacePage() {
  return (
    <div className="bg-background flex h-screen w-full">
      <div className="bg-accent flex h-40 w-full items-center justify-center p-10">
        <ToggleTheme  />
      </div>
    </div>
  )
}

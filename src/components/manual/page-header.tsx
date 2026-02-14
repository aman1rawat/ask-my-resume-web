import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ToggleTheme } from './theme-changer'

export default function PageHeader() {
  return (
    <nav className="bg-card border-border z-10 flex w-full items-center justify-between border-b-2 px-10 py-4 md:px-20">
      <div className="flex items-center justify-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src="https://github.com/shadcn.png" alt="@AmanRawat" />
          <AvatarFallback>AR</AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
        <div className="text-card-foreground flex flex-col items-start justify-start">
          <span className="text-lg font-semibold">Aman Rawat</span>
          <span className="text-muted-foreground -mt-1 text-sm">
            AI Engineer
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button
          size={'sm'}
          variant={'link'}
          className="rounded-xl font-semibold"
        >
          Resume
        </Button>
        <ToggleTheme />
      </div>
    </nav>
  )
}

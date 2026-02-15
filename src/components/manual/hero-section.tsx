import Mascot from './mascot'

export default function HeroSection() {
  return (
    <header className="flex flex-col items-center gap-3 md:gap-0">
      <div className="flex flex-wrap items-center justify-center md:gap-3">
        <Mascot className="size-20 md:size-16" />
        <h1 className="font-display text-5xl leading-9 font-semibold text-balance">
          Welcome, I am Aman Rawat
        </h1>
      </div>
      <p className="text-sm leading-tight text-balance">
        This Assistant can help you with questions about my work and projects.
      </p>
    </header>
  )
}

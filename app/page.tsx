import ChatInputArea from '@/components/manual/chat-input-area'
import Mascot from '@/components/manual/mascot'
import PageHeader from '@/components/manual/page-header'
import SuggestionButtons from '@/components/manual/suggestion-buttons'
export default function ChatInterfacePage() {
  return (
    <div className="flex h-screen flex-col items-center">
      <PageHeader />
      <div className="relative -top-12 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-3 px-4 text-center">
        {/* Hero section */}
        <header className="flex flex-col items-center gap-3 md:gap-0">
          <div className="flex flex-wrap items-center justify-center md:gap-3">
            <Mascot className="size-20 md:size-16" />
            <h1 className="font-display text-5xl leading-9 font-semibold text-balance">
              Welcome, I am Aman Rawat
            </h1>
          </div>
          <p className="text-sm leading-tight text-balance">
            This Assistant can help you with questions about my work and
            projects.
          </p>
        </header>

        {/* Chat Area */}
        <ChatInputArea />
        {/* Suggestions  */}
        <SuggestionButtons />
      </div>
    </div>
  )
}

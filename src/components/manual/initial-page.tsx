import ChatInputArea from './chat-input-area'
import HeroSection from './hero-section'
import { motion } from 'motion/react'
import SuggestionButtons from './suggestion-buttons'

export default function InititalPage() {
  return (
    <div className="relative -top-12 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-3 px-4 text-center">
      {/* Hero section */}
      <HeroSection />
      {/* Chat Area */}
      <motion.div
        className="h-60 w-full"
        layoutId="chat-input-area"
        key={'chat-input-area'}
      >
        <ChatInputArea />
      </motion.div>
      {/* Suggestions  */}
      <SuggestionButtons />
    </div>
  )
}



import ChatInputArea from './chat-input-area'
import HeroSection from './hero-section'
import { motion } from 'motion/react'
import SuggestionButtons from './suggestion-buttons'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { MessageFormData } from '@/validation/schema'

type InititalPageProps = Readonly<{
  form: UseFormReturn<MessageFormData>
  onSubmit: SubmitHandler<MessageFormData>
}>

export default function InititalPage({ form, onSubmit }: InititalPageProps) {
  const state = form.formState.isDirty
  console.log(state)
  return (
    <div className="relative -top-12 flex h-full w-full max-w-3xl flex-col items-center justify-center gap-3 px-4 text-center">
      {/* Hero section */}
      <HeroSection />
      {/* Chat Area */}
      <motion.div
        className="w-full"
        layoutId="chat-input-area"
        key={'chat-input-area'}
      >
        <ChatInputArea form={form} onSubmit={onSubmit} />
      </motion.div>
      {/* Suggestions  */}
      <SuggestionButtons isMessageTyped={state} />
    </div>
  )
}

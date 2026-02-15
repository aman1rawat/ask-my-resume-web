'use client'

import ChatInputArea from '@/components/manual/chat-input-area'
import PageHeader from '@/components/manual/page-header'
import { Message, Role } from '@/validation/types'
import { useState } from 'react'
import { AnimatePresence, easeOut, motion } from 'motion/react'
import InititalPage from '@/components/manual/initial-page'
import { useForm } from 'react-hook-form'
import { MessageFormData, messageSchema } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Mascot from '@/components/manual/mascot'

const initialMessageAnimation = {
  opacity: 0,
  y: -20,
  filter: 'blur(6px)',
}

const animateMessageTo = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: {
    duration: 0.35,
    ease: easeOut,
  },
}

export default function ChatInterfacePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationStarted, setConversationStarted] = useState(false)

  const messageForm = useForm<MessageFormData>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(messageSchema),
  })

  function handleSendMessage({ message }: MessageFormData) {
    const newUserMessage: Message = {
      role: Role.USER,
      content: message,
    }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setConversationStarted(true)
    messageForm.resetField('message')
    messageForm.setFocus('message')
    setTimeout(() => {
      const assistantResponse: Message = {
        role: Role.ASSISTANT,
        content: `This is a simulated response to the earlier message provided by  the user. The content of the user message was following ->\n ${message}`,
      }
      setMessages((prevMessages) => [...prevMessages, assistantResponse])
    }, 3000)
  }

  function renderMessage(msg: Message, index: number) {
    if (msg.role === Role.USER) {
      return (
        <motion.div
          key={index}
          initial={initialMessageAnimation}
          animate={animateMessageTo}
          className="bg-accent text-accent-foreground mt-12 mb-4 max-w-[80%] self-end rounded-lg px-4 py-2 shadow-sm"
        >
          {msg.content}
        </motion.div>
      )
    }

    return (
      <motion.div
        key={index}
        initial={initialMessageAnimation}
        animate={animateMessageTo}
        className="text-foreground self-start"
      >
        {msg.content}
      </motion.div>
    )
  }
  return (
    <div className="flex h-screen flex-col items-center">
      <PageHeader />
      <AnimatePresence mode="wait">
        {conversationStarted ? (
          <motion.div
            key="chat"
            className="relative flex h-full w-full justify-center p-4"
          >
            {/* messages area */}
            <motion.div layout className="flex w-full max-w-2xl flex-col px-2">
              {messages.map((msg, index) => renderMessage(msg, index))}
              <motion.div layout>
                <Mascot className="size-12 self-start" />
              </motion.div>
              <div className="min-h-[25rem]" />
            </motion.div>

            <motion.div
              layoutId="chat-input-area"
              className="fixed bottom-0 w-full p-2"
            >
              <ChatInputArea {...messageForm} onSubmit={handleSendMessage} />
            </motion.div>
          </motion.div>
        ) : (
          <InititalPage form={messageForm} onSubmit={handleSendMessage} />
        )}
      </AnimatePresence>
    </div>
  )
}

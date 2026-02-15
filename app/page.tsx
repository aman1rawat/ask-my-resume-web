'use client'

import ChatInputArea from '@/components/manual/chat-input-area'
import PageHeader from '@/components/manual/page-header'
import { Message, Role } from '@/validation/types'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import InititalPage from '@/components/manual/initial-page'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageFormData, messageSchema } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'

export default function ChatInterfacePage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [conversationStarted, setConversationStarted] = useState(false)

  const messageForm = useForm<MessageFormData>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(messageSchema),
  })

  function handleSendMessage(content: string) {
    const newUserMessage: Message = {
      role: Role.USER,
      content,
    }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setConversationStarted(true)

    setTimeout(() => {
      const assistantResponse: Message = {
        role: Role.ASSISTANT,
        content: `This is a simulated response to the earlier message provided by  the user. The content of the user message was following ->\n ${content}`,
      }
      setMessages((prevMessages) => [...prevMessages, assistantResponse])
    }, 3000)
  }

  const onSubmit: SubmitHandler<MessageFormData> = (data) => console.log(data)

  return (
    <div className="flex h-screen flex-col items-center">
      <PageHeader />
      <AnimatePresence mode="wait">
        {conversationStarted ? (
          <motion.div key="chat" className="h-full w-full bg-red-100">
            <motion.div
              layoutId="chat-input-area"
              className="fixed bottom-0 w-full p-2"
            >
              <ChatInputArea form={messageForm} onSubmit={onSubmit} />
            </motion.div>
          </motion.div>
        ) : (
          <InititalPage  form={messageForm} onSubmit={onSubmit}/>
        )}
      </AnimatePresence>
    </div>
  )
}


// ! Was trying to create a form and pass it, and check of on submit it logs the data or not. 
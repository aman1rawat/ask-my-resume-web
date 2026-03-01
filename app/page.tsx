'use client'

import ChatInputArea from '@/components/manual/chat-input-area'
import PageHeader from '@/components/manual/page-header'
import { Message as MessageType, Role } from '@/validation/types'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import InititalPage from '@/components/manual/initial-page'
import { useForm } from 'react-hook-form'
import { MessageFormData, messageSchema } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Mascot from '@/components/manual/mascot'
import Message from '@/components/manual/message'
import { useSendMessage } from '@/hooks/ai-queries'

const SCROLL_THRESHOLD = 100
export default function ChatInterfacePage() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [conversationStarted, setConversationStarted] = useState(false)

  const [isGenerating, setIsGenerating] = useState(false)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)

  const messageForm = useForm<MessageFormData>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(messageSchema),
  })
  const sendMessage = useSendMessage()

  // handlse submit logic when the user sends a message
  function handleSendMessage({ message }: MessageFormData) {
    setShouldAutoScroll(true)
    setConversationStarted(true)
    sendMessage(message, setMessages, setIsGenerating)
    messageForm.reset()
  }

  // helper function for scrolling purpose
  function isUserNearBottom() {
    if (!containerRef.current) {
      return true
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight

    return distanceFromBottom < SCROLL_THRESHOLD
  }

  // helper function too
  function scrollToBottom() {
    if (!messageEndRef.current) {
      return
    }

    messageEndRef.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  // side effect to add event listener for scroll and decides to update autoscroll state
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleScroll() {
      console.log(isUserNearBottom(), ' : bottom ')
      if (isUserNearBottom()) {
        setShouldAutoScroll(true)
      } else {
        setShouldAutoScroll(false)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  //  side effect to scroll to bottom when a new message is generating and user didnt forcefully wanted to scroll up
  useEffect(() => {
    if (isGenerating && shouldAutoScroll) {
      scrollToBottom()
    }
  }, [messages, isGenerating, shouldAutoScroll])

  return (
    <div className="scrollbar flex h-screen flex-col items-center">
      <PageHeader />
      <AnimatePresence mode="wait">
        {conversationStarted ? (
          <motion.div
            key="chat"
            className="relative flex w-full flex-1 justify-center p-4"
          >
            {/* messages container */}
            <div
              className="scrollbar flex w-full max-w-2xl flex-col overflow-y-auto px-2"
              ref={containerRef}
            >
              {messages.map((msg, index) => (
                <Message key={index} msg={msg} />
              ))}

              <div ref={messageEndRef} />

              <motion.div layout layoutId="mascot">
                <Mascot className="my-2 size-12 self-start" />
              </motion.div>
              <div className="min-h-60" />
            </div>

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

// ! Code is getting confusing start adding comments

import { Message, Role } from '@/validation/types'
import { Dispatch, SetStateAction } from 'react'

export function useSendMessage() {
  const sendMessage = async (
    message: string,
    setMessages: Dispatch<SetStateAction<Message[]>>,
    isGenerating: Dispatch<SetStateAction<boolean>>,
  ) => {
    const userMessage = {
      role: Role.USER,
      content: message,
    }

    setMessages((prev) => [...prev, userMessage])
    isGenerating(true)

    const aiMessage = {
      role: Role.ASSISTANT,
      content: '',
    }

    setMessages((prev) => [...prev, aiMessage])

    try {
      const response = await fetch('http://localhost:3001/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      })

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()

        if (done) {
          break
        }

        const chunk = decoder.decode(value)

        setMessages((prev) => {
          const updated = [...prev]
          const lastIndex = updated.length - 1
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: updated[lastIndex].content + chunk,
          }
          return updated
        })
      }
    } catch (error) {
      error
      setMessages((prev) => {
        const updated = [...prev]
        const lastIndex = updated.length - 1
        updated[lastIndex] = {
          ...updated[lastIndex],
          content: 'Error contacting server',
        }
        return updated
      })
    } finally {
      isGenerating(false)
    }
  }
  return sendMessage
}

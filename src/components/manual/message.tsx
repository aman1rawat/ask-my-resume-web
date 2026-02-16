import { Message as MessageType, Role } from '@/validation/types'
import { easeOut, motion } from 'motion/react'

type MessageProps = Readonly<{ msg: MessageType }>

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

export default function Message({ msg }: MessageProps) {
  if (msg.role === Role.USER) {
    return (
      <motion.div
        initial={initialMessageAnimation}
        animate={animateMessageTo}
        className="bg-accent text-accent-foreground mt-12 mb-4 max-w-[80%] self-end rounded-lg px-4 py-2 shadow-sm whitespace-pre-wrap"
      >
        {msg.content}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={initialMessageAnimation}
      animate={animateMessageTo}
      className="text-foreground self-start whitespace-pre-wrap"
    >
      {msg.content}
    </motion.div>
  )
}

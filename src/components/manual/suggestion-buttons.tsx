'use client'

import {
  BriefcaseBusiness,
  Code,
  Contact,
  DraftingCompass,
  University,
} from 'lucide-react'
import { Button } from './motion-wrapped-components'
import { AnimatePresence, easeOut, motion, Variants } from 'motion/react'
import { useState } from 'react'

const suggestions = [
  {
    icon: <Code />,
    message: 'Projects',
  },
  {
    message: 'Experience',
    icon: <BriefcaseBusiness />,
  },
  {
    message: 'Skills',
    icon: <DraftingCompass />,
  },
  {
    message: 'Education',
    icon: <University />,
  },
  {
    message: 'Contact',
    icon: <Contact />,
  },
]

const parentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: easeOut,
      delayChildren: 0.15,
      staggerChildren: 0.15,
    },
  },
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
}

export default function SuggestionButtons({
  isMessageTyped,
}: Readonly<{
  isMessageTyped: boolean
}>) {
  return (
    <motion.div
      key={isMessageTyped ? 'hide-suggestions' : 'show-suggestions'}
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex w-full flex-wrap justify-center gap-2"
    >
      <AnimatePresence mode="popLayout">
        {!isMessageTyped &&
          suggestions.map(({ icon, message }) => (
            <Button
              variants={childVariants}
              key={message}
              variant={'outline'}
              size={'sm'}
              className="flex items-center gap-2"
            >
              {icon}
              {message}
            </Button>
          ))}
      </AnimatePresence>
    </motion.div>
  )
}

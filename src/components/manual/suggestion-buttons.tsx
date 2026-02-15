'use client'

import {
  BriefcaseBusiness,
  Code,
  Contact,
  DraftingCompass,
  University,
} from 'lucide-react'
import { Button } from './motion-wrapped-components'
import { easeOut, motion, Variants } from 'motion/react'
import { UseFormSetFocus, UseFormSetValue } from 'react-hook-form'
import { MessageFormData } from '@/validation/schema'

const suggestions = [
  {
    icon: <Code />,
    key: 'Projects',
    message:
      'Hey, Aman I want to know about your projects that you have worked on.',
  },
  {
    key: 'Experience',
    icon: <BriefcaseBusiness />,
    message:
      'Hey, Aman I want to know about your work experience, the companies you have worked for and the roles you have held.',
  },
  {
    key: 'Skills',
    icon: <DraftingCompass />,
    message:
      'Hey, Aman I want to know about your skills, both technical and soft skills that you possess.',
  },
  {
    key: 'Education',
    icon: <University />,
    message:
      'Hey, Aman I want to know about your educational background, the degrees you have earned and the institutions you attended.',
  },
  {
    key: 'Contact',
    icon: <Contact />,
    message:
      'Hey, Aman I want to know about your contact information, such as your email address or phone number or some social media links.',
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

type SuggestionButtonsProps = Readonly<{
  isMessageTyped: boolean
  setValue: UseFormSetValue<MessageFormData>
  setFocus: UseFormSetFocus<MessageFormData>
}>

export default function SuggestionButtons({
  isMessageTyped,
  setValue,
  setFocus,
}: SuggestionButtonsProps) {
  return (
    <motion.div
      key={isMessageTyped ? 'hide-suggestions' : 'show-suggestions'}
      variants={parentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="-mt-20 flex min-h-20 w-full flex-wrap justify-center gap-2 md:min-h-10"
    >
      {!isMessageTyped &&
        suggestions.map(({ icon, key, message }) => (
          <Button
            variants={childVariants}
            key={key}
            variant={'outline'}
            size={'sm'}
            className="flex items-center gap-2"
            onClick={() => {
              setFocus('message', {
                shouldSelect: true,
              })
              setValue('message', message, {
                shouldDirty: true,
              })
            }}
          >
            {icon}
            {key}
          </Button>
        ))}
    </motion.div>
  )
}

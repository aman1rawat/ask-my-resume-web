import { ArrowUp } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from '../ui/input-group'
import {
  FormState,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form'
import { MessageFormData } from '@/validation/schema'
import { easeOut } from 'motion'

type ChatInputAreaProps = Readonly<{
  handleSubmit: UseFormHandleSubmit<MessageFormData>
  register: UseFormRegister<MessageFormData>
  formState: FormState<MessageFormData>
  onSubmit: SubmitHandler<MessageFormData>
}>

const buttonVariants = {
  enabled: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.1,
      ease: easeOut,
    },
  },
  disabled: {
    opacity: 0,
    scale: 0,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
}

export default function ChatInputArea({
  handleSubmit,
  register,
  formState,
  onSubmit,
}: ChatInputAreaProps) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl px-3 py-2 sm:px-4 md:px-6"
    >
      <InputGroup className="bg-card flex w-full flex-col rounded-2xl p-2 shadow-sm not-dark:bg-white! dark:bg-popover">
        <InputGroupTextarea
          className="text-card-foreground scrollbar field-sizing-content max-h-60 w-full text-base!"
          placeholder="How can I help today?"
          {...register('message')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSubmit(onSubmit)()
            } else if (e.key === 'Enter' && e.shiftKey) {
              e.stopPropagation()
            }
          }}
        />
        <InputGroupAddon align={'block-end'} className="flex justify-between">
          <p className="text-muted-foreground text-xs font-light">
            <span className="bg-muted rounded-sm px-1 py-0.5">Shift</span> +{' '}
            <span className="bg-muted rounded-sm px-1 py-0.5">Enter</span> for
            new line
          </p>
          <InputGroupButton
            aria-label="send"
            title="send message"
            variant={'default'}
            size={'icon-xs'}
            className="rounded-md"
            type="submit"
            disabled={!formState.isDirty}
            variants={buttonVariants}
            animate={formState.isDirty ? 'enabled' : 'disabled'}
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

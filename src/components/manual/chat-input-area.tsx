import { ArrowUp } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '../ui/input-group'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { MessageFormData } from '@/validation/schema'

type ChatInputAreaProps = Readonly<{
  form: UseFormReturn<MessageFormData>
  onSubmit: SubmitHandler<MessageFormData>
}>

export default function ChatInputArea({ form, onSubmit }: ChatInputAreaProps) {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl px-3 py-2 sm:px-4 md:px-6"
    >
      <InputGroup className="bg-card flex w-full flex-col rounded-2xl p-2 shadow-sm not-dark:bg-white!">
        <InputGroupTextarea
          className="text-card-foreground scrollbar field-sizing-content max-h-60 w-full text-base!"
          placeholder="How can I help today?"
          {...form.register('message')}
        />
        <InputGroupAddon align={'block-end'} className="flex justify-end">
          <InputGroupButton
            aria-label="send"
            title="send message"
            variant={'default'}
            size={'icon-xs'}
            className="rounded-md"
            type="submit"
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}

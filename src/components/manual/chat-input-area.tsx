import { ArrowUp } from 'lucide-react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '../ui/input-group'

export default function ChatInputArea() {
  return (
    <div className="mx-auto max-w-2xl px-3 py-2 sm:px-4 md:px-6">
      <InputGroup className="bg-card flex w-full flex-col rounded-2xl p-2 shadow-sm not-dark:bg-white!">
        <InputGroupTextarea
          className="text-card-foreground scrollbar field-sizing-content max-h-60 w-full text-base!"
          placeholder="How can I help today?"
        />
        <InputGroupAddon align={'block-end'} className="flex justify-end">
          <InputGroupButton
            aria-label="send"
            title="send message"
            variant={'default'}
            size={'icon-xs'}
            className="rounded-md"
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

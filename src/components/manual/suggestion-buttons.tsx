import {
  BriefcaseBusiness,
  Code,
  Contact,
  DraftingCompass,
  University,
} from 'lucide-react'
import { Button } from '../ui/button'

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

export default function SuggestionButtons() {
  return (
    <div className="-mt-20 flex w-full flex-wrap justify-center gap-2">
      {suggestions.map(({ icon, message }) => (
        <Button
          key={message}
          variant={'outline'}
          size={'sm'}
          className="flex items-center gap-2"
        >
          {icon}
          {message}
        </Button>
      ))}
    </div>
  )
}

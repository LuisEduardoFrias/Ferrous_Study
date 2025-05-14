import { createFileRoute } from '@tanstack/react-router'
import NewMarkdown from '../../pages/new_markdown'

export const Route = createFileRoute('/classroom/newmd')({
  component: NewMarkdown,
})

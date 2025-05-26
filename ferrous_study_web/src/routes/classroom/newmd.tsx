import { createFileRoute } from '@tanstack/react-router'
import NewMarkdown from '../../pages/new_markdown'
import { verifyAuthentication } from '../../hooks/verify_authentication'

export const Route = createFileRoute('/classroom/newmd')({
  component: NewMarkdown,
 beforeLoad: verifyAuthentication
})

import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '../pages/signup'

export const Route = createFileRoute('/signinup')({
  component: AuthForm,
})

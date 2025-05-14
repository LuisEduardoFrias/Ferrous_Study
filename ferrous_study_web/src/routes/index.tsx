import { createFileRoute } from '@tanstack/react-router'
import { getAuth } from '@clerk/tanstack-react-start/server'
import Home from '../pages/home'

export const Route = createFileRoute('/')({
  component: Home,
})
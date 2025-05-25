import { createFileRoute } from '@tanstack/react-router'
import Suggestions from '../pages/suggestions'

export const Route = createFileRoute('/suggestions')({
  component: Suggestions,
})

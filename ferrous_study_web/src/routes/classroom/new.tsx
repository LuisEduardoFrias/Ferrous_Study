import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classroom/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/classroom/new"!</div>
}

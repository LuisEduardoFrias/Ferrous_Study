import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classroom_/edit/$editClassroomId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/classroom_/edit/$editClassroomId"!</div>
}

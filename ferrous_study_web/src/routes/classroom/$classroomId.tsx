import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classroom/$classroomId')({
  component: ClassRoom,
})

function ClassRoom() {
  const { classroomId } = Route.useParams()
  return <div className="p-2">___Hello from ClassRoom! parametro {classroomId}</div>
}

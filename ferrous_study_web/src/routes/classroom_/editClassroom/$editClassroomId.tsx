import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/classroom_/editClassroom/$editClassroomId')({
  component: EditClassroom,
})

function EditClassroom() {
  const { editClassroomId } = Route.useParams()
  return <div className="p-2">Hello from EditClassroom! parametro {editClassroomId}</div>
}

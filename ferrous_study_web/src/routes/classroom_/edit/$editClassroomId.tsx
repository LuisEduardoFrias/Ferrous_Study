import { createFileRoute } from '@tanstack/react-router'
import EditClassroom from '../../../pages/edit_classroom'

export const Route = createFileRoute('/classroom_/edit/$editClassroomId')({
  component: EditClassRoom,
})

function EditClassRoom(){
  const { editClassroomId } = Route.useParams();
  return <EditClassroom editClassroomId={editClassroomId} />
}
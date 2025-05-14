import { createFileRoute } from '@tanstack/react-router'
import EditClassroom from '../../../pages/edit_classroom'
import { verifyAuthentication } from '../../../hooks/verify_authentication'

export const Route = createFileRoute('/classroom_/edit/$editClassroomId')({
  component: EditClassRoom,
  beforeLoad: verifyAuthentication
})

function EditClassRoom() {
  const { editClassroomId } = Route.useParams();
  return <EditClassroom editClassroomId={editClassroomId} />
}
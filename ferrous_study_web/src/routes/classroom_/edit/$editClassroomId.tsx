import { createFileRoute } from '@tanstack/react-router'
import EditClassroom from '../../../pages/edit_classroom'
import { verifyAuthentication } from '../../../hooks/verify_authentication'
import ErrorBoundary from '../../../components/error_boundery'

export const Route = createFileRoute('/classroom_/edit/$editClassroomId')({
   component: EditClassroomId_,
   beforeLoad: verifyAuthentication
})

function EditClassroomId_() {
   const { editClassroomId } = Route.useParams();

   return (
      <ErrorBoundary>
         <EditClassroom editClassroomId={editClassroomId} />
      </ErrorBoundary>
   )
}

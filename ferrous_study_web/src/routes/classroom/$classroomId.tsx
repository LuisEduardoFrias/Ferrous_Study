import { createFileRoute } from '@tanstack/react-router'
import ClassRoom from '../../pages/classroom'

export const Route = createFileRoute('/classroom/$classroomId')({
  component: ClassRoom_,
})

function ClassRoom_() {
  const { classroomId } = Route.useParams();
  
  return <ClassRoom classroomId={classroomId} />
}
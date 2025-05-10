import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MarkdownRenderer from '../../components/markdown_renderer'

export const Route = createFileRoute('/classroom/$classroomId')({
  component: ClassRoom,
})

function ClassRoom() {
  const [content, setContent] = useState('');
  const { classroomId } = Route.useParams();

  (async () => {
    const DynamicComponent = await import(`@/${classroomId}.md?raw`);
    setContent(DynamicComponent.default);
  })();

  return (
    <div className="p-2">
      <MarkdownRenderer>
        {content}
      </MarkdownRenderer>
    </div>
  );
}


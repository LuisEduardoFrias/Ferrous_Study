import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import MarkdownRenderer from '../../components/markdown_renderer'
import { githubService } from '../../services/github_service'

export const Route = createFileRoute('/classroom/$classroomId')({
  component: ClassRoom,
})

function ClassRoom() {
  const [content, setContent] = useState('');
  const { classroomId } = Route.useParams();

  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();

  useEffect(() => {
    (async () => {
      const result = await githubService.getFileContent(classroomId, 'markdown');
      setContent(result);
    })()
  }, [])

  return (
    <div name="classRoom" className="p-2">
      <MarkdownRenderer>
        {content}
      </MarkdownRenderer>
    </div>
  );
}


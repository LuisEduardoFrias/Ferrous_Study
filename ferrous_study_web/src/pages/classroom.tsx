import { useState, useEffect } from 'react'
import { githubService } from '../services/github_service'
import MarkdownRenderer from '../components/markdown_renderer'

export default function ClassRoom({ classroomId }: { classroomId: string }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      const result = await githubService.getFileContent(classroomId, 'markdown');
      setContent(result);
    })()
  }, [classroomId])

  return (
    <div name="classRoom" className="p-2">
      <MarkdownRenderer>
        {content}
      </MarkdownRenderer>
    </div>
  );
}

  //   (async () => {
  //     const DynamicComponent = await import(`@/${classroomId}.md?raw`);
  //     setContent(DynamicComponent.default);
  //   })();
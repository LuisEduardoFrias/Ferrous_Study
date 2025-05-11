import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import TextEditor from '../../../components/text_editor'
import MarkdownRenderer from '../../../components/markdown_renderer'

export const Route = createFileRoute('/classroom_/edit/$editClassroomId')({
  component: EditClassroom,
})

function EditClassroom() {
  const [content, setContent] = useState('');
  const { editClassroomId } = Route.useParams();

  (async () => {
    const DynamicComponent = await import(`@/${editClassroomId}.md?raw`);
    setContent(DynamicComponent.default);
  })();

  return (
    <TextEditor name="idClassRoom" markdownName={editClassroomId} >
      <textarea className="block mx-auto p-2 text-black w-full font-sans text-base leading-relaxed border border-theme-4 focus:outline-none focus:border-theme-3"
        style={{ height: 'calc(27.94cm - 2rem)', resize: 'none' }}
        defaultValue={content} />
    </TextEditor>
  );
}
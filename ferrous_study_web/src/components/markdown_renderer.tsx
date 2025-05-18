import { Children, HTMLAttributes } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CodeButton from './code_button'
import CopyButton from './copy_button'
import Paragraph from './paragraph'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function MarkdownRenderer({ children }: { children: string }) {

  function Code({ className, children: codeChildren, ...props }: HTMLAttributes<HTMLElement>) {
    const match = /language-(\w+)/.exec(className || "");

    const { title, text } = getTitle(codeChildren as string);


    const inline = false;

    return !inline && match ? (
      <div className="relative pt-4 px-3" >
        {title && <span className="" >{title}</span>}
        <div className="absolute w-full flex gap-2 justify-end -top-1 right-8" >
          <CopyButton textToCopy={text as string} />
          <CodeButton textToCode={text as string} />
        </div>

        <SyntaxHighlighter
          {...props}
          style={dracula}
          PreTag="div"
          language={match[1]}
        >
          {String(text).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code {...props} className={className} >
        {text}
      </code>
    );
  }

  function P({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return (
      <Paragraph {...props} >
        {children}
      </Paragraph>
    );
  }

  function H2({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h2 {...props} className="font-bold mb-2 text-3xl" >
        {children}
      </h2>
    );
  }

  function H3({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
      <h3 {...props} className="font-bold mb-2 text-2xl" >
        {children}
      </h3>
    );
  }

  function Ul({ children, ...props }: HTMLAttributes<HTMLUListElement>) {
    return (
      <ul {...props} className="list-item pl-4" >
        {Children.map(children, (child) => {
          if (child === "\n") return null;

          //const Li = cloneElement(child, { className: " border-2 border-amber-300 mb-3" });
          return (<div className="flex gap-1 mb-2" ><p>•</p> {child}</div>)
        })}
      </ul>
    );
  }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{ ul: Ul, code: Code, p: P, h2: H2, h3: H3 }}>
      {children}
    </Markdown>
  );
}

function getTitle(text: string): { title: string | null; text: string } {
  const regex = /&title>(.*?)<title&/;
  const match = text.match(regex);

  if (match && match[1] !== undefined) {
    const title = match[1];
    const textWithoutTitle = text.replace(regex, '');
    return { title, text: textWithoutTitle };
  } else {
    return { title: null, text };
  }
}
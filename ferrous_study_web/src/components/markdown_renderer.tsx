import { ReactNode, Children, cloneElement } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CopyButton from './copy_button'
import Paragraph from './paragraph'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function MarkdownRenderer({ children }: { children: ReactNode }) {

  function Code({ node, inline, className, children: codeChildren, ...props }) {
    const match = /language-(\w+)/.exec(className || "");

    return !inline && match ? (
      <div className="relative" >
        <CopyButton textToCopy={codeChildren} />
        <SyntaxHighlighter
          style={dracula}
          PreTag="div"
          language={match[1]}
          {...props}
        >
          {String(codeChildren).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {codeChildren}
      </code>
    );
  }

  function P({ node, children, ...props }) {
    return (
      <Paragraph text={children} {...props} />
    );
  }

  function H2({ node, children, ...props }) {
    return (
      <h2 className="font-bold mb-2 text-3xl" {...props} >
        {children}
      </h2>
    );
  }
  function H3({ node, children, ...props }) {
    return (
      <h3 className="font-bold mb-2 text-2xl" {...props} >
        {children}
      </h3>
    );
  }

  function Ul({ node, children, ...props }) {
    return (
      <ol className="list-item pl-4"  {...props} >
        {Children.map(children, (child) => {
          if (child === "\n") return null;

          const Li = cloneElement(child, { className: " border-2 border-amber-300 mb-3" });
          return (<div className="flex gap-1 mb-2" ><p>•</p> {child}</div>)
        })}
      </ol>
    );
  }

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{ code: Code, p: P, ul: Ul, h2: H2, h3: H3 }}>
      {children}
    </Markdown>
  );
}
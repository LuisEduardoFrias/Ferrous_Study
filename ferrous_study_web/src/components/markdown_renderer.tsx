import { Children, HTMLAttributes, useState, ReactNode, cloneElement, isValidElement } from 'react'
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
      const notPlay = !text.includes('&>notplay');
      const notCopy = !text.includes('&>notcopy');
      let newtext = text.replace('&>notplay\n', '').replace('&>notcopy\n','');

      const regex = new RegExp(`notcopy&>\\n([\\s\\S]*?)\\<&notcopy`, 's');
      const match2 = newtext.match(regex);
      let copytext = newtext;

      if (match2)
         match2.map((va) => {
            const notcopytext = va.trim();
            copytext = copytext.replace(notcopytext, '');
         })

      newtext = newtext.replace('notcopy&>\n', '').replace('<&notcopy\n', '');

      const inline = false;

      return !inline && match ? (
         <div className="relative pt-4 px-3" >
            {title &&
               <div className="absolute -top-0 w-[320px] overflow-y-scroll pr-3 z-40 " >
                  <span className="underline" >{title}</span>
               </div>
            }
            <div className="absolute w-full flex gap-2 justify-end -top-1 right-8" >
              {notCopy &&  <CopyButton textToCopy={copytext as string} />}
               {notPlay && <CodeButton textToCode={newtext as string} />}
            </div>

            <SyntaxHighlighter
               {...props}
               style={dracula}
               PreTag="div"
               language={match[1]}
            >
               {String(newtext).replace(/\n$/, "")}
            </SyntaxHighlighter>
         </div>
      ) : (
         <code {...props} className={className} >
            {newtext}
         </code>
      );
   }

   function MARK({ children, ...props }: HTMLAttributes<HTMLMarqueeElement>) {
      const { title, text } = getTitle(children as string);
      const [isHovering, setIsHovering] = useState(false);

      const handleMouseEnter = () => {
         setIsHovering(true);
      };

      const handleMouseLeave = () => {
         setIsHovering(false);
      };

      return (
         <span className="relative">
            {isHovering && (
               <mark
                  {...props}
                  className="bg-theme-0  left-1/2 -translate-x-1/2 z-10 w-72 top-6 border border-theme-00 rounded absolute p-2"
               >
                  {text}
               </mark>
            )}
            <mark
               {...props}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
            >
               {title}
            </mark>
         </span>
      );
   }

   function Table({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
      const theadChild = children[0];
      const tbodyChild = children[1];

      let WIDTH = 0;
      const CHARACTER_WIDTH_FACTOR = 7;
      const MIN_COLUMN_PIXEL_WIDTH = 100

      const thElements = theadChild.props.children.props.children;
      if (Array.isArray(thElements)) {
         let maxContentLength = 0;

         thElements.forEach((thChild: ReactNode) => {
            const content = ((thChild as any).props.children);

            if (content.length > maxContentLength) {
               maxContentLength = content.length;
            }
         });

         WIDTH = Math.max(MIN_COLUMN_PIXEL_WIDTH, maxContentLength * CHARACTER_WIDTH_FACTOR);
      }

      const applyCellStyles = (element: ReactNode) => {
         if (!isValidElement(element)) {
            return element;
         }
         const className = `px-2 py-2 text-left border border-gray-300 min-w-[${WIDTH}px] text-wrap  align-top`

         if (element.type === 'th') {
            const newClassName = `text-xs font-medium text-gray-600 uppercase ${className}`;
            return cloneElement(element, {
               className: newClassName.trim(),
               style: null,
               children: Children.map(element.props.children, applyCellStyles),
            });
         }

         if (element.type === 'td') {
            const newClassName = `text-sm text-gray-800 break-words ${className}`;
            return cloneElement(element, {
               className: newClassName.trim(),
               style: null,
               children: Children.map(element.props.children, applyCellStyles),
            });
         }

         if (element.props.children) {
            return cloneElement(element, {
               children: Children.map(element.props.children, applyCellStyles),
            });
         }

         return element;
      };

      const styledThead = applyCellStyles(theadChild);
      const styledTbody = applyCellStyles(tbodyChild);

      return (
         <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
               <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden rounded-lg shadow-md border border-gray-200">
                     <table className="min-w-full divide-y divide-gray-300 table-fixed">
                        {
                           cloneElement(styledThead, {
                              className: "bg-gray-100",
                              style: null,
                           })
                        }
                        {
                           cloneElement(styledTbody, {
                              className: "divide-y divide-gray-200 bg-white",
                              style: null,
                           })
                        }
                     </table>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   function P({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
      return (
         <Paragraph {...props} >
            {children}
         </Paragraph>
      );
   }

   function H1({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <header>
            <h1 {...props} className="font-bold mb-2 text-2xl" >
               {children}
            </h1>
            <hr />
         </header>
      );
   }

   function H2({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <>
            <h2 {...props} className="font-bold mb-2 text-xl" >
               {children}
            </h2>
            <hr />
         </>
      );
   }

   function H3({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <>
            <h3 {...props} className="font-bold mb-2 text-lg" >
               {children}
            </h3>
            <hr />
         </>
      );
   }
   function H4({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <h4 {...props} className="font-bold mb-2 text-base" >
            {children}
         </h4>
      );
   }
   function H5({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <h5 {...props} className="font-bold mb-2 text-sm" >
            {children}
         </h5>
      );
   }

   function H6({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
      return (
         <h6 {...props} className="font-bold mb-2 text-xs" >
            {children}
         </h6>
      );
   }

   function Ul({ children, ...props }: HTMLAttributes<HTMLUListElement>) {

      const filteredChildren = children.filter(child => {
         if (typeof child === 'string' && child.trim() === '') {
            return false;
         }
         return child !== null && child !== undefined;
      });

      let title: ReactNode | null = null;
      let listItems: ReactNode[] = [];

      filteredChildren.forEach(child => {
         if (isValidElement(child) && typeof child.props.children === 'string' && child.props.children.includes("title&>")) {
            title = child.props.children.replace('title&>', '').trim();
         } else {
            listItems.push(child);
         }
      });

      return (
         <>
            {title && (
               <p className="font-bold text-gray-800 mb-1 border-b border-gray-300 inline-block">
                  {title}
               </p>
            )}
            <ul {...props} className="m-0 p-0 list-disc flex flex-col gap-2 pl-6 text-gray-700">
               {listItems}
            </ul>
         </>
      );
   }

   return (
      <Markdown
         remarkPlugins={[remarkGfm]}
         rehypePlugins={[rehypeRaw]}
         components={{ ul: Ul, code: Code, p: P, h1: H1, h2: H2, h3: H3, h4: H4, h5: H5, h6: H6, mark: MARK, table: Table }}>
         {children}
      </Markdown>
   );
}

function getTitle(text: string): { title: string | null; text: string } {
   const regex = /&title>(.*?)<title&/;

   const match = text?.match(regex);

   if (match && match[1] !== undefined) {
      const title = match[1];
      const textWithoutTitle = text.replace(regex, '');
      return { title, text: textWithoutTitle };
   } else {
      return { title: null, text };
   }
}
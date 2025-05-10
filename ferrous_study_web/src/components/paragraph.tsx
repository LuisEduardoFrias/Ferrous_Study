import {ReactNode} from 'react'

export default function Paragraph({ text, children, className }: { text: string, children:ReactNode, className?: string }) {
  return (
    <p
      style={{
        textWrap: 'pretty',
        hyphens: 'auto',
        //marginBlock: '1em',
        marginBlock: '1lh',
        marginTrim: 'none',
        hyphenateLimitChars: '3 2',
      }}
      className={`text-[14px] ${className}`}
    >
      {text}
      {children}
    </p>
  )
}
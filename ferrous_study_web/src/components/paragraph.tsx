import { ReactNode } from 'react'

export default function Paragraph({  children, className }: { children: ReactNode, className?: string }) {
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
      {children}
    </p>
  )
}
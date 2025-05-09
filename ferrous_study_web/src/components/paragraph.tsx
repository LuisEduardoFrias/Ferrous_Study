export default function Paragraph({ text, className }: { text: string, className?: string }) {
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
    </p>
  )
}
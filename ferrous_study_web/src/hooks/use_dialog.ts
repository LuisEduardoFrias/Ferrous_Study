import { useRef } from 'react'
export function useDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return {
    dialogRef,
    open: () => (dialogRef.current as any as HTMLDialogElement)?.showModal(),
    close: () => (dialogRef.current as any as HTMLDialogElement)?.close()
  };
}
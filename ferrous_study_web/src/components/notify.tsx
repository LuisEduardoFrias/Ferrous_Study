import { useId, forwardRef } from 'react';
import type { ReactNode, ForwardedRef } from 'react';
import { createPortal } from 'react-dom'
import '../styles/notify.css'

type TypeValidstionsProps = {
  children: ReactNode,
  okey: () => void,
  cancel: () => void
}

const Notify = forwardRef<HTMLDialogElement, TypeValidstionsProps>(function Notify({ children, okey, cancel }: TypeValidstionsProps, ref: ForwardedRef<HTMLDialogElement>) {
  const identity = useId();

  return (
    createPortal(
      <dialog
        area-modal='true'
        area-labelledby='modal-title'
        id={`Modal-${identity}`}
        ref={ref}
        // style={{ backgroundImage: `url('/metal_rust.webp')` }}
        className="modal w-5/6 mx-4 max-w-[800px] bg-[#202020cb] text-theme-0  ">
        {children}
        <footer>
          <button onClick={() => cancel()}>
            Cancelar
          </button>
          <button onClick={() => okey()}>
            Okey
          </button>
        </footer>
      </dialog>
      , document.body)
  );
});

export default Notify;
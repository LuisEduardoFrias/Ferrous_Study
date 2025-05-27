import { ReactNode } from 'react';

interface OptionProps {
   children: ReactNode;
   on_click?: () => void; // Hago on_click opcional
}

export default function Option({ children, on_click }: OptionProps): JSX.Element {
   return (
      <button
         className="text-theme-0 bg-transparent border-none p-0 focus:outline-none transition-transform duration-150 active:scale-95 hover:scale-105 w-8 h-8 flex justify-center items-center"
         onClick={on_click} // Asegúrate de pasar el on_click si existe
      >
         {children}
      </button>
   );
}

import { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface TablePanelProps {
   on_click: (rows: number, cols: number) => void;
}

export default function TablePanel({ on_click }: TablePanelProps) {
   const [rows, set_rows] = useState<number | undefined>(undefined);
   const [cols, set_cols] = useState<number | undefined>(undefined);
   const col_input_ref = useRef<HTMLInputElement>(null);

   const handle_change = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const numeric_value = parseInt(value, 10);

      if (!isNaN(numeric_value) && numeric_value >= 0) {
         if (name === 'row') {
            set_rows(numeric_value);
         } else if (name === 'col') {
            set_cols(numeric_value);
         }
      } else if (value === '') {
         if (name === 'row') {
            set_rows(undefined);
         } else if (name === 'col') {
            set_cols(undefined);
         }
      }
   };

   const handle_click = () => {
      if (rows !== undefined && cols !== undefined) {
         on_click(rows, cols);
      } else {
         alert('Por favor, ingresa un número válido de filas y columnas.');
      }
   };

   const handle_key_down = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && col_input_ref.current === document.activeElement && rows !== undefined && cols !== undefined) {
         on_click(rows, cols);
      }
   };

   return (
      <div className="absolute top-12 left-5 bg-gray-600 p-5 rounded-md shadow-md z-10 flex gap-2 items-center">
         <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            name="row"
            placeholder="Filas"
            autoFocus
            type="number"
            value={rows !== undefined ? rows : ''}
            onChange={handle_change}
         />
         <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-32"
            name="col"
            placeholder="Columnas"
            type="number"
            value={cols !== undefined ? cols : ''}
            onChange={handle_change}
            onKeyDown={handle_key_down}
            ref={col_input_ref}
         />
         <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 cursor-pointer"
            onClick={handle_click}
            disabled={rows === undefined || cols === undefined}
         >
            Agregar
         </button>
      </div>
   );
}

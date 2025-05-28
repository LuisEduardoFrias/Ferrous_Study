import {
    TableIcon, LinkIcon, DivideIcon, EnterIcon, ListIcon, SaveIcon, MarkIcon, CodeIcon, AskIcon
} from '../../assets/svgs';
import ButtonIcon from '../button_icon';
import TablePanel from './table_panel'; // Nuevo componente
import AskPanel from './ask_panel';     // Nuevo componente
//import Option from './option';           // Asumo que Option es un componente genérico para botones con ícono

type TextEditorToolbarProps = {
   on_mark: () => void;
   on_code: () => void;
   on_table: () => void;
   on_link: () => void;
   on_divide: () => void;
   on_enter: () => void;
   on_list: () => void;
   on_save_local: () => void;
   on_ask: () => void;
   show_table_panel: boolean;
   show_ask_panel: boolean;
   on_insert_table: (rows: number, cols: number) => void;
};

export default function TextEditorToolbar({
   on_mark,
   on_code,
   on_table,
   on_link,
   on_divide,
   on_enter,
   on_list,
   on_save_local,
   on_ask,
   show_table_panel,
   show_ask_panel,
   on_insert_table,
}: TextEditorToolbarProps) {
   return (
      <div className="relative w-full h-full grid grid-cols-[1fr,30px]">
         <div className="flex flex-row px-2 w-full h-full overflow-x-scroll gap-2 items-center">
            <ButtonIcon>
               <MarkIcon onClick={on_mark} />
            </ButtonIcon>
            <ButtonIcon>
               <CodeIcon onClick={on_code} />
            </ButtonIcon>
            <ButtonIcon>
               <TableIcon onClick={on_table} />
            </ButtonIcon>
            <ButtonIcon>
               <LinkIcon onClick={on_link} />
            </ButtonIcon>
            <ButtonIcon>
               <DivideIcon onClick={on_divide} />
            </ButtonIcon>
            <ButtonIcon>
               <EnterIcon onClick={on_enter} />
            </ButtonIcon>
            <ButtonIcon>
               <ListIcon onClick={on_list} />
            </ButtonIcon>
            <ButtonIcon>
               <SaveIcon onClick={on_save_local} />
            </ButtonIcon>
         </div>
         <div className="flex w-full h-full justify-center items-center">
            <ButtonIcon>
               <AskIcon onClick={on_ask} />
            </ButtonIcon>
         </div>
         {show_table_panel && <TablePanel on_click={on_insert_table} />}
         {show_ask_panel && <AskPanel />}
      </div>
   );
}

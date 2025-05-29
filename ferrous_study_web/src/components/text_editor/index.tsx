import { useState, useEffect, CSSProperties, useRef, ChangeEvent } from 'react';
import { getValue, saveValue, removeValue } from '../../hooks/local_storage';
import MarkdownRenderer from '../markdown_renderer';
import TextEditorToolbar from './text_editor_toolbar';
import TextEditorHeader from './text_editor_header';

type TextEditorProps = {
   file_name: string;
   on_save: (text_value: string) => void;
   class_name?: string;
   style?: CSSProperties;
   default_value?: string;
};

export default function TextEditor({ on_save, file_name, default_value = '' }: TextEditorProps) {
   const [view, set_view] = useState(true);
   const [show_table_panel, set_show_table_panel] = useState(false);
   const [show_ask_panel, set_show_ask_panel] = useState(false);
   const textarea_ref = useRef<HTMLTextAreaElement | null>(null);
   const [text_value, set_text_value] = useState(default_value);

   useEffect(() => {
      set_text_value(getValue('textEditClass') ?? default_value);
   }, [default_value]);

   function handler_change_text(event: ChangeEvent<HTMLTextAreaElement>) {
      set_text_value(event.target.value);
   }

   const insert_text_at_cursor = (new_text: string) => {
      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);
      }
   };

   const wrap_selected_text = (prefix: string, suffix: string, placeholder: string = '') => {
      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const text_to_insert = selected_text ? selected_text : placeholder;

         const new_text = `${prefix}${text_to_insert}${suffix}`;
         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);

         // Reposicionar el cursor si se insertó un placeholder
         if (!selected_text && textarea_ref.current) {
            textarea_ref.current.selectionStart = selection_start + prefix.length;
            textarea_ref.current.selectionEnd = selection_start + prefix.length + placeholder.length;
         }
      }
   };

   const handle_mark = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         if (selection_start === selection_end) {
            return;
         }

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const parts = selected_text.split('&>');

         if (parts.length === 2) {
            const new_text = `<mark>&title>${parts[0]}<title&${parts[1]}</mark>`;
            const new_value =
               textarea.value.substring(0, selection_start) +
               new_text +
               textarea.value.substring(selection_end);

            set_text_value(new_value);
         }
      }
   };

   const handle_link = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         if (selection_start === selection_end) {
            return;
         }

         const selected_text = textarea.value.substring(selection_start, selection_end);
         const parts = selected_text.split('&>');

         if (parts.length === 2) {
            const new_text = `[${parts[0]}](${parts[1]})`;
            const new_value =
               textarea.value.substring(0, selection_start) +
               new_text +
               textarea.value.substring(selection_end);

            set_text_value(new_value);
         }
      }
   };

   const handle_table = (rows: number, cols: number) => {
      set_show_table_panel(false);

      if (textarea_ref.current) {
         const textarea = textarea_ref.current;
         const selection_start = textarea.selectionStart;
         const selection_end = textarea.selectionEnd;

         const col_separator = "------|";
         const row_separator = "      |";
         const new_line = "\n";

         let separator_line = "|";
         for (let i = 0; i < cols; i++) {
            separator_line += row_separator;
         }

         let header_row = "|";
         for (let i = 0; i < cols; i++) {
            header_row += col_separator;
         }

         let body = "";
         for (let i = 0; i < rows; i++) {
            let row = "|";
            for (let j = 0; j < cols; j++) {
               row += row_separator;
            }
            body += row + new_line;
         }

         const new_text = separator_line + new_line + header_row + new_line + body;

         const new_value =
            textarea.value.substring(0, selection_start) +
            new_text +
            textarea.value.substring(selection_end);

         set_text_value(new_value);
      }
   };

   const handle_divide = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("<hr />\n");
   };

   const handle_enter = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("<br />\n");
   };

   const handle_list = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      insert_text_at_cursor("- title&>\n- ");
   };

   const handle_content_code = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      wrap_selected_text('```rust\n&title><title&\n', '\n```', 'tu_código_aqui');
   };

   const handle_save_code = () => {
      set_show_table_panel(false);
      set_show_ask_panel(false);
      saveValue(file_name, text_value);
   };

   const handle_publish = () => {
      removeValue(file_name)
      on_save(text_value);
   };

   return (
      <div className="p-2 w-full h-[calc(100dvh-50px)] flex flex-col gap-2">

         <div className="relative grid grid-rows-2 gap-0 w-full items-center rounded-t-md px-2 h-20 bg-gray-700">
            <TextEditorHeader
               file_name={file_name}
               on_view_change={set_view}
               on_publish={handle_publish}
            />
            <TextEditorToolbar
               on_mark={handle_mark}
               on_code={handle_content_code}
               on_table={() => { set_show_ask_panel(false); set_show_table_panel(!show_table_panel); }}
               on_link={handle_link}
               on_divide={handle_divide}
               on_enter={handle_enter}
               on_list={handle_list}
               on_save_local={handle_save_code}
               on_ask={() => { set_show_table_panel(false); set_show_ask_panel(!show_ask_panel); }}
               show_table_panel={show_table_panel}
               show_ask_panel={show_ask_panel}
               on_insert_table={handle_table}
            />
         </div>

         <div className="flex flex-col w-full h-[calc(100dvh-140px)]">
            {view ? (
               <textarea
                  ref={textarea_ref}
                  className="flex-grow resize-none w-full p-4 font-sans text-base rounded-b-md leading-relaxed border border-gray-300 focus:outline-none focus:border-blue-500"
                  value={text_value}
                  onChange={handler_change_text}
                  placeholder="Escribe algo aquí..."
               />
            ) : (
               <div className="h-full overflow-auto rounded-b-md border border-blue-500 px-2">
                  <MarkdownRenderer>{text_value}</MarkdownRenderer>
               </div>
            )}
         </div>
      </div>
   );
}

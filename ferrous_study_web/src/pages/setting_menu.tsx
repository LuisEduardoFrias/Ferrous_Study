import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { SaveIcon, AddIcon, LoadingIcon, SuccessIcon, ErrorIcon } from '../assets/svgs';
import { githubServiceApi } from '../services/github_service';
import { useTitle } from '../hooks/use_title'
import type { TMenu } from '../types/menu';
import type { TClass } from '../types/class';
import ButtonIcon from '../components/button_icon';
import { useDialog } from '../hooks/use_dialog';
import Notify from '../components/notify';
import { splitMenuOptions } from '../hooks/split_menu_options';
import { useStore } from '../state_warehouse/index'
import Loading from '../components/loading'
import Ul from '../components/ul'
import type { TServiceResult } from '../types/service_result'

export default function Menu() {
   useTitle('Configuracion del menu')
   const dataMenu = useStore((state) => state.dataMenu);
   const dataClass = useStore((state) => state.dataClass);
   const initial_state = useStore((state) => state.initial_state);
   const [content, setContent] = useState<TMenu[]>([]);
   const [optionHidden, setOptionHidden] = useState<TMenu[]>([]);
   const [classroomIdsArray, setClassroomIdsArray] = useState<TClass[]>([]);
   const [editable, setEditable] = useState('');
   const [loading, setLoading] = useState(false);
   const { dialogRef: notifyContentRef, open: openContentNotify, close: closeContentNotify } = useDialog();
   const { dialogRef, open, close } = useDialog();
   const divRef = useRef<HTMLDivElement>(null);
   const inputRefs = useRef<{ [key: string]: HTMLInputElement | null; }>({});
   const [showLoading, setShowLoading] = useState(false);
   const [contentErrorMessage, setContentErrorMessage] = useState<TServiceResult>({ message: '' });

   useEffect(() => {
      setLoading(true);
      try {
         // console.log('validando: ', dataClass);

         setClassroomIdsArray(orderAsc(dataClass));

         const { classroom, authorizedPages } = splitMenuOptions(dataMenu);
         setContent(classroom);
         setOptionHidden(authorizedPages);
      } catch (error) {
         console.error("Error fetching menu:", error);
      } finally {
         setLoading(false);
      }
   }, [dataMenu, dataClass]);

   useEffect(() => {
      if (editable && inputRefs.current[editable]) {
         inputRefs.current[editable].focus();
      }
   }, [editable]);

   function handlerRemove(key: string) {
      const allFilter = (item: TMenu) => {
         if (item?.subMenu)
            item.subMenu = item.subMenu.filter(allFilter);

         return item.key !== key;
      };

      setContent(prevContent => prevContent.filter(allFilter));
   }

   function handlerAdd(keys?: string[]) {
      const link: string = "/classroom/$classroomId";

      setContent(prevContent => {
         const newContent = [...prevContent];

         function insertNewItemRecursive(items: TMenu[], currentKeys: string[]): TMenu[] {
            if (currentKeys.length === 1) {
               const targetKey = currentKeys[0];
               return items.map(item => {
                  if (item.key === targetKey) {
                     const newSubKey = item.subMenu ? `${targetKey}-${item.subMenu.length}` : `${targetKey}-0`;
                     const newItem: TMenu = { key: newSubKey, to: link, text: '', isActive: false, params: undefined };
                     return { ...item, params: undefined, subMenu: item.subMenu ? [...item.subMenu, newItem] : [newItem] };
                  }
                  return item;
               });
            } else if (currentKeys.length > 1) {
               const firstKey = currentKeys[0];
               const remainingKeys = currentKeys.slice(1);
               return items.map(item => {
                  if (item.key === firstKey && item.subMenu) {
                     return { ...item, subMenu: insertNewItemRecursive(item.subMenu, remainingKeys) };
                  }
                  return item;
               });
            }
            return items; // Si no se encuentra la clave, devuelve el array sin cambios
         }

         if (!keys || keys.length === 0) {
            const newKey = `${newContent.length}`;
            const newItem: TMenu = { key: newKey, to: link, text: '', isActive: false };
            return [...newContent, newItem];
         } else {
            return insertNewItemRecursive(newContent, keys);
         }
      });
   }

   function handlerChangeLink(key: string, value: string) {
      setContent(prevContent => {
         return prevContent.map(item => {
            function updateLinkRecursive(currentItem: TMenu): TMenu {
               if (currentItem.key === key) {
                  if (currentItem.params) {
                     return { ...currentItem, params: { ...currentItem.params, classroomId: value } };
                  } else {
                     return { ...currentItem, params: { classroomId: value } };
                  }
               }
               if (currentItem.subMenu) {
                  return { ...currentItem, subMenu: currentItem.subMenu.map(updateLinkRecursive) };
               }
               return currentItem;
            }
            return updateLinkRecursive(item);
         });
      });
   }

   function handlerEditable(key: string) {
      setEditable(key);
   }

   function handlerChange(key: string, event: ChangeEvent<HTMLInputElement>) {
      setContent(prevContent => {
         function updateItemRecursive(items: TMenu[], targetKey: string, newValue: string): TMenu[] {
            return items.map(item => {
               if (item.key === targetKey) {
                  return { ...item, text: newValue };
               }
               if (item.subMenu) {
                  return { ...item, subMenu: updateItemRecursive(item.subMenu, targetKey, newValue) };
               }
               return item;
            });
         }
         return updateItemRecursive(prevContent, key, event.target.value);
      });
   }

   function handlerSave() {
      setLoading(true);
      close();
      (async () => {
         try {
            setShowLoading(true);
            const lastItem = content.at(-1);

            const id = parseInt(lastItem?.key ?? '1000') + 1;

            const newContent = [...content];
            newContent.push(...optionHidden.map((item: TMenu, index: number) => ({ ...item, key: (id + index).toString() })));

            const result = await githubServiceApi.updateFileContent("menu", newContent, 'json');

            if (!result) {
               setContentErrorMessage({ message: "Error updating menu" });
               return;
            }
            else {
               setContentErrorMessage({ ...result });
            }

            if (result?.data) {
               initial_state();
               setShowLoading(false);
            }
            
            openContentNotify();
         } catch (error) {
            console.error("Error updating menu:", error);
         } finally {
            setLoading(false);
         }
      })();
   }

   return (
      <div ref={divRef} className="p-2 bg-gray-900 text-theme-0">
         <div className="relative flex justify-end items-center bg-gray-800 rounded px-3 h-20">
            <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl text-center" >Menú</h1>
            <div className="flex h-full gap-4 ">
               <ButtonIcon>
                  <AddIcon onClick={() => handlerAdd()} />
               </ButtonIcon>
               <ButtonIcon onClick={open} disabled={loading}>
                  {loading ? <LoadingIcon className="progress" /> : <SaveIcon />}
               </ButtonIcon>
            </div>
         </div>
         <Notify ref={dialogRef} okey={handlerSave} cancel={close}>
            <span className="block text-xl font-semibold text-gray-800 mb-8 dark:text-gray-200 mb-2">
               ¡Se guardaran los datos!
            </span >
         </Notify>
         <Notify
            ref={notifyContentRef}
            okey={closeContentNotify}
         >
            {contentErrorMessage?.data ?
               <SuccessIcon /> :
               <ErrorIcon />
            }
            <span className={`block text-xl font-semibold ${contentErrorMessage?.data ? "text-green-500" : "text-red-500"} mb-2`}>
               ¡Atención!
            </span>
            <span className="block text-base text-gray-700 dark:text-gray-300">
               {contentErrorMessage.message}
            </span>
         </Notify>

         {showLoading &&
            <div className="bg-[rgba(96,96,96,0.441)] z-30 pt-20 backdrop-blur-sm w-full h-full absolute top-0 left-0">
               <div className="w-full h-44">
                  <Loading />
               </div>
            </div>
         }
         <div className="w-[34rem] px-2 mt-3">
            <Ul
               onChange={handlerChange}
               content={content}
               classArray={classroomIdsArray}
               onRemove={handlerRemove}
               onChangeLink={handlerChangeLink}
               onAdd={handlerAdd}
               isEditable={editable}
               onEditable={handlerEditable}
               inputRefs={inputRefs}
            />
         </div >
      </div >
   );
}

function orderAsc<T extends TClass>(arr: T[]): T[] {
   return arr?.sort((a, b) => a.name.localeCompare(b.name));
}
import { useState, useEffect, useRef, useCallback, memo, ReactNode } from 'react'
import { ArrowRightIcon } from '../assets/svgs'
import { Link } from '@tanstack/react-router'
import type { TMenu } from '../types/menu'
import { useStore } from '../state_warehouse/index'

type classOrder = {
   key: string;
   params: { classroomId: string; }
   to: string;
   isActive: boolean;
}

const TRANSITION = "absolute rounded-[8px] transition-all ease-in-out duration-500 active:bg-theme-3 shadow-md shadow-theme-o-4-d hover:outline-2 hover:outline-theme-3 disabled:shadow-none disabled:bg-gray-400 disabled:outline-0 disabled:outline-gray-400 ";

type TOptionBtn = {
   menu: classOrder[],
   index: number
}

function ButtonChangePage({ classroomId }: { classroomId: string }) {
   const dataMenu = useStore((state) => state.dataMenu)
   const [isShow, setShow] = useState(false);

   const [active, setActive] = useState(true);
   const [btnOption, setBtnOptions] = useState<TOptionBtn>();
   const timer = useRef<number | undefined>();

   useEffect(() => {
      if (isShow) {
         timer.current = setTimeout(() => {
            setShow(false)
         }, 4000)
         return () => clearTimeout(timer.current);
      }
   }, [isShow]);

   useEffect(() => {
      setActive(false);
      const menu = convertMenu(dataMenu);
      const index = menu.findIndex((obj) => obj.params.classroomId === classroomId)
      setBtnOptions({ menu, index });
   }, [classroomId]);

   function reTimer() {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
         setShow(false)
      }, 4000)
      setActive(true);
   }

   const getOptionRight = useCallback(() => {
      const opt = btnOption?.menu[btnOption?.index + 1];
      return opt?.isActive ? undefined : opt;
   }, [btnOption]);

   const getOptionLeft = useCallback(() => {
      return btnOption?.menu[btnOption?.index - 1]
   }, [btnOption]);

   const convertMenu = useCallback((menuItems: TMenu[]): classOrder[] => {
      const routes: classOrder[] = [];

      function processItem(item: TMenu) {
         if (item?.params?.classroomId) {
            routes.push({ key: item.key, params: item.params, to: item.to, isActive: item.isActive });
         }
         if (item?.subMenu) {
            for (const subItem of item.subMenu) {
               processItem(subItem);
            }
         }
      }

      for (const item of menuItems) {
         processItem(item);
      }

      return routes;
   }, [])

   return (
      <div className="fixed z-20 left-0 w-full top-1/2 flex items-center justify-between px-3">

         <ArrowBtn
            getOption={getOptionLeft()}
            disabled={active ? true : !getOptionLeft()}
            reTimer={reTimer}
            className={!isShow ? "-left-24" : "left-2"}
         >
            <ArrowRightIcon className="transform rotate-180" />
         </ArrowBtn>

         <ArrowBtn
            getOption={getOptionRight()}
            disabled={active ? true : !getOptionRight()}
            reTimer={reTimer}
            className={!isShow ? "-right-24" : 'right-2'}
         >
            <ArrowRightIcon />
         </ArrowBtn>

         <button onClick={() => setShow(true)} className={`${TRANSITION} h-12 w-12 bg-translucent border-none right-2 ${isShow && 'opacity-0 hidden'} `}></button>
      </div>
   )
}

export default memo(ButtonChangePage);

type ArrowBtnProps = {
   children: ReactNode,
   getOption: classOrder | undefined,
   disabled: boolean,
   reTimer: () => void,
   className: string
}

const ArrowBtn = memo(({ children, getOption, disabled, reTimer, className }: ArrowBtnProps) => {
   const DEFAULT_PARAMS = { classroomId: '' };

   return (
      <Link
         to={getOption?.to ?? ''}
         params={getOption?.params ?? DEFAULT_PARAMS}
         disabled={disabled}
         onClick={reTimer}
         className={`${TRANSITION} ${className}`}
      >
         <button disabled={disabled} >
            {children}
         </button>
      </Link>
   )
})
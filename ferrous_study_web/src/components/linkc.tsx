import { useState, ReactNode } from 'react'
import type { TMenu } from '../types/menu'
import { ArrowRightIcon } from '../assets/svgs'
import { Link } from '@tanstack/react-router'
import { useStore } from '../state_warehouse/index'

type LinkCProps = {
   to: string;
   text?: string;
   className?: string;
   isActive?: boolean;
   subMenu?: TMenu[];
   params?: { classroomId: string };
   children?: ReactNode;
};

export default function LinkC({ text, params, className, isActive, children, to, subMenu }: LinkCProps) {
   const on_show_drawer = useStore((state) => state.on_show_drawer)
   const classId = useStore((state) => state.classId)
   const [isOpen, setIsOpen] = useState(false);

   const hasSubMenu = subMenu && subMenu.length > 0;

   const handleClick = (isActive: boolean = false) => {
      if (hasSubMenu) {
         setIsOpen(!isOpen);
         return;
      }

      if (!isActive) {
         on_show_drawer(false)
      }
   };

   return (
      <div className="w-full" >
         <Link
            to={hasSubMenu ? '' : (!isActive ? '' : to)}
            params={params}
            disabled={!isActive}
            className={`flex items-center justify-between w-full ${className} `}
            onClick={() => handleClick(isActive)}
         >
            {text}
            <span className={`flex justify-between font-extrabold ${!isActive ? 'text-gray-500' : 'text-theme-3'} w-full hover:text-theme-o-3-l ${params?.classroomId === classId && 'text-theme-o-3-l'}`} >
               {children}
               {hasSubMenu && (
                  <span className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                     <ArrowRightIcon className="fill-current" />
                  </span>
               )}
            </span>

         </Link>

         {hasSubMenu && (
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'h-auto' : 'h-0'}`}>
               <ul className="ml-4">
                  {subMenu.map((subItem, index) => (
                     <li key={`${subItem.text}-${index}`} className="py-1 ">
                        <LinkC
                           key={text}
                           to={subItem.to}
                           isActive={subItem.isActive}
                           subMenu={subItem.subMenu}
                           params={subItem.params}
                        >
                           {subItem.text}
                        </LinkC>
                     </li>
                  ))}
               </ul>
            </div>
         )
         }
      </div>
   );
}
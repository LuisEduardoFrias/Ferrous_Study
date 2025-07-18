import { useState, useEffect, memo } from 'react'
import { useClickInSide } from '../hooks/use_click_on_side'
import { splitMenuOptions } from '../hooks/split_menu_options'
import { FerrisIcon, BookOpenIcon } from '../assets/svgs'
import ButtonIcon from './button_icon'
import { SignedIn } from './auth';
import LinkC from './linkc';
import type { TMenu } from '../types/menu'
import { useStore } from '../state_warehouse/index'

type MenuObj = {
   classroom: Array<TMenu[]>,
   authorizedPages: TMenu[],
   about: TMenu,
   suggestions: TMenu,
}

const Drawer = memo(function Drawer() {
   const show_drawer = useStore((state) => state.show_drawer)
   const dataMenu = useStore((state) => state.dataMenu)
   const on_show_drawer = useStore((state) => state.on_show_drawer)
   const [menu, setMenu] = useState<MenuObj>();
   const divRef = useClickInSide<HTMLDivElement>(() => on_show_drawer(false))

   //activa o desactiva el scroll del body si el drawer se nuestra o no.
   if (show_drawer) {
      document.body.style.overflow = 'hidden';
   } else {
      document.body.style.overflow = 'auto';
   }

   useEffect(() => {
      const { classroom, authorizedPages: authPage } = splitMenuOptions(dataMenu);

      const about = authPage.filter(item => item.to && item.to.includes('/about'))[0];
      const suggestions = authPage.filter(item => item.to && item.to.includes('/suggestions'))[0];
      const authorizedPages = authPage.filter(item => !item.to || (!item.to.includes('/about') && !item.to.includes('/suggestions')));


      setMenu({ classroom: createGroup(classroom), authorizedPages, suggestions, about })
   }, [dataMenu])

   useEffect(() => { }, [menu])

   return (
      <div ref={divRef} className={`fixed top-0 left-0 z-50 flex flex-row transition-custom duration-7ms ease-in-out ${show_drawer ? 'translate-x-0 backdrop-blur-[0.8px] bg-translucent' : '-translate-x-full backdrop-blur-[0px] bg-transparent'} w-full h-[100dvh]`} >

         <nav className="flex flex-col gap-2 max-w-[400px] min-w-[180px] bg-theme-d-4 shadow shadow-blue-800"   >

            <div className="w-full z-40 h-14 flex items-center justify-between rounded-br-2xl  p-1 bg-theme-3 shadow shadow-amber-300">
               <LinkC to="/" className="hover:text-theme-1-d">
                  <span className="flex gap-1 text-[14px] text-theme-4-d font-extrabold items-center" >Ferrous Study! <FerrisIcon className="bg-theme-4-d rounded-full" /></span>
               </LinkC>
               <ButtonIcon>
                  <BookOpenIcon onClick={() => on_show_drawer(false)} />
               </ButtonIcon>
            </div>

            <div className="flex flex-col pt-3 gap-2 p-2 pb-5 overflow-y-scroll">

               {menu && renderingGroup(menu?.classroom)}

               <hr className="my-2 border-[.4px] border-theme-3" />

               <SignedIn>
                  {menu &&
                     menu?.authorizedPages?.map(({ to, text, isActive, params, subMenu }) => (
                        <LinkC
                           key={text}
                           to={to}
                           isActive={isActive}
                           subMenu={subMenu}
                           params={params}
                        >
                           {text}
                        </LinkC>
                     ))}
               </SignedIn>

               {menu &&
                  <LinkC
                     key={menu?.suggestions?.text}
                     to={menu?.suggestions?.to}
                     isActive={menu?.suggestions?.isActive}
                     subMenu={menu?.suggestions?.subMenu}
                     params={menu?.suggestions?.params}
                  >
                     {menu?.suggestions?.text}
                  </LinkC>
               }
               {menu &&
                  <LinkC
                     key={menu?.about?.text}
                     to={menu?.about?.to}
                     isActive={menu?.about?.isActive}
                     subMenu={menu?.about?.subMenu}
                     params={menu?.about?.params}
                  >
                     {menu?.about?.text}
                  </LinkC>
               }
            </div>

         </nav>

      </div>
   );
});
export default Drawer;


function createGroup(array: TMenu[], groupLenght: number = 5): Array<TMenu[]> {
   const groups: Array<TMenu[]> = [];
   for (let i = 0; i < array.length; i += groupLenght) {
      groups.push(array.slice(i, i + groupLenght));
   }
   return groups;
}


function renderingGroup(groups: Array<TMenu[]>) {
   return groups.map((group, index) =>
      <div key={index} className="border-[0.3px] shadow-[0_0.3px_0.3px_0_rgba(0_0_0__0.5)] shadow-theme-1 border-[#ffffff1e] p-2">
         <LinkC
            to=""
            key={index}
            isActive={true}
            subMenu={group as TMenu[]}
         >
            Seccion {index + 1}
         </LinkC>
      </div>
   );
}

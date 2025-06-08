
import { memo } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { FerrisIcon, EditIcon, BookCloseIcon, BookOpenIcon } from '../assets/svgs'
import Search from './search'
import ButtonIcon from './button_icon'
import { SignedIn } from './auth';
import DarkToggleButton from './dark_toggle_btn';
import LanguageButton from './language-button'
import useIsMovil from '../hooks/use_is_movil'
import { useGlobalRef } from '../hooks/use_global_ref';
import { useStore } from '../state_warehouse/index'

const Navbar = memo(function Navbar() {
   const navigate = useNavigate();
   const { ref } = useGlobalRef<HTMLHeadElement>();
   const show_drawer = useStore((state) => state.show_drawer)
   const on_show_drawer = useStore((state) => state.on_show_drawer)
   const color = show_drawer ? 'bg-theme-d-3' : 'bg-theme-d-4';
   const isMovil = useIsMovil();

   const { param1, param2 } = useLocation({
      select: (location) => {
         const param1 = location.pathname.split("/")[1] ?? "";
         const param2 = location.pathname.split("/")[2] ?? "home_page";

         return { param1, param2 };
      }
   });

   // pt-14
   window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (ref.current) {
         if (scrollTop > 0) {
            ref.current.classList.add('fixed');
         } else {
            ref.current.classList.remove('fixed');
         }
      }
   });



   function EditButton() {
      return (
         <SignedIn>
            {((param1 === 'classroom' || param1 === '') && param2 !== 'newmd' && param2 !== 'edit') &&
               (<ButtonIcon>
                  <EditIcon onClick={() => navigate({ href: `/classroom/edit/${param2}`, viewTransition: true })} />
               </ButtonIcon>)
            }
         </SignedIn>
      )
   }

   function MenuButton() {
      return (
         <ButtonIcon>
            {show_drawer ?
               <BookOpenIcon /> :
               <BookCloseIcon onClick={() => on_show_drawer(true)} />
            }
         </ButtonIcon>
      )
   }

   return (
      <header ref={ref} id="navbar" className={` top-0 left-0 flex flex-row gap-2 items-center justify-center transition-all z-40 p-2 backdrop-blur-[0.8px] ${color} w-full h-14`} >
         <div className="flex items-center absolute left-4 ">
            <Link to="/" className="hover:text-theme-1-d mr-4"> <FerrisIcon className="bg-theme-4-d hover:bg-theme-4 hover:scale-110 rounded-full" /></Link>
            {
               isMovil ? <EditButton /> : <MenuButton />
            }
         </div>
         <Search />
         <div className="flex items-center absolute right-4 gap-2 ">
            <DarkToggleButton />
            <LanguageButton />
            {isMovil ? <MenuButton /> : <EditButton />}
         </div>
      </header>
   );
});
export default Navbar;


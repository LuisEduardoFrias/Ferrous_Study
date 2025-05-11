import { ReactNode, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { State, Actions } from '../state_warehouse'
import { useSubscriberState, useActions } from 'subscriber_state'
import { BookOpenIcon } from '../assets/svgs'
import Menu from '../jsons/menu.json'
import { useClickInSide } from '../hooks/use_click_in_side'
import { FerrisIcon, ArrowRightIcon } from '../assets/svgs'
import ButtonIcon from '../components/button_icon'

type TMenu = {
  to: string,
  text: string,
  displayQuality: string,
  params?: object,
  subMenu?: TMenu[]
}

const menu: TMenu[] = Menu;

export default function Drawer() {
  const [{ show_drawer }, { on_show_drawer }] = useSubscriberState<State, Actions>('show_drawer')
  const divRef = useClickInSide(() => on_show_drawer(false))

  if (show_drawer) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div ref={divRef} className={`fixed top-0 left-0 z-50 flex flex-row transition-custom duration-7ms ease-in-out ${show_drawer ? 'translate-x-0 backdrop-blur-[0.8px] bg-translucent' : '-translate-x-full backdrop-blur-[0px] bg-transparent'} w-full h-[100dvh]`} >

      <div className="flex flex-col gap-2 w-3/6 bg-theme-d-4 shadow shadow-blue-800"   >

        <div className="w-full h-14 flex justify-between p-2 bg-theme-3 shadow shadow-amber-300">
          <LinkC to="/" className="hover:text-theme-1-d">
            <span className="flex gap-1 text-[16px] text-theme-4-d font-extrabold items-center" >Ferrous Study! <FerrisIcon className="bg-theme-4 rounded-full" /></span>
          </LinkC>
          <ButtonIcon>
          <BookOpenIcon onClick={() => on_show_drawer(false)} />
          </ButtonIcon>
        </div>

        <div className="flex flex-col gap-2 p-2 overflow-y-scroll">

          {menu.map(({ to, text, displayQuality, params, subMenu }) => (
            <LinkC
              key={text}
              to={to}
              displayQuality={displayQuality}
              subMenu={subMenu}
              params={params}
            >
              {text}
            </LinkC>
          ))}

        </div>

      </div>

    </div>
  );
}

type LinkCProps = {
  to: string;
  text?: string;
  className?: string;
  displayQuality?: string;
  subMenu?: TMenu[];
  params?: object;
  children?: ReactNode;
};

function LinkC({ text, params, className, children, displayQuality, to, subMenu }: LinkCProps) {
  const { on_show_drawer } = useActions<Actions>()
  const [isOpen, setIsOpen] = useState(false);

  const hasSubMenu = subMenu && subMenu.length > 0;

  const handleClick = () => {
    if (hasSubMenu) {
      setIsOpen(!isOpen);
      return;
    }

    on_show_drawer(false)
  };

  return (
    <div className="w-full" >
      <Link
        to={hasSubMenu ? '#' : to}
        params={params}
        className={`flex items-center justify-between w-full text-theme-3 [&.active]:font-extrabold ${className}`}
        onClick={handleClick}
      >
        {text}
        <span className="text-theme-3 [&.active]:font-extrabold" >
          {children}
        </span>

        {hasSubMenu && (
          <span className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
            <ArrowRightIcon className="fill-current" />
          </span>
        )}
      </Link>

      {hasSubMenu && (
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <ul className="ml-4">
            {subMenu.map((subItem) => (
              <li key={subItem.text} className="py-2 px-4">
                <LinkC
                  key={text}
                  to={subItem.to}
                  displayQuality={subItem.displayQuality}
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
    </div >
  );
}
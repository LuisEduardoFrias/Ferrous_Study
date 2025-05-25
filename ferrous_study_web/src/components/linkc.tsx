import { useState } from 'react'
import {  ArrowRightIcon } from '../assets/svgs'
import { Link } from '@tanstack/react-router'
import { useStore } from '../state_warehouse/index'

type LinkCProps = {
  to: string;
  text?: string;
  className?: string;
  displayQuality?: string;
  subMenu?: TMenu[];
  params?: object;
  children?: ReactNode;
};

export default function LinkC({ text, params, className, children, to, subMenu }: LinkCProps) {
  const on_show_drawer = useStore((state) => state.on_show_drawer)
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
        to={hasSubMenu ? '' : to}
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
            {subMenu.map((subItem, index) => (
              <li key={`${subItem.text}-${index}`} className="py-2 px-4">
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
    </div>
  );
}
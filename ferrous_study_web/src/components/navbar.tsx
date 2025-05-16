import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { FerrisIcon, EditIcon, BookCloseIcon } from '../assets/svgs'
import Search from '../components/search'
import ButtonIcon from '../components/button_icon'
import useIsMovil from '../hooks/use_is_movil'
//import { useRouterState } from '@tanstack/react-router'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useStore } from '../state_warehouse/index'

export default function Navbar() {
  const navigate = useNavigate();
  //const state = useRouterState()
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

  function EditButton() {
    return (
      <>
        {((param1 === 'classroom' || param1 === '') && param2 !== 'newmd' && param2 !== 'edit') &&
          (<ButtonIcon>
            <EditIcon onClick={() => navigate({ href: `/classroom/edit/${param2}`, viewTransition: true })} />
          </ButtonIcon>)
        }
      </>
    )
  }

  function MenuButton() {
    return (
      <ButtonIcon>
        <BookCloseIcon onClick={() => on_show_drawer(true)} />
      </ButtonIcon>
    )
  }

  return (
    <header className={`fixed top-0 left-0 flex flex-row gap-2 items-center justify-center transition-all z-40 p-2 backdrop-blur-[0.8px] ${color} w-full h-14`} >
      <>
        <div className="flex items-center absolute left-4 ">
          <Link to="/" className="hover:text-theme-1-d mr-4"> <FerrisIcon className="bg-theme-4-d hover:bg-theme-4 hover:scale-110 rounded-full" /></Link>
          {
            isMovil ? <SignedIn><EditButton /></SignedIn> : <MenuButton />
          }
        </div>
        <Search />
        <div className="flex items-center absolute right-4 gap-2 ">
          <SignedOut>
            {param1 !== 'signinup' &&
              <Link to="/signinup" >
                <span className="text-theme-0 italic">{`*Unete`}</span>
              </Link>
            }
          </SignedOut>
          <UserButton />
          {
            isMovil ? <MenuButton /> : <SignedIn><EditButton /></SignedIn>
          }
        </div>
      </>
    </header>
  );
}

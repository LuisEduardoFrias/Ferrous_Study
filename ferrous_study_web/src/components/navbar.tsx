import { Link, useLocation, useNavigate, ParsedLocationType } from '@tanstack/react-router'
import { State, Actions, } from '../state_warehouse'
import { useSubscriberState } from 'subscriber_state'
import { BookCloseIcon } from '../assets/svgs'
import { FerrisIcon, EditIcon } from '../assets/svgs'
import Search from '../components/search'
import ButtonIcon from '../components/button_icon'
import useIsMovil from '../hooks/use_is_movil'
import { useRouterState } from '@tanstack/react-router'

export default function Narbar() {
  const navigate = useNavigate();
  const state = useRouterState()
  const { param1, param2 } = useLocation({
    select: (location) => {
      const param1 = location.pathname.split("/")[1] ?? "";
      const param2 = location.pathname.split("/")[2] ?? "home_page";

      return { param1, param2 };
    }
  });
  const [{ show_drawer }, { on_show_drawer }] = useSubscriberState<State, Actions>('show_drawer')
  const color = show_drawer ? 'bg-theme-d-3' : 'bg-theme-d-4';
  const isMovil = useIsMovil();

  function EditButton() {
    return (
      <>
        {(param1 === 'classroom' || param1 === "") &&
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
    <div className={`fixed top-0 left-0 flex flex-row gap-2 items-center justify-center transition-all z-40 p-2 backdrop-blur-[0.8px] ${color} w-full h-14`} >
      <div className="flex items-center absolute left-4 ">
        <Link to="/" className="hover:text-theme-1-d mr-4"> <FerrisIcon className="bg-theme-4-d hover:bg-theme-4 hover:scale-110 rounded-full" /></Link>
        {
          isMovil ? <EditButton /> : <MenuButton />
        }
      </div>
      <Search />
      <div className="flex items-center absolute right-4 ">
        {
          isMovil ? <MenuButton /> : <EditButton />
        }
      </div>
    </div>
  );
}

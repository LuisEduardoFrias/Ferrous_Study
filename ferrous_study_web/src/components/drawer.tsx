import { ReactNode } from 'rract'
import { Link } from '@tanstack/react-router'
import { State, Actions } from '../state_warehouse'
import { useSubscriberState } from 'subscriber_state'
import { BookOpenIcon } from '../assets/svgs'
import { useClickInSide } from '../hooks/use_click_in_side'
import { FerrisIcon } from '../assets/svgs'

export default function Drawer() {
  const [{ show_drawer }, { on_show_drawer }] = useSubscriberState<State, Actions>('show_drawer')
  const divRef = useClickInSide(() => on_show_drawer(false))

  if (show_drawer) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div ref={divRef} className={`absolute top-0 left-0 z-50 flex flex-row transition-custom duration-7ms ease-in-out ${show_drawer ? 'translate-x-0 backdrop-blur-[0.8px] bg-translucent' : '-translate-x-full backdrop-blur-[0px] bg-transparent'} w-full h-[100dvh]`} >

      <div className="flex flex-col gap-2 w-3/6 bg-theme-d-4 shadow shadow-blue-800"   >

        <div className="w-full h-14 flex justify-between p-2 bg-theme-3 shadow shadow-amber-300">
          <LinkC to="/" className="hover:text-theme-1-d">
            <span className="flex gap-1 text-[16px] font-extrabold items-center" >Ferrous Study! <FerrisIcon className="bg-theme-4 rounded-full" /></span>
          </LinkC>
          <BookOpenIcon onClick={() => on_show_drawer(false)} />
        </div>

        <div className="flex text-theme-3 flex-col gap-2 p-2 overflow-y-scroll">

          <LinkC to="/classroom/$classroomId" className="hover:text-theme-1-d" text="Class Room" params={{ classroomId: '123' }} />
          <LinkC to="/classroom/editClassroom/$editClassroomId" className="hover:text-theme-1-d" text="Edit Class Room" params={{ editClassroomId: '456' }} />
          <LinkC to="/about" className="hover:text-theme-1-d" text="About" />

        </div>

      </div>

    </div>
  );
}

type LinkCProps = {
  to: string,
  text?: string,
  className?: string,
  params?: object,
  children?: ReactNode,
}

function LinkC({ text, params, className, to, children }: LinkCProps) {
  return (
    <Link
      to={to}
      params={params}
      className={`[&.active]:font-bold ${className}`}
    >
      {text}
      {children}
    </Link>
  )
}
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { State, Actions } from '../state_warehouse'
import { useSubscriberState } from 'subscriber_state'
import { BookCloseIcon } from '../assets/svgs'
import { FerrisIcon } from '../assets/svgs'

export default function Narbar() {
  const [position, setPosition] = useState('relative');
  const [{ show_drawer }, { on_show_drawer }] = useSubscriberState<State, Actions>('show_drawer')
  const color = show_drawer ? 'bg-theme-d-3' : 'bg-theme-d-4';

  return (
    <div className={`${position} top-0 left-0 flex flex-row gap-2 items-center transition-all p-2 backdrop-blur-[0.8px] ${color} w-full h-14`} >
      <Link to="/" className="hover:text-theme-1-d mr-4"> <FerrisIcon className="bg-theme-4-d hover:bg-theme-4 hover:scale-110 rounded-full" /></Link>  <BookCloseIcon onClick={() => { setPosition("relative"); on_show_drawer(true); }} />
    </div>
  );
}

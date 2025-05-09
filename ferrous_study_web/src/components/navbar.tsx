import { useState } from 'react'
import { State, Actions } from '../state_warehouse'
import { useSubscriberState } from 'subscriber_state'
import { BookCloseIcon } from '../assets/svgs';

export default function Narbar() {
  const [position, setPosition] = useState('relative');
  const [{ show_drawer }, { on_show_drawer }] = useSubscriberState<State, Actions>('show_drawer')
  const color = show_drawer ? 'bg-theme-d-3' : 'bg-theme-d-4';

  return (
    <div className={`${position} top-0 left-0 flex flex-row items-center transition-all p-2 backdrop-blur-[0.8px] ${color} w-full h-14`} >
      <BookCloseIcon onClick={() => { setPosition("relative"); on_show_drawer(true); }} />
    </div>
  );
}

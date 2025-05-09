
import { createWarehouse, update } from 'subscriber_state'

export type State = {
  show_drawer: boolean,
}

export type Actions = {
  on_show_drawer: (isShow: boolean) => void,
}

function on_show_drawer(isShow: boolean) {
  update((state) => ({ ...state, show_drawer: isShow }));
}

createWarehouse<State, Actions>({
  show_drawer: false,
  //////
  on_show_drawer
});

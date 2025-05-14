import type { TMenu } from '../types/menu'
import { createWarehouse, update } from 'subscriber_state'

export type State = {
  show_drawer: boolean,
  search_data: { show: boolean, data: TMenu[] },
}

export type Actions = {
  on_show_drawer: (isShow: boolean) => void,
  on_search_data: (data: TMenu) => void,
}

function on_show_drawer(isShow: boolean) {
  update((state) => ({ ...state, show_drawer: isShow }));
}

function on_search_data(search_data: { show: boolean, data: TMenu[] }) {
  update((state) => ({ ...state, search_data }));
}

createWarehouse<State, Actions>({
  show_drawer: false,
  search_data: { show: false, data: [] },
  //////
  on_show_drawer,
  on_search_data
});


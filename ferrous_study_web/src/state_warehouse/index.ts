import type { TMenu } from '../types/menu'
import type { TClass } from '../types/class'
import { createWarehouse, update } from 'subscriber_state'
import { githubService } from '../services/github_service'
import { CacheEntry } from '../helps/memory_cache'
//import JsonMenu from '../jsons/menu.json';
//import JsonClass from '../jsons/class.json';

export type State = {
  cache: Record<string, CacheEntry<any>>;
  dataClass: TClass[],
  dataMenu: TMenu[],
  show_drawer: boolean,
  search_data: { show: boolean, data: TMenu[] },
}

export type Actions = {
  initial_state: () => void,
  on_show_drawer: (isShow: boolean) => void,
  on_search_data: (data: TMenu) => void,
  on_miss: (key: string, data: CacheEntry) => void,
  on_clear_cache: (key?: string) => void
}

async function initial_state() {
  const [resultClass, resultNenu] = await Promise.all([
    githubService.getFileContent("class", 'json'),
    githubService.getFileContent("menu", 'json')
  ]);

  update((state) => ({
    ...state,
    dataClass: JSON.parse(resultClass),
    dataMenu: JSON.parse(resultNenu)
  }));
}

function on_miss(key: string, data: CacheEntry) {
  update((state) => {
    const cache = state.cache;
    cache[key] = data;
    return ({ ...state, cache });
  });
}

function on_clear_cache(key?: string) {
  update((state) => {
    let cache = state.cache;

    if (key)
      delete cache[key];
    else
      cache = {};

    return ({ ...state, cache });
  });
}

function on_show_drawer(isShow: boolean) {
  update((state) => ({ ...state, show_drawer: isShow }));
}

function on_search_data(search_data: { show: boolean, data: TMenu[] }) {
  update((state) => ({ ...state, search_data }));
}

createWarehouse<State, Actions>({
  cache: {},
  dataClass: [],
  dataMenu: [],
  show_drawer: false,
  search_data: { show: false, data: [] },
  //////
  initial_state,
  on_miss,
  on_clear_cache,
  on_show_drawer,
  on_search_data
});


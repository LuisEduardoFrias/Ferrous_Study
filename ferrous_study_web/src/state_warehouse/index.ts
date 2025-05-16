import type { TMenu } from '../types/menu'
import type { TClass } from '../types/class'
//import { createWarehouse, update } from 'subscriber_state'
import { githubService } from '../services/github_service'
import type { CacheEntry } from '../hooks/use_memory_cache'
import { create } from 'zustand'

//import JsonMenu from '../jsons/menu.json';
//import JsonClass from '../jsons/class.json';
type searchData = { show: boolean, data: TMenu[] };

export type State = {
  cache: Record<string, CacheEntry<any>>;
  dataClass: TClass[],
  dataMenu: TMenu[],
  show_drawer: boolean,
  search_data: searchData,
  //
  initial_state: () => void,
  on_show_drawer: (isShow: boolean) => void,
  on_search_data: (data: searchData) => void,
  on_miss: (key: string, data: CacheEntry) => void,
  on_clear_cache: (key?: string) => void
}

const useStore = create<State>((set, get) => ({
  cache: {},
  dataClass: [],
  dataMenu: [],
  show_drawer: false,
  search_data: { show: false, data: [] },
  /////
  initial_state: async () => {
    const [resultClass, resultMennu] = await Promise.all([
      githubService.getFileContent("class", 'json'),
      githubService.getFileContent("menu", 'json')
    ]);

    if (resultClass && resultMennu)
      set({ dataClass: JSON.parse(resultClass), dataMenu: JSON.parse(resultMennu) });

  },

  on_miss: (key: string, data: CacheEntry) => {
    const cache = get().cache;
    cache[key] = data;
    set({ cache });
  },

  on_clear_cache: (key?: string) => {
    let cache = get().cache;

    if (key)
      delete cache[key];
    else
      cache = {};

    set({ cache });
  },

  on_show_drawer: (isShow: boolean) => {
    set({ show_drawer: isShow });
  },

  on_search_data: (search_data: searchData) => {
    set({ search_data });
  }
}))

export { useStore };


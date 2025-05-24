import type { TMenu } from '../types/menu'
import type { TClass } from '../types/class'
import type { TLanguages } from '../types/language'
import { githubServiceApi } from '../services/github_service'
import type { CacheEntry } from '../hooks/use_memory_cache'
import { saveValue, getValue } from '../hooks/local_storage'
import { create } from 'zustand'

type searchData = { show: boolean, data?: TMenu[] };

export type State = {
  cache: Record<string, CacheEntry<any>>;
  dataClass: TClass[],
  dataMenu: TMenu[],
  show_drawer: boolean,
  search_data: searchData,
  languages: TLanguages[],
  languageSelected: TLanguages,
  classId: string | null,
  //
  initial_state: () => void,
  on_show_drawer: (isShow: boolean) => void,
  on_search_data: (data: searchData) => void,
  on_miss: <T>(key: string, data: CacheEntry<T>) => void,
  on_clear_cache: (key?: string) => void,
  on_setClassId: (classId: string) => void,
  on_change_language: (languageSelected: TLanguages) => void,
  on_add_languages: (languages: TLanguages[]) => void,
}

const useStore = create<State>((set, get) => ({
  cache: {},
  dataClass: [],
  dataMenu: [],
  show_drawer: false,
  search_data: { show: false, data: [] },
  languages: [{ key: 'Español', value: "esp" }, { key: 'Ingles', value: 'ing' }, { key: 'Japones', value: 'jap' }, { key: 'Chino', value: 'chi' }, {
    key: 'Frances', value: 'fra'
  }],
  languageSelected: { key: 'Español', value: "esp" },
  classId: null,
  /////
  initial_state: async () => {
    const [resultClass, resultMennu] = await Promise.all([
      githubServiceApi.getFileContentByJson("class"),
      githubServiceApi.getFileContentByJson("menu")
    ]);

    let languageSelected = getValue<TLanguages>('language_selected');

    if (!languageSelected)
      languageSelected = get().languageSelected;

    if (resultClass && resultMennu)
      set({ dataClass: JSON.parse(resultClass), languageSelected, dataMenu: JSON.parse(resultMennu) });

  },

  on_miss: <T>(key: string, data: CacheEntry<T>) => {
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
  },

  on_setClassId: (classId: string) => {
    set({ classId });
  },

  on_change_language: (languageSelected: TLanguages) => {
    set({ languageSelected })
    saveValue<TLanguages>(languageSelected);
  },

  on_add_languages: (languages: TLanguages[]) => {
    set({ languages })
  },
}))

export { useStore };

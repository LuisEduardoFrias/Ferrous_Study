import { useRef, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
//import searchj from '../jsons/searchj.json'
import { githubServiceApi } from '../services/github_service'
import { useStore } from '../state_warehouse/index'

export default function useFilter() {
  const on_search_data = useStore((state) => state.on_search_data)
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>();
  const timer = useRef<number | null>(null);

  const executeDispatch = useCallback(() => {
    (async () => {
      const result = await githubServiceApi.searchContent(search);

      on_search_data({ show: true, data: result ?? [] });

      // on_search_data({show:true, data: searchj.content});

      setLoading(false);
    })()
  }, [setLoading, search])

  useEffect(() => {
    setLoading(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (search === '') {
      on_search_data({ show: false, data: [] });
      setLoading(false);
      return;
    }

    timer.current = setTimeout(() => {
      executeDispatch();
    }, 1300);

  }, [search, executeDispatch])

  function handlerSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value.trim())
  }

  return {
    loading, handlerSearch
  }
}
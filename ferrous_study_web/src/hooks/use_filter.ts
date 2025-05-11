import { useRef, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { useStore } from '../warehouse/index'

export default function useFilter() {
  const onSearch = (state) => {}
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const executeDispatch = useCallback(() => {
    onSearch({ search })
    setLoading(false);
  }, [setLoading, onSearch, search])

  useEffect(() => {
    setLoading(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (search === '') {
      executeDispatch()
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
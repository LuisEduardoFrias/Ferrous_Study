import { useRef, useState, useEffect, useCallback } from 'react'
import type { ChangeEvent } from 'react'
import { githubService } from '../services/github_service'

export default function useFilter() {
  const [content, setContent] = useState<string>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const executeDispatch = useCallback(() => {
    (async () => {
      const result = await githubService.searchContent(search);
      setContent(result);
      setLoading(false);
    })()
  }, [setLoading, search])

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
    content, loading, handlerSearch
  }
}
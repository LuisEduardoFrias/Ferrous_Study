import { memo } from 'react'
import { Link } from '@tanstack/react-router'
import type { TMenu } from '../types/menu'
import { useGlobalRef } from '../hooks/use_global_ref'
import { useClickOutside } from '../hooks/use_click_on_side'
import { useStore } from '../state_warehouse/index'

const SearchResults = memo(function SearchResults() {
  const search_data = useStore((state) => state.search_data)
  const on_search_data = useStore((state) => state.on_search_data)
  const { get } = useGlobalRef<HTMLInputElement>();
  const divRef = useClickOutside<HTMLDivElement>(() => handlerEffect());

  function handlerEffect() {
    const input = get<HTMLInputElement>("search");
    if (input)
      input.value = "";
    on_search_data({ show: false })
  }

  return (
    <>
      {
        search_data.show &&
        <div ref={divRef} className='fixed z-40 overflow-y-scroll max-h-[200px] left-[51%] -translate-x-1/2 top-14 shadow-md shadow-theme-o-4 rounded bg-theme-0 w-auto h-auto overflow-hidden border border-theme-3'>
          <>
            {search_data?.data &&
              search_data?.data?.length >= 1 ? (
              <ul className="w-max min-w-[175px]">
                {search_data?.data?.map(({ text, to, params }: TMenu) => (
                  <li key={text} className="px-3 py-2 hover:bg-theme-o-3-l hover:text-theme-1 transition-colors duration-200"> {/* Más padding y transición */}
                    <Link
                      to={to}
                      params={params}
                      className="block w-full h-full"
                      onClick={handlerEffect}
                    >
                      <span className="block text-sm text-theme-00 truncate">
                        {text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>) : (
              <div className="px-3 py-2 text-sm text-theme-00">
                No se encontraron resultados.
              </div>
            )}
          </>
        </div>
      }
    </>
  );
});

export default SearchResults;

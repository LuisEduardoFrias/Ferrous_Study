import { memo } from 'react'
import { SearchIcon } from '../assets/svgs'
import { LoadingIcon } from '../assets/svgs'
import { useGlobalRef } from '../hooks/use_global_ref'
import useFilter from '../hooks/use_filter'
import '../styles/search.css'

export default function Search() {
  const { loading, handlerSearch } = useFilter();
  const { ref } = useGlobalRef<HTMLInputElement>();

  const Loading_ = memo(function _CLoading() {
    return (
      <>
        {
          loading ?
            <div className="progress flex justify-center items-center">
              <LoadingIcon />
            </div> :
            <SearchIcon />
        }
      </>
    )
  }, (oldProp, newProp) => Object.is(oldProp, newProp));

  return (
    <div className='absolute z-40 left-1/2 -translate-x-1/2 py-2 pl-2 h-14 overflow-hidden flex items-center items-stretch gap-2'>
      <div ref={ref} id="search" className="search border w-44 sm:w-52 flex gap-2 pl-2">
        <Loading_ />
        <input type="search" ref={ref} name="search" placeholder="Buscar" onInput={handlerSearch} />
      </div>
    </div>
  )
}
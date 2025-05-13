import { memo, lazy, Suspense } from 'react'
import { SearchIcon, LoadingIcon } from '../assets/svgs'
import useFilter from '../hooks/use_filter'
import '../styles/search.css'

export default function Search() {
  const { loading, handlerSearch } = useFilter();

  const Loading = memo(function _CLoading() {
    return (
      <>
        {
          loading ?
            <div className='progress'><LoadingIcon /></div> :
            <SearchIcon />
        }
      </>)
  }, (oldProp, newProp) => Object.is(oldProp, newProp));

  return (
    <div className='py-2 pl-2 h-14 overflow-hidden flex items-center items-stretch gap-2'>
      <div className='search flex gap-2 pl-2'>
        <Loading />
        <input type="search" name="search" placeholder="Buscar" onInput={handlerSearch} />
      </div>
    </div>
  )
}
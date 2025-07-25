import { Outlet /*ScrollRestoration, createRootRoute*/ } from '@tanstack/react-router'
import Navbar from '../components/navbar'
import SearchResults from '../components/search_redults'

export default function Layout() {
   return (
      <div className="w-full min-h-[100dvh]" >
         <Navbar />
         <SearchResults />
         <Outlet />
      </div>
   )
}
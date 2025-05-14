import { ReactNode } from 'react'
import { Outlet, ScrollRestoration, createRootRoute } from '@tanstack/react-router'
import Navbar from './navbar'

export default function Layout() {
  return (
    <div className="w-full h-full text-black bg-white" >
      <Navbar />
      <Outlet />
    </div>
  )
}
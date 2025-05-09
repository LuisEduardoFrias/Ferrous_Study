import { ReactNode } from 'react'
import { Outlet } from '@tanstack/react-router'
import Narbar from './navbar'

type LayoutProps = {
  child: ReactNode
}

export default function Layout({ child }: LayoutProps) {
  return (
    <div className="w-full h-full text-black bg-white" >
      <Narbar />
      <Outlet />
    </div>
  )
}

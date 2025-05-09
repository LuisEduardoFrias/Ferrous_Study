import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Drawer from '../components/drawer'
import Layout from '../components/layout'

export const Route = createRootRoute({
  component: () => (
    <div className="w-full h-full" >
      <Drawer />
      <Layout />
    </div>
  ),
})
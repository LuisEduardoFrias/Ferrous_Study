import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Drawer from '../components/drawer'
import Layout from '../components/layout'

export const Route = createRootRoute({
  component: () => {
    return (
      <div id="root2" className="w-full h-full pt-14" >
        <Drawer />
        <Layout />
      </div>
    )
  },
})

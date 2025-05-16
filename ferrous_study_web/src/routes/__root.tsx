import { createRootRoute } from '@tanstack/react-router'
import Drawer from '../components/drawer'
import Layout from '../pages/layout'

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

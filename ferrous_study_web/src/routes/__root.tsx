import { createRootRoute } from '@tanstack/react-router'
import Drawer from '../components/drawer'
import Layout from '../pages/layout'
import { useGlobalRef } from '../hooks/use_global_ref';

export const Route = createRootRoute({
   component: Root
})

function Root() {
   const { ref } = useGlobalRef<HTMLDivElement>();

   return (
      <div id="root2" ref={ref} className="w-[100%] h-[100%] bg-transparent" >
         <Drawer />
         <Layout />
      </div>
   )
}

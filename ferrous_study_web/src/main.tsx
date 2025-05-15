import { StrictMode ,useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { routeTree } from './routeTree.gen'
import { Actions } from '../state_warehouse'
import { useActions } from 'subscriber_state'
import './index.css'
import './state_warehouse'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(<Main />)
}

function Main() {
  const { initial_state } = useActions<Actions>();

  useEffect(() => {
    initial_state();
  }, [])

  return (
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>
  )
}
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { Clerk } from '@clerk/clerk-js'
import { routeTree } from './routeTree.gen'
import { useStore } from './state_warehouse/index'
import { esES } from '@clerk/localizations'
import './index.css'

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

(async () => {
  const clerk = new Clerk(PUBLISHABLE_KEY);
  await clerk.load();
  (window as any).clerk = clerk;
})()


const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(<Main />)
}

function Main() {
  const initial_state = useStore((state) => state.initial_state)

  useEffect(() => {
    initial_state();
  }, [])

  return (
    <StrictMode>
      <ClerkProvider
        localization={esES}
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl="/"
        afterSignOutUrl='/'
        signInUrl='/'
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </StrictMode>
  )
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: beforeLoad_,
})

async function beforeLoad_({ location }) {
  const clerk = (window as any).clerk;
  
  if (!clerk.user) {
    throw redirect({
      to: '/probando este authenticated',//'/singinup',
      // search: {
      //           // Use the current location to power a redirect after login
      //           // (Do not use `router.state.resolvedLocation` as it can
      //           // potentially lag behind the actual current location)
      //           redirect: location.href,
      //         },
    })
  }
}
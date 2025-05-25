import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import PageLoading from './pages/page_loading';
import { routeTree } from './routeTree.gen';
import { useStore } from './state_warehouse/index';
import { esES } from '@clerk/localizations';
import './index.css';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<Main />);
}

function Main() {
  const initial_state = useStore((state) => state.initial_state);

  useEffect(() => {
    initial_state();
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

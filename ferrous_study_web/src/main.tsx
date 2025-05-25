import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useStore } from './state_warehouse/index';
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
    initial_state();

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

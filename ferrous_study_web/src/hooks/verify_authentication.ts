import { redirect, BeforeLoadFn } from '@tanstack/react-router';
import { Route as RootRoute } from '../routes/__root'; // Importa la Route de tu archivo raíz
import { AnyContext } from '@tanstack/react-router'; // Importa AnyContext si lo estás usando

export const verifyAuthentication: BeforeLoadFn<
  typeof RootRoute, // Usa typeof para referirte al tipo de tu RootRoute
  unknown,
  Record<string, any>, // O el tipo correcto de tus parámetros de ruta
  AnyContext, // O el tipo correcto de tu contexto
  AnyContext
> = async ({ location }) => {
  const clerk = (window as any).clerk;

  if (!clerk?.user) {
    throw redirect({
      to: '/signinup',
      search: {
        redirect: location.href,
      },
    });
  }

  // Si la autenticación es exitosa, puedes devolver cualquier valor que necesites
  // o simplemente no devolver nada (undefined).
};


  // const canManageSettings = clerk.session.checkAuthorization({
  //     permission: 'org:team_settings:manage',
  //   })



import { redirect, BeforeLoadFn } from '@tanstack/react-router'
import { Route as RootRoute } from '../routes/__root'
import { AnyContext } from '@tanstack/react-router'

export const verifyAuthentication: BeforeLoadFn<
  typeof RootRoute,
  unknown,
  Record<string, any>,
  AnyContext,
  AnyContext
> = async ({ location }) => {

  if (false) {
    throw redirect({
      to: '/signinup',
      search: {
        redirect_url: encodeURIComponent(location.href),
      },
    });
  }
  return;
};
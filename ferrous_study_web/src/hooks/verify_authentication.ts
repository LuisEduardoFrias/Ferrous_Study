import { redirect, BeforeLoadFn } from '@tanstack/react-router'
import { Route as RootRoute } from '../routes/__root'
import { AnyContext } from '@tanstack/react-router'
import { getUser } from '../components/auth';

export const verifyAuthentication: BeforeLoadFn<
   typeof RootRoute,
   unknown,
   Record<string, any>,
   AnyContext,
   AnyContext
> = async ({ location }) => {

   if (!getUser()) {
      throw redirect({
         to: '/',
      });
   }
   return;
};
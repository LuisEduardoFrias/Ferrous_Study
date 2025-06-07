import { redirect, BeforeLoadFn,AnyContext } from '@tanstack/react-router'
import { Route as RootRoute } from '../routes/__root'
import { getUser } from '../components/auth';

export const verifyAuthentication: BeforeLoadFn<
   typeof RootRoute,
   unknown,
   Record<string, any>,
   AnyContext,
   AnyContext
> = async (_) => {

   if (!getUser()) {
      throw redirect({
         to: '/',
      });
   }
   return;
};
import { redirect } from '@tanstack/react-router';

export async function verifyAuthentication({ location }) {
  if (!Clerk.user) {
    throw redirect({
      to: '/signinup',
      search: {
        redirect: location.href,
      },
    });
  }
}

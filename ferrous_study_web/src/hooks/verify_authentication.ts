import { redirect } from '@tanstack/react-router';

export function verifyAuthentication({ location }) {

  const clerk = (window as any).clerk;

  if (!clerk.user) {
    throw redirect({
      to: '/signinup',
      search: {
        redirect: location.href,
      },
    });
  }
}

  // const canManageSettings = clerk.session.checkAuthorization({
  //     permission: 'org:team_settings:manage',
  //   })
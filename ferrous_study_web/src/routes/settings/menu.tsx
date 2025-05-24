import { createFileRoute } from '@tanstack/react-router'
import { verifyAuthentication } from '../../hooks/verify_authentication'
import Menu from '../../pages/setting_menu'

export const Route = createFileRoute('/settings/menu')({
  component: Menu,
//  beforeLoad: verifyAuthentication
});

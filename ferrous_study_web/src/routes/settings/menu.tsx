import { createFileRoute } from '@tanstack/react-router'
import Menu from '../../pages/setting_menu'

export const Route = createFileRoute('/settings/menu')({
  component: Menu,
});

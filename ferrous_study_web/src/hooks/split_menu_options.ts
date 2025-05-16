import type { TMenu } from '../types/menu'

export function splitMenuOptions(data: TMenu[]) {
  const classroom = data?.filter((item:TMenu) => item.to && item.to.includes('/classroom/$classroomId'));
  const authorizedPages = data?.filter((item:TMenu) => !item.to || !item.to.includes('/classroom/$classroomId'));
  return { classroom, authorizedPages };
}
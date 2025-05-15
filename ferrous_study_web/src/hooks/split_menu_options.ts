
export function splitMenuOptions(data) {
  const classroom = data?.filter(item => item.to && item.to.includes('/classroom/$classroomId'));
  const authorizedPages = data?.filter(item => !item.to || !item.to.includes('/classroom/$classroomId'));
  return { classroom, authorizedPages };
}
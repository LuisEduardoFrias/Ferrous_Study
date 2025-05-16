
export type TMenu = {
  key:string,
  to: string,
  text: string,
  displayQuality: string,
  params?: {
    classroomId:string
  },
  subMenu?: TMenu[]
}
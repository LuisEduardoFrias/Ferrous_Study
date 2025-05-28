
export type TMenu = {
  key:string,
  to: string,
  text: string,
  displayQuality: boolean,
  params?: {
    classroomId:string
  },
  subMenu?: TMenu[]
}
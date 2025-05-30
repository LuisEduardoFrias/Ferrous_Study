
export type TMenu = {
   key: string,
   to: string,
   text: string,
   isActive: boolean,
   params?: {
      classroomId: string
   },
   subMenu?: TMenu[]
}
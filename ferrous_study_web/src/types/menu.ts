
export type TMenu = {
  to: string,
  text: string,
  displayQuality: string,
  params?: object,
  subMenu?: TMenu[]
}
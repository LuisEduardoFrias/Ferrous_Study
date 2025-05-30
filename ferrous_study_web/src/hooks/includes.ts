
export function Includes<T extends object>(array: T[], obj: T) {
   return array.some(ar => {
      const props: [keyof T] = Reflect.ownKeys(ar) as [keyof T];
      return props.every(pr => ar[pr] == obj[pr])
   });
}
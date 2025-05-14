
export function useTitle(title: string) {
  const fullTitle =` ${title && ' - ' +title}` 
  document.title = 'Ferrous Study!' + fullTitle ;
}
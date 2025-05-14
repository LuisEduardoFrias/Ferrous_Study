export function toCamelCase(text: string): string {
  return text?.substr(0, 1).toUpperCase() + text?.substr(1).replace(/_/g, ' ');
}
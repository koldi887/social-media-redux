export function capitalize(text: string | undefined) {
  return text && text[0].toUpperCase() + text.slice(1);
}

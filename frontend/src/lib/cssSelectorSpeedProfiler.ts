export function calculateSpecificity(selector: string): [number, number, number] {
  const ids = (selector.match(/#[a-zA-Z0-9_-]+/g) || []).length;
  const classes = (selector.match(/\.[a-zA-Z0-9_-]+|\[[^\]]+\]/g) || []).length;
  const tags = (selector.match(/(^|\s)[a-zA-Z0-9_-]+/g) || []).length;
  return [ids, classes, tags];
}

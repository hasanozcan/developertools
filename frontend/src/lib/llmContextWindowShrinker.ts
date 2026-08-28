export function shrinkPromptContext(text: string): { originalChars: number; shrunkChars: number; text: string } {
  const shrunk = text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
  return { originalChars: text.length, shrunkChars: shrunk.length, text: shrunk };
}

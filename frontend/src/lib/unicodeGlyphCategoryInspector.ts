export function inspectGlyph(char: string): { codePoint: string; hex: string } {
  const code = char.codePointAt(0) || 0;
  return { codePoint: 'U+' + code.toString(16).toUpperCase().padStart(4, '0'), hex: '0x' + code.toString(16) };
}

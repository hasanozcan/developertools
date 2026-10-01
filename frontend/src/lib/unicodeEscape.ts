export function encodeUnicode(input: string, encodeAscii: boolean): string {
  return Array.from(input)
    .map((char) => {
      const codePoint = char.codePointAt(0);
      if (codePoint === undefined) {
        return char;
      }

      if (!encodeAscii && codePoint <= 0x7f) {
        return char;
      }

      if (codePoint <= 0xffff) {
        return `\\u${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
      }

      return `\\u{${codePoint.toString(16).toUpperCase()}}`;
    })
    .join('');
}

export function decodeUnicode(input: string): string {
  // Match the original input once: decoded backslashes must not become new escapes.
  return input.replace(
    /\\u\{([0-9a-fA-F]+)\}|\\u([0-9a-fA-F]{4})|\\x([0-9a-fA-F]{2})/g,
    (_, braced: string | undefined, fixed: string | undefined, byte: string | undefined) => {
      if (braced !== undefined) {
        return String.fromCodePoint(Number.parseInt(braced, 16));
      }
      return String.fromCharCode(Number.parseInt((fixed ?? byte)!, 16));
    },
  );
}

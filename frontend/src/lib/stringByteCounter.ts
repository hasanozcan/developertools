export interface StringByteStats {
  characters: number;
  charactersNoSpaces: number;
  utf8Bytes: number;
  utf16Bytes: number;
  words: number;
  lines: number;
  paragraphs: number;
  asciiCount: number;
  nonAsciiCount: number;
}

export function calculateStringBytes(text: string): StringByteStats {
  const characters = Array.from(text).length; // accurately handle surrogate pairs / emojis
  const charactersNoSpaces = text.replace(/\s+/g, '').length;
  const utf8Bytes = new TextEncoder().encode(text).length;
  const utf16Bytes = text.length * 2;

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;
  const paragraphs = text.trim()
    ? text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0).length
    : 0;

  let asciiCount = 0;
  let nonAsciiCount = 0;

  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) <= 127) {
      asciiCount++;
    } else {
      nonAsciiCount++;
    }
  }

  return {
    characters,
    charactersNoSpaces,
    utf8Bytes,
    utf16Bytes,
    words,
    lines,
    paragraphs,
    asciiCount,
    nonAsciiCount,
  };
}

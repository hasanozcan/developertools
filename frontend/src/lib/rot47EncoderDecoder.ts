export function rot47(text: string): string {
  return text.split('').map(c => {
    const code = c.charCodeAt(0);
    if (code >= 33 && code <= 126) {
      return String.fromCharCode(33 + ((code + 14) % 94));
    }
    return c;
  }).join('');
}

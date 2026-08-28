export function splitTextColumns(text: string, delimiter = ','): string[][] {
  return text.split('\n').filter(Boolean).map(row => row.split(delimiter).map(c => c.trim()));
}

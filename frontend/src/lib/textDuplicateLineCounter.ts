export function countDuplicateLines(text: string): Array<{ line: string; count: number }> {
  const counts: Record<string, number> = {};
  for (const line of text.split('\n')) {
    if (line) counts[line] = (counts[line] || 0) + 1;
  }
  return Object.entries(counts).map(([line, count]) => ({ line, count })).sort((a, b) => b.count - a.count);
}

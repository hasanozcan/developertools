export function extractCsvColumns(csv: string, selectedHeaders: string[]): string {
  const lines = csv.trim().split(/\r\n|\r|\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return '';

  const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    return values;
  };

  const headers = parseCsvLine(lines[0]);
  const indices = selectedHeaders.map((sh) => headers.indexOf(sh)).filter((idx) => idx !== -1);

  if (indices.length === 0) return lines[0];

  const extractedLines: string[] = [];
  // Selected headers line
  extractedLines.push(indices.map((idx) => headers[idx]).join(','));

  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvLine(lines[i]);
    const filteredRow = indices.map((idx) => row[idx] ?? '');
    extractedLines.push(filteredRow.join(','));
  }

  return extractedLines.join('\n');
}

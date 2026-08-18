// Helper to parse detailed line & column from JSON.parse error messages

export interface ParsedJsonError {
  message: string;
  line?: number;
  column?: number;
  snippet?: string;
}

export function parseJsonSyntaxError(error: Error | string, jsonStr: string): ParsedJsonError {
  const message = typeof error === 'string' ? error : error.message || 'Invalid JSON syntax';

  let line: number | undefined;
  let column: number | undefined;

  // Pattern 1: "(line X column Y)" or "line X column Y"
  const lineColMatch = message.match(/line\s+(\d+)(?:,\s*|\s+)column\s+(\d+)/i);
  if (lineColMatch) {
    line = parseInt(lineColMatch[1], 10);
    column = parseInt(lineColMatch[2], 10);
  }

  // Pattern 2: "at position 123" or "position 123"
  if (line === undefined) {
    const posMatch = message.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const before = jsonStr.slice(0, Math.min(pos, jsonStr.length));
      const lines = before.split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }
  }

  // Pattern 3: "line 3" or "at line 3"
  if (line === undefined) {
    const lineMatch = message.match(/\bline\s+(\d+)\b/i);
    if (lineMatch) {
      line = parseInt(lineMatch[1], 10);
      column = 1;
    }
  }

  let snippet: string | undefined;
  if (line !== undefined) {
    const allLines = jsonStr.split('\n');
    const targetLine = allLines[line - 1];
    if (targetLine !== undefined) {
      snippet = targetLine.trim();
    }
  }

  return {
    message,
    line,
    column,
    snippet,
  };
}

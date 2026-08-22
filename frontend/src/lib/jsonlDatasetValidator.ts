export interface JsonlValidationResult {
  isValid: boolean;
  totalLines: number;
  validLines: number;
  invalidLines: number;
  estimatedTokens: number;
  errors: { line: number; error: string }[];
}

export function validateJsonlDataset(jsonlContent: string): JsonlValidationResult {
  const lines = jsonlContent.split(/\r?\n/);
  const errors: { line: number; error: string }[] = [];
  let validLines = 0;
  let totalChars = 0;

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const line = rawLine.trim();
    if (!line) return;

    totalChars += line.length;

    try {
      const obj = JSON.parse(line);
      if (typeof obj !== 'object' || obj === null) {
        errors.push({ line: lineNum, error: 'Line is not a valid JSON object.' });
        return;
      }

      if (!Array.isArray(obj.messages)) {
        errors.push({ line: lineNum, error: 'Missing required "messages" array.' });
        return;
      }

      if (obj.messages.length === 0) {
        errors.push({ line: lineNum, error: '"messages" array must not be empty.' });
        return;
      }

      for (let i = 0; i < obj.messages.length; i++) {
        const msg = obj.messages[i];
        if (!msg || typeof msg !== 'object') {
          errors.push({ line: lineNum, error: `Message #${i + 1} is not an object.` });
          return;
        }
        if (!['system', 'user', 'assistant', 'tool', 'function'].includes(msg.role)) {
          errors.push({ line: lineNum, error: `Invalid role "${msg.role}" in message #${i + 1}.` });
          return;
        }
        if (typeof msg.content !== 'string' && !Array.isArray(msg.content)) {
          errors.push({ line: lineNum, error: `Missing string "content" in message #${i + 1}.` });
          return;
        }
      }

      validLines++;
    } catch (err: unknown) {
      errors.push({ line: lineNum, error: 'SyntaxError: ' + (err instanceof Error ? err.message : String(err)) });
    }
  });

  const totalNonEmptyLines = lines.filter((l) => l.trim()).length;
  const estimatedTokens = Math.ceil(totalChars / 4);

  return {
    isValid: errors.length === 0 && totalNonEmptyLines > 0,
    totalLines: totalNonEmptyLines,
    validLines,
    invalidLines: errors.length,
    estimatedTokens,
    errors,
  };
}

export function sanitizeEnvFile(envContent: string): string {
  const lines = envContent.split(/\r?\n/);
  const sanitized: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) {
      sanitized.push(rawLine);
      continue;
    }

    const eqIdx = line.indexOf('=');
    if (eqIdx !== -1) {
      const key = line.substring(0, eqIdx).trim();
      sanitized.push(`${key}=`);
    } else {
      sanitized.push(line);
    }
  }

  return sanitized.join('\n');
}

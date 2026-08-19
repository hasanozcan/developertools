export function minifySqlQuery(sql: string): string {
  let minified = sql;

  // Remove multi-line comments /* ... */
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, ' ');

  // Remove single-line comments -- ...
  minified = minified.replace(/--.*$/gm, ' ');

  // Replace newlines and multi-spaces with single space
  minified = minified.replace(/\s+/g, ' ');

  // Clean spaces around commas, parentheses, operators
  minified = minified.replace(/\s*,\s*/g, ',');
  minified = minified.replace(/\s*\(\s*/g, '(');
  minified = minified.replace(/\s*\)\s*/g, ')');
  minified = minified.replace(/\s*;\s*/g, ';');

  return minified.trim();
}

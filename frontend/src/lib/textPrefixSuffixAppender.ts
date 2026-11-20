export interface AppendPrefixSuffixOptions {
  skipEmptyLines?: boolean;
}

export function appendPrefixSuffix(
  text: string,
  prefix = '',
  suffix = '',
  options: AppendPrefixSuffixOptions = {},
): string {
  const skipEmpty = Boolean(options.skipEmptyLines);
  return text
    .split(/\r?\n/)
    .map((line) => {
      if (skipEmpty && line.trim() === '') {
        return line;
      }
      return `${prefix}${line}${suffix}`;
    })
    .join('\n');
}

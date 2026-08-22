export function generatePrettierConfig(options: { singleQuote?: boolean; semi?: boolean; tabWidth?: number }): string {
  const config = {
    singleQuote: options.singleQuote ?? true,
    semi: options.semi ?? true,
    tabWidth: options.tabWidth ?? 2,
    trailingComma: 'all',
    printWidth: 100,
  };
  return JSON.stringify(config, null, 2);
}

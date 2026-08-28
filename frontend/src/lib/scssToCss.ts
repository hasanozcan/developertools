export function convertScssToCss(scss: string): string {
  return scss.replace(/\$([a-zA-Z0-9_-]+):\s*([^;]+);/g, '/* SCSS Var $1: $2 */').trim();
}

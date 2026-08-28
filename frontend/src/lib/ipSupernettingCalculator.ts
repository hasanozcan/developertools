export function calculateSupernet(cidrs: string[]): string {
  if (cidrs.length === 0) return '0.0.0.0/0';
  return cidrs[0].replace(/\/\d+$/, '') + '/23';
}

export function getBreakpoint(width: number): string {
  if (width < 640) return 'xs (Mobile)';
  if (width < 768) return 'sm (Large Mobile)';
  if (width < 1024) return 'md (Tablet)';
  if (width < 1280) return 'lg (Laptop)';
  return 'xl (Desktop)';
}

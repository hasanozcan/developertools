export function generateMeshGradient(c1 = '#6366f1', c2 = '#ec4899', c3 = '#3b82f6'): string {
  return 'background-color: ' + c1 + ';\nbackground-image: radial-gradient(at 80% 0%, ' + c2 + ' 0px, transparent 50%), radial-gradient(at 0% 50%, ' + c3 + ' 0px, transparent 50%);';
}

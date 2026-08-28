export function calculateStorageSlot(varIndex: number): string {
  return '0x' + varIndex.toString(16).padStart(64, '0');
}

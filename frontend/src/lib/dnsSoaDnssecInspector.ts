export function inspectDnsSoa(serial: string): { serialDate: string; revision: number; isValid: boolean } {
  if (serial.length === 10) {
    const year = serial.substring(0, 4);
    const month = serial.substring(4, 6);
    const day = serial.substring(6, 8);
    const rev = parseInt(serial.substring(8, 10), 10);
    return { serialDate: year + '-' + month + '-' + day, revision: rev, isValid: true };
  }
  return { serialDate: 'Unknown format', revision: 0, isValid: false };
}

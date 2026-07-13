export interface ChmodPermissions {
  owner: number;
  group: number;
  others: number;
  setuid: boolean;
  setgid: boolean;
  sticky: boolean;
}

function validateDigit(value: number): void {
  if (!Number.isInteger(value) || value < 0 || value > 7) {
    throw new Error('Permission values must be integers from 0 through 7.');
  }
}

export function parseChmod(value: string): ChmodPermissions {
  const normalized = value.trim().replace(/^0(?=[0-7]{3,4}$)/, '');
  if (!/^[0-7]{3,4}$/.test(normalized)) {
    throw new Error('Enter a three- or four-digit octal mode using digits 0 through 7.');
  }

  const digits = [...normalized].map(Number);
  const special = digits.length === 4 ? digits.shift()! : 0;
  return {
    owner: digits[0],
    group: digits[1],
    others: digits[2],
    setuid: Boolean(special & 4),
    setgid: Boolean(special & 2),
    sticky: Boolean(special & 1),
  };
}

function permissionTriplet(value: number): string[] {
  validateDigit(value);
  return [value & 4 ? 'r' : '-', value & 2 ? 'w' : '-', value & 1 ? 'x' : '-'];
}

export function formatChmod(permissions: ChmodPermissions): {
  octal: string;
  symbolic: string;
  command: string;
} {
  validateDigit(permissions.owner);
  validateDigit(permissions.group);
  validateDigit(permissions.others);

  const owner = permissionTriplet(permissions.owner);
  const group = permissionTriplet(permissions.group);
  const others = permissionTriplet(permissions.others);
  if (permissions.setuid) owner[2] = owner[2] === 'x' ? 's' : 'S';
  if (permissions.setgid) group[2] = group[2] === 'x' ? 's' : 'S';
  if (permissions.sticky) others[2] = others[2] === 'x' ? 't' : 'T';

  const special =
    Number(permissions.setuid) * 4 + Number(permissions.setgid) * 2 + Number(permissions.sticky);
  const basic = `${permissions.owner}${permissions.group}${permissions.others}`;
  const octal = special ? `${special}${basic}` : basic;
  return { octal, symbolic: [...owner, ...group, ...others].join(''), command: `chmod ${octal}` };
}

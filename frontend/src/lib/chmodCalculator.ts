export interface ChmodPermissions {
  user: { r: boolean; w: boolean; x: boolean };
  group: { r: boolean; w: boolean; x: boolean };
  others: { r: boolean; w: boolean; x: boolean };
}

export function calculateChmod(perms: ChmodPermissions): {
  octal: string;
  symbolic: string;
  command: string;
} {
  const calcDigit = (p: { r: boolean; w: boolean; x: boolean }) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const calcSym = (p: { r: boolean; w: boolean; x: boolean }) => (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');

  const u = calcDigit(perms.user);
  const g = calcDigit(perms.group);
  const o = calcDigit(perms.others);
  const octal = `${u}${g}${o}`;
  const symbolic = `-${calcSym(perms.user)}${calcSym(perms.group)}${calcSym(perms.others)}`;
  const command = `chmod ${octal} filename`;

  return { octal, symbolic, command };
}

export function parseChmodOctal(octalStr: string): ChmodPermissions {
  const clean = octalStr.replace(/[^0-7]/g, '').padStart(3, '0').slice(-3);
  const parseD = (d: number) => ({ r: (d & 4) !== 0, w: (d & 2) !== 0, x: (d & 1) !== 0 });
  return {
    user: parseD(parseInt(clean[0], 10)),
    group: parseD(parseInt(clean[1], 10)),
    others: parseD(parseInt(clean[2], 10)),
  };
}

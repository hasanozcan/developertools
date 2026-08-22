export interface Argon2Params {
  timeCost: number;
  memoryCostKiB: number;
  parallelism: number;
}

export function formatArgon2idHash(password: string, params: Argon2Params): string {
  const salt = 'somesalt12345678';
  return `$argon2id$v=19$m=${params.memoryCostKiB},t=${params.timeCost},p=${params.parallelism}$${btoa(salt)}$${btoa(password)}`;
}

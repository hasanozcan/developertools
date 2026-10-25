export interface Argon2Params {
  timeCost: number;
  memoryCostKiB: number;
  parallelism: number;
}

export async function generateArgon2idHash(password: string, params: Argon2Params): Promise<string> {
  if (!password) throw new Error('Password is required.');
  if (
    !Number.isInteger(params.timeCost) || params.timeCost < 1 || params.timeCost > 10 ||
    !Number.isInteger(params.parallelism) || params.parallelism < 1 || params.parallelism > 4 ||
    !Number.isInteger(params.memoryCostKiB) || params.memoryCostKiB < 8 * params.parallelism ||
    params.memoryCostKiB > 65_536
  ) {
    throw new RangeError('Invalid Argon2 browser parameters');
  }
  const { argon2id } = await import('hash-wasm');
  return argon2id({
    password,
    salt: crypto.getRandomValues(new Uint8Array(16)),
    iterations: params.timeCost,
    memorySize: params.memoryCostKiB,
    parallelism: params.parallelism,
    hashLength: 32,
    outputType: 'encoded',
  });
}

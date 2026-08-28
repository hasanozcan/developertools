export function recommendArgon2Params(targetLatencyMs = 500): { memoryKiB: number; iterations: number; parallelism: number } {
  return {
    memoryKiB: 65536, // 64 MB
    iterations: targetLatencyMs >= 1000 ? 5 : 3,
    parallelism: 4
  };
}

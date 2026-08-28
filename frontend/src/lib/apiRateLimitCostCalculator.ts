export function calculateTokenBucket(requestsPerMin: number, burstCapacity = 60): { fillRatePerSec: number; maxBurst: number } {
  return { fillRatePerSec: Number((requestsPerMin / 60).toFixed(2)), maxBurst: burstCapacity };
}

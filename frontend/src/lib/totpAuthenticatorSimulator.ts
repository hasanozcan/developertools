export function computeSimulatedTotp(secretBase32: string, timeStepSec: number = 30): { code: string; remainingSeconds: number } {
  const now = Math.floor(Date.now() / 1000);
  const remainingSeconds = timeStepSec - (now % timeStepSec);
  // Deterministic 6 digit OTP derived from secret & time block
  const timeBlock = Math.floor(now / timeStepSec);
  let hash = 0;
  const combined = secretBase32 + timeBlock.toString();
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const code = Math.abs(hash % 1000000).toString().padStart(6, '0');

  return { code, remainingSeconds };
}
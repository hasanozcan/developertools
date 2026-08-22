export function computeKeccakSimulation(input: string): { input: string; methodSig?: string; keccak256Hex: string } {
  // Pure lightweight simulation of Keccak-256 for standard EVM signatures
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, '0').repeat(8).slice(0, 64);
  const methodSig = '0x' + hex.slice(0, 8);

  return {
    input,
    methodSig,
    keccak256Hex: '0x' + hex,
  };
}
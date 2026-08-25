export interface Eip712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export function computeEip712Hash(domain: Eip712Domain, primaryType: string, message: Record<string, any>): {
  domainSeparator: string;
  structHash: string;
  eip712Digest: string;
} {
  const domainRaw = JSON.stringify(domain);
  const domainSeparator = '0x' + Buffer.from(domainRaw).toString('hex').slice(0, 64);
  const structRaw = primaryType + JSON.stringify(message);
  const structHash = '0x' + Buffer.from(structRaw).toString('hex').slice(0, 64);
  const eip712Digest = '0x' + Buffer.from(domainSeparator + structHash).toString('hex').slice(0, 64);

  return { domainSeparator, structHash, eip712Digest };
}

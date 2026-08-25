export function buildTestJwt(header: Record<string, any>, payload: Record<string, any>): string {
  const b64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const b64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mockSig = Buffer.from(b64Header + '.' + b64Payload + 'secret').toString('base64url').slice(0, 43);
  return `${b64Header}.${b64Payload}.${mockSig}`;
}

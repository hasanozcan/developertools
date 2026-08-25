export function generateRsaKeyPairSummary(bits: 2048 | 4096 = 2048): { publicKey: string; privateKey: string } {
  const pub = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA${Buffer.from(String(bits) + Date.now()).toString('base64').slice(0, 32)}...IDAQAB\n-----END PUBLIC KEY-----`;
  const priv = `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA${Buffer.from(String(bits) + 'priv' + Date.now()).toString('base64').slice(0, 32)}...\n-----END RSA PRIVATE KEY-----`;
  return { publicKey: pub, privateKey: priv };
}

export async function generateEd25519Keypair(): Promise<{ publicKeyHex: string; privateKeyHex: string }> {
  const keys = await crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify']);
  const publicKey = new Uint8Array(await crypto.subtle.exportKey('raw', keys.publicKey));
  const privateKey = await crypto.subtle.exportKey('jwk', keys.privateKey);
  const seed = Uint8Array.from(atob(privateKey.d!.replace(/-/g, '+').replace(/_/g, '/') + '='), (char) => char.charCodeAt(0));
  const hex = (bytes: Uint8Array) => '0x' + Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return {
    publicKeyHex: hex(publicKey),
    privateKeyHex: hex(seed),
  };
}

export function simulateEd25519Keypair(): { publicKeyHex: string; privateKeyHex: string } {
  const randomBytes = (len: number) => {
    let s = '';
    const hex = '0123456789abcdef';
    for (let i = 0; i < len; i++) {
      s += hex[Math.floor(Math.random() * 16)];
    }
    return s;
  };

  return {
    publicKeyHex: '0x' + randomBytes(64),
    privateKeyHex: '0x' + randomBytes(64),
  };
}
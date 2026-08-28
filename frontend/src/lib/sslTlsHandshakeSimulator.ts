export function simulateHandshake(tlsVersion: '1.2' | '1.3'): string[] {
  if (tlsVersion === '1.3') {
    return [
      '1. ClientHello (Key Share, Cipher Suites)',
      '2. ServerHello (Key Share, Encrypted Extensions, Certificate, Finished)',
      '3. Client Finished (1-RTT Data Handshake Complete)'
    ];
  }
  return [
    '1. ClientHello',
    '2. ServerHello',
    '3. Server Certificate & Key Exchange',
    '4. Client Key Exchange & ChangeCipherSpec',
    '5. Finished (2-RTT Handshake Complete)'
  ];
}

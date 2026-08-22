import { describe, it, expect } from 'vitest';
import { inspectSshPublicKey } from './sshKeyInspector';

describe('sshKeyInspector', () => {
  it('inspects OpenSSH public key type and metadata', () => {
    const key = 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... dev@company.com';
    const res = inspectSshPublicKey(key);
    expect(res.isValid).toBe(true);
    expect(res.keyType).toBe('ssh-ed25519');
    expect(res.comment).toBe('dev@company.com');
  });
});

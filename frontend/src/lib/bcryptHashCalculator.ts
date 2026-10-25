export { generateBcryptHash } from './bcrypt';

export function parseBcryptHash(hash: string): { isValid: boolean; version?: string; cost?: number; salt?: string } {
  const match = hash.trim().match(/^\$(2[aby])\$(\d{2})\$([./A-Za-z0-9]{22})([./A-Za-z0-9]{31})$/);
  if (!match) {
    return { isValid: false };
  }
  return {
    isValid: true,
    version: match[1],
    cost: parseInt(match[2], 10),
    salt: match[3],
  };
}

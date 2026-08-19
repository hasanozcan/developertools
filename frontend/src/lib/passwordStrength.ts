export interface PasswordAnalysis {
  entropy: number;
  score: 0 | 1 | 2 | 3 | 4;
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  crackTimeEstimate: string;
  hasLower: boolean;
  hasUpper: boolean;
  hasDigits: boolean;
  hasSymbols: boolean;
  length: number;
}

export function analyzePasswordStrength(password: string): PasswordAnalysis {
  const length = password.length;
  if (length === 0) {
    return {
      entropy: 0,
      score: 0,
      label: 'Very Weak',
      crackTimeEstimate: 'Instant',
      hasLower: false,
      hasUpper: false,
      hasDigits: false,
      hasSymbols: false,
      length: 0,
    };
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigits = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigits) poolSize += 10;
  if (hasSymbols) poolSize += 33;

  const entropy = Math.round(length * Math.log2(poolSize || 1));

  let score: 0 | 1 | 2 | 3 | 4 = 0;
  let label: PasswordAnalysis['label'] = 'Very Weak';
  let crackTimeEstimate = 'Instant';

  if (entropy < 28) {
    score = 0;
    label = 'Very Weak';
    crackTimeEstimate = 'Few milliseconds';
  } else if (entropy < 36) {
    score = 1;
    label = 'Weak';
    crackTimeEstimate = 'A few seconds';
  } else if (entropy < 60) {
    score = 2;
    label = 'Fair';
    crackTimeEstimate = 'Hours to days';
  } else if (entropy < 80) {
    score = 3;
    label = 'Strong';
    crackTimeEstimate = 'Centuries';
  } else {
    score = 4;
    label = 'Very Strong';
    crackTimeEstimate = 'Trillions of years';
  }

  return {
    entropy,
    score,
    label,
    crackTimeEstimate,
    hasLower,
    hasUpper,
    hasDigits,
    hasSymbols,
    length,
  };
}

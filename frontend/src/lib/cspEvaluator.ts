export interface CspFinding {
  directive: string;
  severity: 'high' | 'medium' | 'info';
  message: string;
}

export function evaluateCspHeader(headerValue: string): { findings: CspFinding[]; score: number } {
  const findings: CspFinding[] = [];
  const lower = (headerValue || '').toLowerCase();

  if (!lower.includes('default-src') && !lower.includes('script-src')) {
    findings.push({
      directive: 'default-src',
      severity: 'high',
      message: 'Missing default-src or script-src directive allows arbitrary script execution.'
    });
  }

  if (lower.includes("'unsafe-inline'")) {
    findings.push({
      directive: 'script-src',
      severity: 'high',
      message: "Usage of 'unsafe-inline' allows XSS vulnerabilities."
    });
  }

  if (lower.includes("'unsafe-eval'")) {
    findings.push({
      directive: 'script-src',
      severity: 'medium',
      message: "Usage of 'unsafe-eval' allows dynamic string evaluation."
    });
  }

  if (lower.includes('http:')) {
    findings.push({
      directive: 'general',
      severity: 'medium',
      message: 'Insecure http: protocol found in source list.'
    });
  }

  const score = Math.max(10, 100 - findings.filter(f => f.severity === 'high').length * 40 - findings.filter(f => f.severity === 'medium').length * 20);
  return { findings, score };
}
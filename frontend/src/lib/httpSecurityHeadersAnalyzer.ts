export interface SecurityHeaderCheck {
  name: string;
  category: 'Mandatory' | 'Recommended' | 'Optional';
  status: 'Pass' | 'Warning' | 'Fail';
  value?: string;
  score: number;
  recommendation: string;
  documentation: string;
}

export interface SecurityAnalysisResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  passedCount: number;
  warningCount: number;
  failedCount: number;
  checks: SecurityHeaderCheck[];
}

export function analyzeSecurityHeaders(rawHeaders: string): SecurityAnalysisResult {
  const headerMap = new Map<string, string>();
  const lines = rawHeaders.split(/\r?\n/);

  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim().toLowerCase();
      const val = line.slice(idx + 1).trim();
      headerMap.set(key, val);
    }
  }

  const checks: SecurityHeaderCheck[] = [];

  // 1. Strict-Transport-Security (HSTS)
  const hsts = headerMap.get('strict-transport-security');
  if (hsts) {
    const hasPreload = hsts.includes('preload');
    const hasSubdomains = hsts.includes('includeSubDomains');
    const maxAgeMatch = hsts.match(/max-age=(\d+)/i);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;

    if (maxAge >= 31536000 && hasSubdomains) {
      checks.push({
        name: 'Strict-Transport-Security (HSTS)',
        category: 'Mandatory',
        status: 'Pass',
        value: hsts,
        score: 25,
        recommendation: hasPreload ? 'Optimal HSTS configuration with preload.' : 'Consider adding "preload" after submitting to hstspreload.org.',
        documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
      });
    } else {
      checks.push({
        name: 'Strict-Transport-Security (HSTS)',
        category: 'Mandatory',
        status: 'Warning',
        value: hsts,
        score: 15,
        recommendation: 'Increase max-age to at least 31536000 (1 year) and include includeSubDomains.',
        documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
      });
    }
  } else {
    checks.push({
      name: 'Strict-Transport-Security (HSTS)',
      category: 'Mandatory',
      status: 'Fail',
      score: 0,
      recommendation: 'Add "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload" to enforce HTTPS.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
    });
  }

  // 2. Content-Security-Policy (CSP)
  const csp = headerMap.get('content-security-policy');
  if (csp) {
    const isStrict = !csp.includes("'unsafe-eval'") && !csp.includes('*');
    checks.push({
      name: 'Content-Security-Policy (CSP)',
      category: 'Mandatory',
      status: isStrict ? 'Pass' : 'Warning',
      value: csp,
      score: isStrict ? 25 : 15,
      recommendation: isStrict ? 'Strong CSP defined.' : 'Avoid "*", "unsafe-eval", and "unsafe-inline" where possible.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
    });
  } else {
    checks.push({
      name: 'Content-Security-Policy (CSP)',
      category: 'Mandatory',
      status: 'Fail',
      score: 0,
      recommendation: 'Configure a Content-Security-Policy to mitigate Cross-Site Scripting (XSS) and data injection.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
    });
  }

  // 3. X-Frame-Options
  const xfo = headerMap.get('x-frame-options');
  if (xfo && (xfo.toUpperCase() === 'DENY' || xfo.toUpperCase() === 'SAMEORIGIN')) {
    checks.push({
      name: 'X-Frame-Options',
      category: 'Mandatory',
      status: 'Pass',
      value: xfo,
      score: 15,
      recommendation: 'Clickjacking protection is properly enabled.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
    });
  } else {
    checks.push({
      name: 'X-Frame-Options',
      category: 'Mandatory',
      status: 'Fail',
      value: xfo,
      score: 0,
      recommendation: 'Set "X-Frame-Options: DENY" or "SAMEORIGIN" to protect against clickjacking.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
    });
  }

  // 4. X-Content-Type-Options
  const xcto = headerMap.get('x-content-type-options');
  if (xcto && xcto.toLowerCase() === 'nosniff') {
    checks.push({
      name: 'X-Content-Type-Options',
      category: 'Mandatory',
      status: 'Pass',
      value: xcto,
      score: 15,
      recommendation: 'MIME-type sniffing is prevented.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
    });
  } else {
    checks.push({
      name: 'X-Content-Type-Options',
      category: 'Mandatory',
      status: 'Fail',
      score: 0,
      recommendation: 'Set "X-Content-Type-Options: nosniff" to stop browsers from MIME-sniffing away from the declared content-type.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
    });
  }

  // 5. Referrer-Policy
  const refPolicy = headerMap.get('referrer-policy');
  if (refPolicy) {
    checks.push({
      name: 'Referrer-Policy',
      category: 'Recommended',
      status: 'Pass',
      value: refPolicy,
      score: 10,
      recommendation: 'Referrer information leakage is controlled.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
    });
  } else {
    checks.push({
      name: 'Referrer-Policy',
      category: 'Recommended',
      status: 'Warning',
      score: 5,
      recommendation: 'Set "Referrer-Policy: strict-origin-when-cross-origin" to safeguard referrer headers.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
    });
  }

  // 6. Permissions-Policy
  const permPolicy = headerMap.get('permissions-policy');
  if (permPolicy) {
    checks.push({
      name: 'Permissions-Policy',
      category: 'Recommended',
      status: 'Pass',
      value: permPolicy,
      score: 10,
      recommendation: 'Browser hardware and API permissions restricted.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy',
    });
  } else {
    checks.push({
      name: 'Permissions-Policy',
      category: 'Recommended',
      status: 'Warning',
      score: 0,
      recommendation: 'Set Permissions-Policy (e.g. geolocation=(), camera=(), microphone=()) to restrict APIs.',
      documentation: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy',
    });
  }

  const totalScore = checks.reduce((acc, c) => acc + c.score, 0);
  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  if (totalScore >= 90) grade = 'A+';
  else if (totalScore >= 80) grade = 'A';
  else if (totalScore >= 65) grade = 'B';
  else if (totalScore >= 50) grade = 'C';
  else if (totalScore >= 35) grade = 'D';

  return {
    score: totalScore,
    grade,
    passedCount: checks.filter((c) => c.status === 'Pass').length,
    warningCount: checks.filter((c) => c.status === 'Warning').length,
    failedCount: checks.filter((c) => c.status === 'Fail').length,
    checks,
  };
}

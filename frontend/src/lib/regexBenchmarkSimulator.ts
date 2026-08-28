export function evaluateRegexRisk(pattern: string): { riskLevel: 'low' | 'medium' | 'high'; message: string } {
  if (/(\.\*\.\*|\w+\+\w+\+|\(.*\+\)\+)/.test(pattern)) {
    return { riskLevel: 'high', message: 'Potential ReDoS exponential backtracking risk detected!' };
  }
  return { riskLevel: 'low', message: 'Safe linear complexity regex.' };
}

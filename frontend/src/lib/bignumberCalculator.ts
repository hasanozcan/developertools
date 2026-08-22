export function calculateBigInt(
  aStr: string,
  bStr: string,
  op: '+' | '-' | '*' | '/' | '%' | '**',
): string {
  const a = BigInt(aStr.trim() || '0');
  const b = BigInt(bStr.trim() || '1');

  switch (op) {
    case '+': return (a + b).toString();
    case '-': return (a - b).toString();
    case '*': return (a * b).toString();
    case '/': return b === BigInt(0) ? 'Error: Division by zero' : (a / b).toString();
    case '%': return b === BigInt(0) ? 'Error: Modulo by zero' : (a % b).toString();
    case '**': return a.toString();
  }
}

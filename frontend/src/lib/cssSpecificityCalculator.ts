export interface SpecificityScore {
  a: number; // IDs (#id)
  b: number; // Classes (.class), attributes ([attr]), pseudo-classes (:hover)
  c: number; // Elements (div), pseudo-elements (::before)
  totalScore: number;
  formatted: string;
}

export function calculateSpecificity(selector: string): SpecificityScore {
  const cleaned = selector.trim();
  if (!cleaned) {
    return { a: 0, b: 0, c: 0, totalScore: 0, formatted: '(0, 0, 0)' };
  }

  let working = cleaned;

  // IDs (#id)
  const idMatches = working.match(/#[a-zA-Z0-9_-]+/g) || [];
  const a = idMatches.length;
  working = working.replace(/#[a-zA-Z0-9_-]+/g, ' ');

  // Classes (.class)
  const classMatches = working.match(/\.[a-zA-Z0-9_-]+/g) || [];
  working = working.replace(/\.[a-zA-Z0-9_-]+/g, ' ');

  // Attributes ([attr])
  const attrMatches = working.match(/\[[^\]]+\]/g) || [];
  working = working.replace(/\[[^\]]+\]/g, ' ');

  // Pseudo-elements (::before)
  const pseudoElementMatches = working.match(/::[a-zA-Z0-9_-]+/g) || [];
  working = working.replace(/::[a-zA-Z0-9_-]+/g, ' ');

  // Pseudo-classes (:hover)
  const pseudoClassMatches = working.match(/:[a-zA-Z0-9_-]+/g) || [];
  working = working.replace(/:[a-zA-Z0-9_-]+/g, ' ');

  const b = classMatches.length + attrMatches.length + pseudoClassMatches.length;

  // Elements (tag names)
  const words = working.match(/[a-zA-Z0-9_-]+/g) || [];
  const validElements = words.filter((e) => !['>', '+', '~', '*', '||'].includes(e));
  const c = pseudoElementMatches.length + validElements.length;

  const totalScore = a * 100 + b * 10 + c;

  return {
    a,
    b,
    c,
    totalScore,
    formatted: `(${a}, ${b}, ${c})`,
  };
}

export function compareSpecificity(
  selA: string,
  selB: string,
): {
  scoreA: SpecificityScore;
  scoreB: SpecificityScore;
  winner: 'A' | 'B' | 'EQUAL';
  explanation: string;
} {
  const scoreA = calculateSpecificity(selA);
  const scoreB = calculateSpecificity(selB);

  let winner: 'A' | 'B' | 'EQUAL' = 'EQUAL';
  if (scoreA.a > scoreB.a) winner = 'A';
  else if (scoreB.a > scoreA.a) winner = 'B';
  else if (scoreA.b > scoreB.b) winner = 'A';
  else if (scoreB.b > scoreA.b) winner = 'B';
  else if (scoreA.c > scoreB.c) winner = 'A';
  else if (scoreB.c > scoreA.c) winner = 'B';

  let explanation = 'Both selectors have equal specificity.';
  if (winner === 'A') {
    explanation = `Selector A ${scoreA.formatted} overrides Selector B ${scoreB.formatted}.`;
  } else if (winner === 'B') {
    explanation = `Selector B ${scoreB.formatted} overrides Selector A ${scoreA.formatted}.`;
  }

  return { scoreA, scoreB, winner, explanation };
}

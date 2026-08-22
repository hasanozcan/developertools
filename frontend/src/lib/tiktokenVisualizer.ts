export interface ColoredToken {
  text: string;
  id: number;
  colorIndex: number;
}

export function simulateTiktoken(text: string): { tokens: ColoredToken[]; totalTokens: number } {
  if (!text) return { tokens: [], totalTokens: 0 };

  // Heuristic token segmentation on punctuation, words, whitespace
  const rawParts = text.match(/\w+|[^\w\s]+|\s+/g) || [];
  const tokens: ColoredToken[] = [];
  let tokenCounter = 1;

  for (const part of rawParts) {
    if (part.length > 4 && /^[a-zA-Z]+$/.test(part)) {
      // Split large words into subwords
      const subParts = part.match(/.{1,4}/g) || [part];
      for (const sub of subParts) {
        tokens.push({
          text: sub,
          id: 1000 + tokenCounter,
          colorIndex: tokenCounter % 6,
        });
        tokenCounter++;
      }
    } else {
      tokens.push({
        text: part,
        id: 1000 + tokenCounter,
        colorIndex: tokenCounter % 6,
      });
      tokenCounter++;
    }
  }

  return { tokens, totalTokens: tokens.length };
}
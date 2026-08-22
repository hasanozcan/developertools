export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

export function comparePrompts(
  promptA: string,
  promptB: string,
): {
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
  charDelta: number;
  wordDelta: number;
} {
  const linesA = promptA.split(/\r?\n/);
  const linesB = promptB.split(/\r?\n/);

  const diffLines: DiffLine[] = [];
  const maxLines = Math.max(linesA.length, linesB.length);

  let addedCount = 0;
  let removedCount = 0;

  for (let i = 0; i < maxLines; i++) {
    const a = linesA[i];
    const b = linesB[i];

    if (a === undefined) {
      diffLines.push({ type: 'added', text: b });
      addedCount++;
    } else if (b === undefined) {
      diffLines.push({ type: 'removed', text: a });
      removedCount++;
    } else if (a === b) {
      diffLines.push({ type: 'unchanged', text: a });
    } else {
      diffLines.push({ type: 'removed', text: a });
      diffLines.push({ type: 'added', text: b });
      removedCount++;
      addedCount++;
    }
  }

  const wordsA = promptA.trim() ? promptA.trim().split(/\s+/).length : 0;
  const wordsB = promptB.trim() ? promptB.trim().split(/\s+/).length : 0;

  return {
    lines: diffLines,
    addedCount,
    removedCount,
    charDelta: promptB.length - promptA.length,
    wordDelta: wordsB - wordsA,
  };
}

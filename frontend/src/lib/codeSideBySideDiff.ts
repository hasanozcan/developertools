export interface SideBySideDiffLine {
  lineNumber: number;
  left: string;
  right: string;
  isModified: boolean;
}

export function computeSideBySideDiff(leftText: string, rightText: string): SideBySideDiffLine[] {
  const leftLines = leftText.split(/\r?\n/);
  const rightLines = rightText.split(/\r?\n/);
  const maxLen = Math.max(leftLines.length, rightLines.length);
  const result: SideBySideDiffLine[] = [];

  for (let i = 0; i < maxLen; i++) {
    const left = leftLines[i] || '';
    const right = rightLines[i] || '';
    result.push({
      lineNumber: i + 1,
      left,
      right,
      isModified: left !== right,
    });
  }

  return result;
}

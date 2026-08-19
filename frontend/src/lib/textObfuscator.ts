export interface InvisibleCharReport {
  zeroWidthSpaces: number;
  zeroWidthNonJoiners: number;
  zeroWidthJoiners: number;
  leftToRightMarks: number;
  rightToLeftMarks: number;
  softHyphens: number;
  totalInvisible: number;
  cleanedText: string;
}

export function detectAndRemoveInvisibleChars(text: string): InvisibleCharReport {
  let zeroWidthSpaces = 0;
  let zeroWidthNonJoiners = 0;
  let zeroWidthJoiners = 0;
  let leftToRightMarks = 0;
  let rightToLeftMarks = 0;
  let softHyphens = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code === 0x200b) zeroWidthSpaces++;
    else if (code === 0x200c) zeroWidthNonJoiners++;
    else if (code === 0x200d) zeroWidthJoiners++;
    else if (code === 0x200e) leftToRightMarks++;
    else if (code === 0x200f) rightToLeftMarks++;
    else if (code === 0x00ad) softHyphens++;
  }

  const cleanedText = text.replace(/[\u200B-\u200D\uFEFF\u200E\u200F\u00AD]/g, '');
  const totalInvisible =
    zeroWidthSpaces + zeroWidthNonJoiners + zeroWidthJoiners + leftToRightMarks + rightToLeftMarks + softHyphens;

  return {
    zeroWidthSpaces,
    zeroWidthNonJoiners,
    zeroWidthJoiners,
    leftToRightMarks,
    rightToLeftMarks,
    softHyphens,
    totalInvisible,
    cleanedText,
  };
}

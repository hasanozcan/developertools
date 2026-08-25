const WORDS = ['correct', 'horse', 'battery', 'staple', 'rocket', 'galaxy', 'quantum', 'forest', 'shield', 'ocean', 'tiger', 'ember', 'beacon', 'prism'];
export function generateDicewarePassphrase(wordCount: number = 4, separator: string = '-'): string {
  const selected: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    selected.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return selected.join(separator);
}

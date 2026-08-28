export function countSpfLookups(spfRecord: string): { totalLookups: number; isValid: boolean } {
  const matches = spfRecord.match(/include:|a:|mx:|ptr:|redirect=/gi) || [];
  return { totalLookups: matches.length, isValid: matches.length <= 10 };
}

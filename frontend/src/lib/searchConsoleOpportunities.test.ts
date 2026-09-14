import { describe, expect, it } from 'vitest';
import { parseSearchConsoleCsv, rankSeoOpportunities } from './searchConsoleOpportunities';

describe('Search Console opportunity analysis', () => {
  it('parses common Search Console CSV columns and percent CTR', () => {
    const rows = parseSearchConsoleCsv('Query,Clicks,Impressions,CTR,Position\njson formatter,12,1000,1.2%,8.4');
    expect(rows).toEqual([
      expect.objectContaining({ query: 'json formatter', clicks: 12, impressions: 1000, ctr: 0.012, position: 8.4 }),
    ]);
  });

  it('ranks high-impression results between positions 4 and 20', () => {
    const opportunities = rankSeoOpportunities([
      { query: 'a', clicks: 5, impressions: 1000, ctr: 0.005, position: 8 },
      { query: 'b', clicks: 2, impressions: 200, ctr: 0.01, position: 13 },
      { query: 'c', clicks: 20, impressions: 50, ctr: 0.4, position: 2 },
    ]);
    expect(opportunities.map((row) => row.query)).toEqual(['a', 'b']);
    expect(opportunities[0].potentialClicks).toBeGreaterThan(0);
  });
});

export interface SearchConsoleRow {
  query?: string;
  page?: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SeoOpportunity extends SearchConsoleRow {
  targetCtr: number;
  potentialClicks: number;
  score: number;
  recommendation: string;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = '';
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      values.push(value.trim());
      value = '';
    } else {
      value += char;
    }
  }
  values.push(value.trim());
  return values;
}

function asNumber(value: string | undefined): number {
  if (!value) return 0;
  const normalized = value.replace(/\s/g, '').replace('%', '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function parseSearchConsoleCsv(csv: string): SearchConsoleRow[] {
  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/).filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((header) => header.trim().toLowerCase());
  const indexOf = (...names: string[]) => headers.findIndex((header) => names.includes(header));
  const queryIndex = indexOf('query', 'queries', 'top queries');
  const pageIndex = indexOf('page', 'pages', 'top pages');
  const clicksIndex = indexOf('clicks');
  const impressionsIndex = indexOf('impressions');
  const ctrIndex = indexOf('ctr', 'average ctr');
  const positionIndex = indexOf('position', 'average position');

  if (impressionsIndex < 0 || positionIndex < 0) return [];

  return lines.slice(1).map(parseCsvLine).map((values) => {
    const impressions = asNumber(values[impressionsIndex]);
    const clicks = clicksIndex >= 0 ? asNumber(values[clicksIndex]) : 0;
    const rawCtr = ctrIndex >= 0 ? asNumber(values[ctrIndex]) : 0;
    const ctr = values[ctrIndex]?.includes('%') ? rawCtr / 100 : rawCtr > 1 ? rawCtr / 100 : rawCtr || (impressions > 0 ? clicks / impressions : 0);
    return {
      query: queryIndex >= 0 ? values[queryIndex] || undefined : undefined,
      page: pageIndex >= 0 ? values[pageIndex] || undefined : undefined,
      clicks,
      impressions,
      ctr,
      position: asNumber(values[positionIndex]),
    };
  }).filter((row) => row.impressions > 0 && row.position > 0);
}

function targetCtrForPosition(position: number): number {
  if (position <= 3) return 0.12;
  if (position <= 5) return 0.08;
  if (position <= 10) return 0.05;
  return 0.025;
}

export function rankSeoOpportunities(rows: SearchConsoleRow[]): SeoOpportunity[] {
  return rows
    .filter((row) => row.position >= 4 && row.position <= 20 && row.impressions >= 20)
    .map((row) => {
      const targetCtr = targetCtrForPosition(row.position);
      const potentialClicks = Math.max(0, row.impressions * targetCtr - row.clicks);
      const positionWeight = 1 + Math.max(0, 20 - row.position) / 20;
      const score = potentialClicks * positionWeight;
      const recommendation = row.position > 10
        ? 'Strengthen topical content and internal links; this result is close enough to page one to be worth pushing.'
        : row.ctr < targetCtr * 0.65
          ? 'Improve title and meta-description relevance for the query; impressions are present but CTR trails the position benchmark.'
          : 'Expand the page around the matching intent and add links from related collections and role pages.';
      return { ...row, targetCtr, potentialClicks, score, recommendation };
    })
    .sort((a, b) => b.score - a.score);
}

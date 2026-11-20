export type ConflictResolutionChoice = 'ours' | 'theirs' | 'both';

const CONFLICT_BLOCK_RE =
  /^<{7}[^\r\n]*\r?\n([\s\S]*?)(?:^\|\|\|\|\|\|\|[^\r\n]*\r?\n[\s\S]*?)?^={7}[^\r\n]*\r?\n([\s\S]*?)^>{7}[^\r\n]*(\r?\n|$)/gm;

export function resolveConflictMarkers(content: string, take: ConflictResolutionChoice): string {
  return content.replace(
    CONFLICT_BLOCK_RE,
    (_match, ours: string, theirs: string, trailingEol: string) => {
      let chosen = take === 'ours' ? ours : take === 'theirs' ? theirs : `${ours}${theirs}`;

      if (!trailingEol) {
        chosen = chosen.replace(/\r?\n$/, '');
      }
      return chosen;
    },
  );
}

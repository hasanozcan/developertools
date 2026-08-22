export interface ChangelogRelease {
  version: string;
  date: string;
  added?: string[];
  changed?: string[];
  fixed?: string[];
}

export function generateChangelogMd(release: ChangelogRelease): string {
  const lines: string[] = [`## [${release.version}] - ${release.date}`];

  if (release.added && release.added.length > 0) {
    lines.push('', '### Added');
    release.added.forEach((a) => lines.push(`- ${a}`));
  }

  if (release.changed && release.changed.length > 0) {
    lines.push('', '### Changed');
    release.changed.forEach((c) => lines.push(`- ${c}`));
  }

  if (release.fixed && release.fixed.length > 0) {
    lines.push('', '### Fixed');
    release.fixed.forEach((f) => lines.push(`- ${f}`));
  }

  return lines.join('\n');
}

export function resolveConflictMarkers(content: string, take: 'ours' | 'theirs'): string {
  const regex = /<<<<<<<[\s\S]*?\n([\s\S]*?)=======[\s\S]*?\n([\s\S]*?)>>>>>>>[\s\S]*?\n/g;
  return content.replace(regex, (_, ours, theirs) => take === 'ours' ? ours : theirs);
}

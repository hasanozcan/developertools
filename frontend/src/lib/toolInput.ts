/** Read extension input from a fragment, which is never sent in the HTTP request. */
export function readToolInput(hash: string): string | null {
  return new URLSearchParams(hash.replace(/^#/, '')).get('input');
}

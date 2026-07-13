export interface CacheControlDirective {
  name: string;
  value: string | null;
}

export function parseCacheControl(input: string): CacheControlDirective[] {
  const directives: CacheControlDirective[] = [];
  let token = '';
  let quoted = false;

  const commit = () => {
    const part = token.trim();
    token = '';
    if (!part) return;
    const separator = part.indexOf('=');
    const rawName = separator < 0 ? part : part.slice(0, separator);
    const name = rawName.trim().toLowerCase();
    if (!/^[!#$%&'*+.^_`|~0-9a-z-]+$/.test(name)) {
      throw new Error(`Invalid directive name: ${rawName.trim() || '(empty)'}.`);
    }
    let value = separator < 0 ? null : part.slice(separator + 1).trim();
    if (value?.startsWith('"')) {
      if (!value.endsWith('"') || value.length < 2)
        throw new Error(`Unclosed quoted value for ${name}.`);
      value = value.slice(1, -1).replace(/\\(["\\])/g, '$1');
    }
    if (separator >= 0 && value === '') throw new Error(`Directive ${name} requires a value.`);
    directives.push({ name, value });
  };

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (character === '"' && input[index - 1] !== '\\') quoted = !quoted;
    if (character === ',' && !quoted) commit();
    else token += character;
  }
  if (quoted) throw new Error('Unclosed quoted value.');
  commit();
  return directives;
}

export function formatCacheControl(directives: CacheControlDirective[]): string {
  const seen = new Set<string>();
  return directives
    .filter(({ name }) => {
      const normalized = name.toLowerCase();
      if (seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    })
    .map(
      ({ name, value }) =>
        `${name.toLowerCase()}${value === null ? '' : `=${/^[!#$%&'*+.^_`|~0-9a-z-]+$/i.test(value) ? value : `"${value.replace(/["\\]/g, '\\$&')}"`}`}`,
    )
    .join(', ');
}

export function validateCacheControl(directives: CacheControlDirective[]): string[] {
  const warnings: string[] = [];
  const values = new Map(directives.map((directive) => [directive.name, directive.value]));
  if (values.has('public') && values.has('private'))
    warnings.push('public and private conflict; choose one cache visibility directive.');
  if (values.has('no-store') && directives.length > 1)
    warnings.push(
      'no-store prevents storage, so other freshness directives are usually unnecessary.',
    );
  for (const name of ['max-age', 's-maxage', 'stale-while-revalidate', 'stale-if-error']) {
    const value = values.get(name);
    if (value !== undefined && (value === null || !/^\d+$/.test(value)))
      warnings.push(`${name} should use non-negative delta-seconds.`);
  }
  return warnings;
}

/**
 * Serializes JSON for use as the text content of an HTML script element.
 * Escaping `<` prevents user-controlled `</script>` sequences from ending the
 * element early; the additional escapes keep HTML parsers and JavaScript source
 * consumers from interpreting special characters.
 */
export function serializeJsonForHtmlScript(value: unknown, space?: number): string {
  const serialized = JSON.stringify(value, null, space);
  if (serialized === undefined) {
    throw new Error('Value cannot be serialized as JSON');
  }

  return serialized
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

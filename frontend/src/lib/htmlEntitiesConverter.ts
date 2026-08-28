const ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '©': '&copy;',
  '®': '&reg;',
  '™': '&trade;',
  '€': '&euro;',
  '£': '&pound;',
  '¥': '&yen;',
  '§': '&sect;',
  '•': '&bull;',
  '–': '&ndash;',
  '—': '&mdash;',
  '…': '&hellip;',
  '°': '&deg;',
  '±': '&plusmn;',
};

const REVERSE_ENTITY_MAP: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
  '&euro;': '€',
  '&pound;': '£',
  '&yen;': '¥',
  '&sect;': '§',
  '&bull;': '•',
  '&ndash;': '–',
  '&mdash;': '—',
  '&hellip;': '…',
  '&deg;': '°',
  '&plusmn;': '±',
};

export function encodeHtmlEntities(text: string, mode: 'named' | 'decimal' | 'hex' = 'named'): string {
  if (mode === 'decimal') {
    return text.replace(/[\s\S]/g, (char) => '&#' + char.charCodeAt(0) + ';');
  }
  if (mode === 'hex') {
    return text.replace(/[\s\S]/g, (char) => '&#x' + char.charCodeAt(0).toString(16).toUpperCase() + ';');
  }
  return text.replace(/[&<>"'©®™€£¥§•–—…°±]/g, (char) => ENTITY_MAP[char] || char);
}

export function decodeHtmlEntities(encoded: string): string {
  let decoded = encoded;
  for (const [entity, char] of Object.entries(REVERSE_ENTITY_MAP)) {
    decoded = decoded.replaceAll(entity, char);
  }
  decoded = decoded.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  return decoded;
}

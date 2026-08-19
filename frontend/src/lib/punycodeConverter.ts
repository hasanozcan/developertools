// Punycode conversion using standard RFC 3492 algorithms or URL IDN
export function domainToAscii(domain: string): string {
  try {
    const clean = domain.trim().toLowerCase();
    // Using standard Web URL IDN encoding
    const url = new URL(`http://${clean}`);
    return url.hostname;
  } catch {
    return domain;
  }
}

export function domainToUnicode(domain: string): string {
  try {
    const clean = domain.trim().toLowerCase();
    // URL hostname can decode punycode in browser
    if (typeof window !== 'undefined' && 'Intl' in window && 'Locale' in Intl) {
      // Decode punycode parts
      const parts = clean.split('.');
      const decodedParts = parts.map((part) => {
        if (part.startsWith('xn--')) {
          try {
            return decodeURIComponent(escape(window.atob(part.slice(4))));
          } catch {
            return part;
          }
        }
        return part;
      });
      return decodedParts.join('.');
    }
    return clean;
  } catch {
    return domain;
  }
}

// Dedicated RFC 3492 Punycode Encoder / Decoder
const BASE = 36;
const TMIN = 1;
const TMAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;
const DELIMITER = '-';

function adapt(delta: number, numpoints: number, firsttime: boolean): number {
  delta = firsttime ? Math.floor(delta / DAMP) : delta >> 1;
  delta += Math.floor(delta / numpoints);
  let k = 0;
  while (delta > ((BASE - TMIN) * TMAX) / 2) {
    delta = Math.floor(delta / (BASE - TMIN));
    k += BASE;
  }
  return Math.floor(k + ((BASE - TMIN + 1) * delta) / (delta + SKEW));
}

function encodeDigit(d: number): string {
  return String.fromCharCode(d + 22 + 75 * (d < 26 ? 1 : 0));
}

function decodeDigit(cp: number): number {
  if (cp - 48 < 10) return cp - 22;
  if (cp - 65 < 26) return cp - 65;
  if (cp - 97 < 26) return cp - 97;
  return BASE;
}

export function punycodeEncode(input: string): string {
  const output: string[] = [];
  const inputChars = Array.from(input);
  const basicChars = inputChars.filter((c) => c.charCodeAt(0) < 128);
  const basicLen = basicChars.length;

  for (const c of basicChars) {
    output.push(c);
  }

  let h = basicLen;
  let b = basicLen;

  if (basicLen > 0) output.push(DELIMITER);

  let n = INITIAL_N;
  let delta = 0;
  let bias = INITIAL_BIAS;

  while (h < inputChars.length) {
    let m = 0x7fffffff;
    for (const c of inputChars) {
      const code = c.codePointAt(0)!;
      if (code >= n && code < m) m = code;
    }

    delta += (m - n) * (h + 1);
    n = m;

    for (const c of inputChars) {
      const code = c.codePointAt(0)!;
      if (code < n) delta++;
      if (code === n) {
        let q = delta;
        for (let k = BASE; ; k += BASE) {
          const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
          if (q < t) break;
          output.push(encodeDigit(t + ((q - t) % (BASE - t))));
          q = Math.floor((q - t) / (BASE - t));
        }
        output.push(encodeDigit(q));
        bias = adapt(delta, h + 1, h === b);
        delta = 0;
        h++;
      }
    }
    delta++;
    n++;
  }

  return output.join('');
}

export function punycodeDecode(input: string): string {
  const output: string[] = [];
  let n = INITIAL_N;
  let i = 0;
  let bias = INITIAL_BIAS;

  const basic = input.lastIndexOf(DELIMITER);
  let rest = input;

  if (basic > 0) {
    for (let j = 0; j < basic; j++) {
      output.push(input[j]);
    }
    rest = input.slice(basic + 1);
  }

  while (rest.length > 0) {
    const oldi = i;
    let w = 1;
    let k = BASE;

    while (rest.length > 0) {
      const digit = decodeDigit(rest.charCodeAt(0));
      rest = rest.slice(1);
      i += digit * w;
      const t = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
      if (digit < t) break;
      w *= BASE - t;
      k += BASE;
    }

    bias = adapt(i - oldi, output.length + 1, oldi === 0);
    n += Math.floor(i / (output.length + 1));
    i %= output.length + 1;
    output.splice(i, 0, String.fromCodePoint(n));
    i++;
  }

  return output.join('');
}

export function convertDomainToPunycode(domain: string): string {
  const parts = domain.trim().toLowerCase().split('.');
  return parts
    .map((part) => {
      const hasNonAscii = /[^\x00-\x7F]/.test(part);
      if (!hasNonAscii) return part;
      return `xn--${punycodeEncode(part)}`;
    })
    .join('.');
}

export function convertPunycodeToDomain(punycodeDomain: string): string {
  const parts = punycodeDomain.trim().toLowerCase().split('.');
  return parts
    .map((part) => {
      if (part.startsWith('xn--')) {
        return punycodeDecode(part.slice(4));
      }
      return part;
    })
    .join('.');
}

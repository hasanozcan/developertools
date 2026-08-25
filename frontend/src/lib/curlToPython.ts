export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  data?: string;
  auth?: { user: string; pass: string };
  cookies: Record<string, string>;
}

export function parseCurl(curlCommand: string): ParsedCurl {
  const result: ParsedCurl = {
    url: '',
    method: 'GET',
    headers: {},
    cookies: {},
  };

  const tokens = curlCommand.replace(/\\\n/g, ' ').match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  
  for (let i = 0; i < tokens.length; i++) {
    const raw = tokens[i];
    const token = raw.replace(/^['"]|['"]$/g, '');

    if (token === '-X' || token === '--request') {
      if (tokens[i + 1]) result.method = tokens[++i].replace(/^['"]|['"]$/g, '').toUpperCase();
    } else if (token === '-H' || token === '--header') {
      if (tokens[i + 1]) {
        const headerStr = tokens[++i].replace(/^['"]|['"]$/g, '');
        const colonIdx = headerStr.indexOf(':');
        if (colonIdx > 0) {
          const key = headerStr.slice(0, colonIdx).trim();
          const val = headerStr.slice(colonIdx + 1).trim();
          result.headers[key] = val;
        }
      }
    } else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
      if (tokens[i + 1]) {
        result.data = tokens[++i].replace(/^['"]|['"]$/g, '');
        if (result.method === 'GET') result.method = 'POST';
      }
    } else if (token === '-u' || token === '--user') {
      if (tokens[i + 1]) {
        const authStr = tokens[++i].replace(/^['"]|['"]$/g, '');
        const [user, pass = ''] = authStr.split(':');
        result.auth = { user, pass };
      }
    } else if (token === '-b' || token === '--cookie') {
      if (tokens[i + 1]) {
        const cookieStr = tokens[++i].replace(/^['"]|['"]$/g, '');
        cookieStr.split(';').forEach((pair) => {
          const [k, v] = pair.split('=');
          if (k && v) result.cookies[k.trim()] = v.trim();
        });
      }
    } else if (token.startsWith('http://') || token.startsWith('https://')) {
      result.url = token;
    }
  }

  if (!result.url) {
    const urlCandidate = tokens.find(t => t.startsWith("'http") || t.startsWith('"http') || t.startsWith('http'));
    if (urlCandidate) result.url = urlCandidate.replace(/^['"]|['"]$/g, '');
  }

  return result;
}

export function curlToPython(curl: string, library: 'requests' | 'httpx' = 'requests'): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '# Error: Could not extract URL from cURL command';

  const lines: string[] = [library === 'requests' ? 'import requests' : 'import httpx', ''];
  lines.push('url = "' + parsed.url + '"');

  if (Object.keys(parsed.headers).length > 0) {
    lines.push('headers = {');
    for (const [k, v] of Object.entries(parsed.headers)) {
      lines.push('    "' + k + '": "' + v.replace(/"/g, '\\"') + '",');
    }
    lines.push('}');
  }

  if (parsed.data) {
    try {
      JSON.parse(parsed.data);
      lines.push('payload = ' + parsed.data);
    } catch {
      lines.push('data = "' + parsed.data.replace(/"/g, '\\"') + '"');
    }
  }

  let call = 'response = ' + library + '.' + parsed.method.toLowerCase() + '(url';
  if (Object.keys(parsed.headers).length > 0) call += ', headers=headers';
  if (parsed.data) {
    try {
      JSON.parse(parsed.data);
      call += ', json=payload';
    } catch {
      call += ', data=data';
    }
  }
  if (parsed.auth) call += ', auth=("' + parsed.auth.user + '", "' + parsed.auth.pass + '")';
  call += ')';

  lines.push('');
  lines.push(call);
  lines.push('print(response.status_code)');
  lines.push('print(response.text)');

  return lines.join('\n');
}

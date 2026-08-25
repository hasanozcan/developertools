import { parseCurl } from './curlToPython';

export function curlToJavascript(curl: string, style: 'fetch' | 'axios' = 'fetch'): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Could not parse URL from cURL command';

  if (style === 'axios') {
    const lines = ["import axios from 'axios';", '', 'async function makeRequest() {', '  try {'];
    const config: string[] = ["    url: '" + parsed.url + "'", "    method: '" + parsed.method.toLowerCase() + "'"];
    if (Object.keys(parsed.headers).length > 0) {
      config.push('    headers: ' + JSON.stringify(parsed.headers, null, 6).trim());
    }
    if (parsed.data) {
      try {
        config.push('    data: ' + JSON.stringify(JSON.parse(parsed.data), null, 6).trim());
      } catch {
        config.push('    data: ' + JSON.stringify(parsed.data));
      }
    }
    lines.push('    const response = await axios({');
    lines.push(config.join(',\n'));
    lines.push('    });');
    lines.push('    console.log(response.data);');
    lines.push('  } catch (error) {');
    lines.push('    console.error(error);');
    lines.push('  }');
    lines.push('}');
    return lines.join('\n');
  }

  const options: string[] = ["    method: '" + parsed.method + "'"];
  if (Object.keys(parsed.headers).length > 0) {
    options.push('    headers: ' + JSON.stringify(parsed.headers, null, 6).trim());
  }
  if (parsed.data) {
    options.push('    body: ' + JSON.stringify(parsed.data));
  }

  return 'async function makeRequest() {\n  const response = await fetch(\'' + parsed.url + '\', {\n' + options.join(',\n') + '\n  });\n  const data = await response.json();\n  console.log(data);\n}';
}

import { parseCurl } from './curlToPython';

export function curlToPhp(curl: string, style: 'guzzle' | 'native' = 'guzzle'): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '<?php // Error: Invalid cURL command';

  if (style === 'native') {
    const lines = ['<?php', '$ch = curl_init();', 'curl_setopt($ch, CURLOPT_URL, "' + parsed.url + '");', 'curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);'];
    if (parsed.method !== 'GET') {
      lines.push('curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "' + parsed.method + '");');
    }
    if (Object.keys(parsed.headers).length > 0) {
      const headersArr = Object.entries(parsed.headers).map(([k, v]) => '"' + k + ': ' + v + '"');
      lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [' + headersArr.join(', ') + ']);');
    }
    if (parsed.data) {
      lines.push('curl_setopt($ch, CURLOPT_POSTFIELDS, \'' + parsed.data.replace(/'/g, "\\'") + '\');');
    }
    lines.push('$response = curl_exec($ch);', 'curl_close($ch);', 'echo $response;');
    return lines.join('\n');
  }

  const lines = ['<?php', 'require "vendor/autoload.php";', 'use GuzzleHttp\\Client;', '', '$client = new Client();'];
  const options: string[] = [];
  if (Object.keys(parsed.headers).length > 0) {
    options.push('    \'headers\' => ' + JSON.stringify(parsed.headers, null, 8).replace(/"/g, "'").trim());
  }
  if (parsed.data) {
    options.push('    \'body\' => \'' + parsed.data.replace(/'/g, "\\'") + '\'');
  }

  lines.push('$response = $client->request(\'' + parsed.method + '\', \'' + parsed.url + '\'' + (options.length ? ', [\n' + options.join(',\n') + '\n]' : '') + ');');
  lines.push('echo $response->getBody();');
  return lines.join('\n');
}

import { parseCurl } from './curlToPython';

export function curlToCsharp(curl: string): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Invalid cURL input';

  const lines = [
    'using System;',
    'using System.Net.Http;',
    'using System.Threading.Tasks;',
    '',
    'class Program',
    '{',
    '    static async Task Main()',
    '    {',
    '        using var client = new HttpClient();',
    '        using var request = new HttpRequestMessage(HttpMethod.' + (parsed.method.charAt(0) + parsed.method.slice(1).toLowerCase()) + ', "' + parsed.url + '");',
  ];

  for (const [k, v] of Object.entries(parsed.headers)) {
    if (k.toLowerCase() === 'content-type') continue;
    lines.push('        request.Headers.TryAddWithoutValidation("' + k + '", "' + v + '");');
  }

  if (parsed.data) {
    const contentType = parsed.headers['Content-Type'] || parsed.headers['content-type'] || 'application/json';
    lines.push('        request.Content = new StringContent(@"' + parsed.data.replace(/"/g, '""') + '", System.Text.Encoding.UTF8, "' + contentType + '");');
  }

  lines.push('        using var response = await client.SendAsync(request);');
  lines.push('        var responseBody = await response.Content.ReadAsStringAsync();');
  lines.push('        Console.WriteLine(responseBody);');
  lines.push('    }');
  lines.push('}');

  return lines.join('\n');
}

import { parseCurl } from './curlToPython';

export function curlToJava(curl: string): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Invalid cURL input';

  const lines = [
    'import java.net.URI;',
    'import java.net.http.HttpClient;',
    'import java.net.http.HttpRequest;',
    'import java.net.http.HttpResponse;',
    '',
    'public class Main {',
    '    public static void main(String[] args) throws Exception {',
    '        HttpClient client = HttpClient.newHttpClient();',
    '        HttpRequest.Builder builder = HttpRequest.newBuilder()',
    '            .uri(URI.create("' + parsed.url + '"));',
  ];

  for (const [k, v] of Object.entries(parsed.headers)) {
    lines.push('        builder.header("' + k + '", "' + v + '");');
  }

  if (parsed.data) {
    lines.push('        builder.method("' + parsed.method + '", HttpRequest.BodyPublishers.ofString("' + parsed.data.replace(/"/g, '\\"') + '"));');
  } else if (parsed.method !== 'GET') {
    lines.push('        builder.method("' + parsed.method + '", HttpRequest.BodyPublishers.noBody());');
  }

  lines.push('        HttpRequest request = builder.build();');
  lines.push('        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());');
  lines.push('        System.out.println(response.body());');
  lines.push('    }');
  lines.push('}');

  return lines.join('\n');
}

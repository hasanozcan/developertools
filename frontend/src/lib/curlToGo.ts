import { parseCurl } from './curlToPython';

export function curlToGo(curl: string): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Invalid cURL input';

  const lines = [
    'package main',
    '',
    'import (',
    '\t"fmt"',
    '\t"io"',
    '\t"net/http"',
    parsed.data ? '\t"strings"' : '',
    ')',
    '',
    'func main() {',
    '\tclient := &http.Client{}',
  ];

  if (parsed.data) {
    lines.push('\tbody := strings.NewReader(`' + parsed.data + '`)');
    lines.push('\treq, err := http.NewRequest("' + parsed.method + '", "' + parsed.url + '", body)');
  } else {
    lines.push('\treq, err := http.NewRequest("' + parsed.method + '", "' + parsed.url + '", nil)');
  }

  lines.push('\tif err != nil {\n\t\tpanic(err)\n\t}');

  for (const [k, v] of Object.entries(parsed.headers)) {
    lines.push('\treq.Header.Set("' + k + '", "' + v + '")');
  }

  lines.push('\tresp, err := client.Do(req)');
  lines.push('\tif err != nil {\n\t\tpanic(err)\n\t}');
  lines.push('\tdefer resp.Body.Close()');
  lines.push('\trespBody, _ := io.ReadAll(resp.Body)');
  lines.push('\tfmt.Println(string(respBody))');
  lines.push('}');

  return lines.filter(Boolean).join('\n');
}

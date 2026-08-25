import { parseCurl } from './curlToPython';

export function curlToRust(curl: string): string {
  const parsed = parseCurl(curl);
  if (!parsed.url) return '// Error: Invalid cURL input';

  const lines = [
    'use reqwest::header;',
    '',
    '#[tokio::main]',
    'async fn main() -> Result<(), Box<dyn std::error::Error>> {',
    '    let client = reqwest::Client::new();',
    '    let response = client.' + parsed.method.toLowerCase() + '("' + parsed.url + '")',
  ];

  for (const [k, v] of Object.entries(parsed.headers)) {
    lines.push('        .header("' + k + '", "' + v + '")');
  }

  if (parsed.data) {
    lines.push('        .body(r#"' + parsed.data + '"#)');
  }

  lines.push('        .send()');
  lines.push('        .await?;');
  lines.push('    let body = response.text().await?;');
  lines.push('    println!("{}", body);');
  lines.push('    Ok(())');
  lines.push('}');

  return lines.join('\n');
}

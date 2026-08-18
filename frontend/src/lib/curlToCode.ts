export type TargetLanguage = 'javascript_fetch' | 'javascript_axios' | 'python_requests' | 'go' | 'php' | 'rust';

export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  data?: string;
}

export function parseCurlCommand(raw: string): ParsedCurl {
  let cleaned = raw.replace(/\\\r?\n/g, ' ').trim();
  if (!cleaned.startsWith('curl')) {
    throw new Error('Command must start with "curl"');
  }

  // Tokenize preserving quoted strings
  const tokens: string[] = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = regex.exec(cleaned)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  let method = 'GET';
  let url = '';
  const headers: Record<string, string> = {};
  let data: string | undefined;

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === '-X' || token === '--request') {
      method = (tokens[++i] || 'GET').toUpperCase();
    } else if (token === '-H' || token === '--header') {
      const headerLine = tokens[++i] || '';
      const colonIdx = headerLine.indexOf(':');
      if (colonIdx > -1) {
        const key = headerLine.substring(0, colonIdx).trim();
        const value = headerLine.substring(colonIdx + 1).trim();
        headers[key] = value;
      }
    } else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
      data = tokens[++i];
      if (method === 'GET') method = 'POST';
    } else if (!token.startsWith('-') && !url) {
      url = token;
    }
  }

  if (!url) {
    throw new Error('No target URL found in curl command');
  }

  return { url, method, headers, data };
}

export function generateCodeFromCurl(parsed: ParsedCurl, lang: TargetLanguage): string {
  const { url, method, headers, data } = parsed;
  const headerKeys = Object.keys(headers);

  switch (lang) {
    case 'javascript_fetch': {
      let code = `fetch("${url}", {\n`;
      code += `  method: "${method}",\n`;
      if (headerKeys.length > 0) {
        code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
      }
      if (data) {
        code += `  body: ${JSON.stringify(data)},\n`;
      }
      code += `})\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));`;
      return code;
    }

    case 'javascript_axios': {
      let code = `import axios from 'axios';\n\n`;
      code += `const config = {\n`;
      code += `  method: '${method.toLowerCase()}',\n`;
      code += `  url: '${url}',\n`;
      if (headerKeys.length > 0) {
        code += `  headers: ${JSON.stringify(headers, null, 4).replace(/\n/g, '\n  ')},\n`;
      }
      if (data) {
        code += `  data: ${JSON.stringify(data)},\n`;
      }
      code += `};\n\naxios(config)\n  .then(response => console.log(response.data))\n  .catch(error => console.error(error));`;
      return code;
    }

    case 'python_requests': {
      let code = `import requests\n\nurl = "${url}"\n`;
      if (headerKeys.length > 0) {
        code += `headers = ${JSON.stringify(headers, null, 4)}\n`;
      }
      if (data) {
        code += `payload = ${JSON.stringify(data)}\n`;
      }
      code += `\nresponse = requests.${method.toLowerCase()}(\n    url,\n`;
      if (headerKeys.length > 0) code += `    headers=headers,\n`;
      if (data) code += `    data=payload,\n`;
      code += `)\n\nprint(response.status_code)\nprint(response.json())`;
      return code;
    }

    case 'go': {
      let code = `package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"net/http"\n`;
      if (data) code += `\t"strings"\n`;
      code += `)\n\nfunc main() {\n`;
      if (data) {
        code += `\tbody := strings.NewReader(${JSON.stringify(data)})\n`;
        code += `\treq, err := http.NewRequest("${method}", "${url}", body)\n`;
      } else {
        code += `\treq, err := http.NewRequest("${method}", "${url}", nil)\n`;
      }
      code += `\tif err != nil {\n\t\tpanic(err)\n\t}\n`;
      for (const [k, v] of Object.entries(headers)) {
        code += `\treq.Header.Set("${k}", "${v}")\n`;
      }
      code += `\n\tclient := &http.Client{}\n\tresp, err := client.Do(req)\n\tif err != nil {\n\t\tpanic(err)\n\t}\n\tdefer resp.Body.Close()\n\n\trespBody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(respBody))\n}`;
      return code;
    }

    case 'php': {
      let code = `<?php\n\n$curl = curl_init();\n\ncurl_setopt_array($curl, array(\n`;
      code += `  CURLOPT_URL => '${url}',\n`;
      code += `  CURLOPT_RETURNTRANSFER => true,\n`;
      code += `  CURLOPT_CUSTOMREQUEST => '${method}',\n`;
      if (data) {
        code += `  CURLOPT_POSTFIELDS => ${JSON.stringify(data)},\n`;
      }
      if (headerKeys.length > 0) {
        const headerLines = headerKeys.map((k) => `    '${k}: ${headers[k]}'`).join(',\n');
        code += `  CURLOPT_HTTPHEADER => array(\n${headerLines}\n  ),\n`;
      }
      code += `));\n\n$response = curl_exec($curl);\ncurl_close($curl);\necho $response;`;
      return code;
    }

    case 'rust': {
      let code = `use reqwest::header::HeaderMap;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n`;
      code += `    let client = reqwest::Client::new();\n`;
      if (headerKeys.length > 0) {
        code += `    let mut headers = HeaderMap::new();\n`;
        for (const [k, v] of Object.entries(headers)) {
          code += `    headers.insert("${k}", "${v}".parse()?);\n`;
        }
      }
      code += `\n    let response = client.${method.toLowerCase()}("${url}")\n`;
      if (headerKeys.length > 0) code += `        .headers(headers)\n`;
      if (data) code += `        .body(${JSON.stringify(data)})\n`;
      code += `        .send()\n        .await?;\n\n    println!("Status: {}", response.status());\n    println!("Body: {}", response.text().await?);\n    Ok(())\n}`;
      return code;
    }
  }
}

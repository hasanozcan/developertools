export interface CurlToAxiosOptions {
  language?: 'javascript' | 'typescript';
  asyncAwait?: boolean;
  indent?: number;
}

export interface ParsedCurl {
  url: string;
  method: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  data?: any;
  auth?: { username: string; password?: string };
  rawBody?: string;
}

export function parseCurlCommand(rawCommand: string): ParsedCurl {
  const normalized = rawCommand
    .replace(/\\\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens: string[] = [];
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  let match;
  while ((match = regex.exec(normalized)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[0]);
  }

  let url = '';
  let method = 'GET';
  const headers: Record<string, string> = {};
  const params: Record<string, string> = {};
  let rawBody: string | undefined;
  let auth: { username: string; password?: string } | undefined;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token === 'curl') continue;

    if (token === '-X' || token === '--request') {
      if (tokens[i + 1]) {
        method = tokens[++i].toUpperCase();
      }
    } else if (token === '-H' || token === '--header') {
      if (tokens[i + 1]) {
        const headerStr = tokens[++i];
        const separatorIdx = headerStr.indexOf(':');
        if (separatorIdx > 0) {
          const key = headerStr.slice(0, separatorIdx).trim();
          const val = headerStr.slice(separatorIdx + 1).trim();
          headers[key] = val;
        }
      }
    } else if (
      token === '-d' ||
      token === '--data' ||
      token === '--data-raw' ||
      token === '--data-binary'
    ) {
      if (tokens[i + 1]) {
        rawBody = tokens[++i];
        if (method === 'GET') method = 'POST';
      }
    } else if (token === '-u' || token === '--user') {
      if (tokens[i + 1]) {
        const userPass = tokens[++i];
        const [username, password] = userPass.split(':');
        auth = { username, password: password || '' };
      }
    } else if (
      !token.startsWith('-') &&
      (token.startsWith('http://') || token.startsWith('https://') || token.startsWith('localhost'))
    ) {
      url = token;
    } else if (!token.startsWith('-') && !url && tokens[i - 1] === 'curl') {
      url = token;
    }
  }

  if (url) {
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `http://${url}`);
      parsedUrl.searchParams.forEach((val, key) => {
        params[key] = val;
      });
      url = `${parsedUrl.origin}${parsedUrl.pathname}`;
    } catch {
      // keep url as is
    }
  }

  let data = rawBody;
  if (rawBody) {
    try {
      data = JSON.parse(rawBody);
    } catch {
      // Keep as string
    }
  }

  return { url, method, headers, params, data, auth, rawBody };
}

export function curlToAxios(
  curlCommand: string,
  options: CurlToAxiosOptions = {}
): string {
  const { language = 'typescript', asyncAwait = true, indent = 2 } = options;
  const parsed = parseCurlCommand(curlCommand);

  const spaces = ' '.repeat(indent);
  const isTs = language === 'typescript';

  const configObj: Record<string, any> = {
    method: parsed.method.toLowerCase(),
    url: parsed.url || 'https://api.example.com/data',
  };

  if (Object.keys(parsed.params).length > 0) {
    configObj.params = parsed.params;
  }

  if (Object.keys(parsed.headers).length > 0) {
    configObj.headers = parsed.headers;
  }

  if (parsed.data !== undefined) {
    configObj.data = parsed.data;
  }

  if (parsed.auth) {
    configObj.auth = parsed.auth;
  }

  const formattedConfig = JSON.stringify(configObj, null, indent)
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `${spaces}${line}`))
    .join('\n');

  if (asyncAwait) {
    return `${isTs ? "import axios, { AxiosResponse } from 'axios';\n\n" : "const axios = require('axios');\n\n"}async function makeRequest()${isTs ? ': Promise<void>' : ''} {
${spaces}try {
${spaces}${spaces}const response${isTs ? ': AxiosResponse' : ''} = await axios(${formattedConfig.trim()});
${spaces}${spaces}console.log(response.data);
${spaces}} catch (error) {
${spaces}${spaces}console.error('Request failed:', error);
${spaces}}
}

makeRequest();`;
  }

  return `${isTs ? "import axios from 'axios';\n\n" : "const axios = require('axios');\n\n"}axios(${formattedConfig.trim()})
${spaces}.then(response => {
${spaces}${spaces}console.log(response.data);
${spaces}})
${spaces}.catch(error => {
${spaces}${spaces}console.error('Request failed:', error);
${spaces}});`;
}

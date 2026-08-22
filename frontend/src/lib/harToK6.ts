export function convertHarToK6Script(harJson: string): string {
  try {
    const data = JSON.parse(harJson);
    const entries = data.log?.entries || [];
    let script = `import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
`;

    for (const entry of entries.slice(0, 10)) {
      const req = entry.request;
      if (req) {
        script += `  http.get('${req.url}');\n  sleep(1);\n`;
      }
    }

    script += `}
`;
    return script;
  } catch (e: any) {
    return '// Error: ' + e.message;
  }
}
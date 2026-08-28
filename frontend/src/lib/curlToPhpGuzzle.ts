export function convertCurlToPhpGuzzle(curlCmd: string): string {
  const urlMatch = curlCmd.match(/https?:\/\/[^\s'"]+/i);
  const url = urlMatch ? urlMatch[0] : 'https://api.example.com';
  let method = 'GET';
  if (/-X\s+POST/i.test(curlCmd) || /-d\s+/i.test(curlCmd)) method = 'POST';

  return '<?php\nrequire "vendor/autoload.php";\n\n$client = new \\GuzzleHttp\\Client();\n$response = $client->request("' + method + '", "' + url + '");\n\necho $response->getBody();\n';
}

export function convertCurlToRubyFaraday(curlCmd: string): string {
  const urlMatch = curlCmd.match(/https?:\/\/[^\s'"]+/i);
  const url = urlMatch ? urlMatch[0] : 'https://api.example.com';
  return 'require "faraday"\n\nconn = Faraday.new(url: "' + url + '")\nresponse = conn.get\nputs response.body\n';
}

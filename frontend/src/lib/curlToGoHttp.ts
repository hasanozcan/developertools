export function convertCurlToGoHttp(curlCmd: string): string {
  const urlMatch = curlCmd.match(/https?:\/\/[^\s'"]+/i);
  const url = urlMatch ? urlMatch[0] : 'https://api.example.com';
  return 'package main\n\nimport (\n\t"fmt"\n\t"io"\n\t"net/http"\n)\n\nfunc main() {\n\tresp, err := http.Get("' + url + '")\n\tif err != nil { panic(err) }\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(body))\n}\n';
}

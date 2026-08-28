export function convertCurlToRustReqwest(curlCmd: string): string {
  const urlMatch = curlCmd.match(/https?:\/\/[^\s'"]+/i);
  const url = urlMatch ? urlMatch[0] : 'https://api.example.com';
  return '#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std::error::Error>> {\n    let resp = reqwest::get("' + url + '").await?.text().await?;\n    println!("{}", resp);\n    Ok(())\n}\n';
}

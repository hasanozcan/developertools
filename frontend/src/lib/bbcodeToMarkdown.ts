export function convertBbcodeToMarkdown(bbcode: string): string {
  return bbcode
    .replace(/\[b\](.*?)\[\/b\]/gi, '**$1**')
    .replace(/\[i\](.*?)\[\/i\]/gi, '*$1*')
    .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '[$2]($1)');
}

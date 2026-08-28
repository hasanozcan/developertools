export function convertMarkdownToBbcode(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, '[b]$1[/b]')
    .replace(/\*(.*?)\*/g, '[i]$1[/i]')
    .replace(/\[(.*?)\]\((.*?)\)/g, '[url=$2]$1[/url]')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '[img]$2[/img]');
}

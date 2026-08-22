export function convertSrtToWebVtt(srtContent: string): string {
  const vtt = srtContent
    .trim()
    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
  return 'WEBVTT\n\n' + vtt;
}
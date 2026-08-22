export function convertMarkdownToSlidesHtml(markdown: string, theme = 'dark'): string {
  const slides = markdown.split(/\n---\n/).map((s) => s.trim()).filter(Boolean);

  const slideHtmls = slides.map((s, idx) => {
    return `  <section class="slide" id="slide-${idx + 1}">\n    ${s.replace(/\n/g, '<br/>')}\n  </section>`;
  });

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Presentation</title>
  <style>
    body { font-family: sans-serif; background: ${theme === 'dark' ? '#0f172a' : '#ffffff'}; color: ${theme === 'dark' ? '#f8fafc' : '#0f172a'}; margin: 0; }
    .slide { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; border-bottom: 2px solid #334155; padding: 2rem; font-size: 2rem; }
  </style>
</head>
<body>
${slideHtmls.join('\n')}
</body>
</html>`;
}

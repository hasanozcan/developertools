export interface CodePlaygroundTemplate {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
}

export const PLAYGROUND_TEMPLATES: CodePlaygroundTemplate[] = [
  {
    id: 'vanilla',
    name: 'Vanilla HTML/CSS/JS',
    html: `<div class="container">
  <h1>Hello, DevsTools Sandbox!</h1>
  <p>Edit HTML, CSS, and JS to see instant live preview.</p>
  <button id="counter-btn">Clicks: 0</button>
</div>`,
    css: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f8fafc;
  color: #1e293b;
}

.container {
  text-align: center;
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
}

h1 {
  color: #0284c7;
  margin-top: 0;
}

button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #0369a1;
}`,
    js: `let count = 0;
const btn = document.getElementById('counter-btn');

btn.addEventListener('click', () => {
  count++;
  btn.textContent = \`Clicks: \${count}\`;
  console.log('Button clicked! Current count:', count);
});`,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS (CDN)',
    html: `<div class="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
  <div class="max-w-md w-full bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl text-center space-y-6">
    <div class="inline-flex p-3 bg-sky-500/10 text-sky-400 rounded-xl">
      ⚡ Modern Playground
    </div>
    <h1 class="text-2xl font-bold tracking-tight">Tailwind CSS Sandbox</h1>
    <p class="text-slate-400 text-sm">
      Build modern responsive user interfaces with utility classes.
    </p>
    <button id="toggle-btn" class="w-full py-3 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-xl transition">
      Trigger Action
    </button>
  </div>
</div>`,
    css: `/* Tailwind CDN is automatically included */`,
    js: `document.getElementById('toggle-btn').addEventListener('click', () => {
  console.log('Tailwind action triggered at', new Date().toLocaleTimeString());
});`,
  },
];

export interface SandboxBuildOptions {
  includeTailwind?: boolean;
  interceptConsole?: boolean;
}

export function buildSandboxDocument(
  html: string,
  css: string,
  js: string,
  options: SandboxBuildOptions = {}
): string {
  const { includeTailwind = false, interceptConsole = true } = options;

  const tailwindScript = includeTailwind
    ? `<script src="https://cdn.tailwindcss.com"></script>`
    : '';

  const consoleInterceptor = interceptConsole
    ? `<script>
(function() {
  var originalLog = console.log;
  var originalError = console.error;
  var originalWarn = console.warn;

  function sendToParent(type, args) {
    try {
      var formatted = Array.from(args).map(function(item) {
        if (typeof item === 'object') {
          try { return JSON.stringify(item); } catch (e) { return String(item); }
        }
        return String(item);
      }).join(' ');
      window.parent.postMessage({ source: 'devstools-sandbox', type: type, message: formatted }, '*');
    } catch(e) {}
  }

  console.log = function() { sendToParent('log', arguments); originalLog.apply(console, arguments); };
  console.error = function() { sendToParent('error', arguments); originalError.apply(console, arguments); };
  console.warn = function() { sendToParent('warn', arguments); originalWarn.apply(console, arguments); };
})();
</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sandbox Preview</title>
  ${tailwindScript}
  <style>
    ${css}
  </style>
  ${consoleInterceptor}
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (err) {
      console.error(err.message || String(err));
    }
  </script>
</body>
</html>`;
}

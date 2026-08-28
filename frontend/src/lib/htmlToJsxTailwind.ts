export function convertHtmlToJsxTailwind(html: string): string {
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
    .replace(/<input([^>]*)(?<!\/)>/g, '<input$1 />')
    .replace(/<img([^>]*)(?<!\/)>/g, '<img$1 />');
}

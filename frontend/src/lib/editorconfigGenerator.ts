export function generateEditorConfig(indentSize = 2, indentStyle: 'space' | 'tab' = 'space'): string {
  return `# http://editorconfig.org
root = true

[*]
indent_style = ${indentStyle}
indent_size = ${indentSize}
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false`;
}

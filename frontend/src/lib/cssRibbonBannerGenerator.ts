export function generateRibbonCss(text = 'POPULAR', bg = '#ef4444', color = '#ffffff'): string {
  return '.ribbon {\n  position: absolute;\n  top: 15px;\n  right: -25px;\n  transform: rotate(45deg);\n  background: ' + bg + ';\n  color: ' + color + ';\n  padding: 4px 30px;\n  font-size: 11px;\n  font-weight: bold;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}';
}

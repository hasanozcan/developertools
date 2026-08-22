export interface ShadcnColorPalette {
  primary: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  radius: string;
}

export function generateShadcnCssVariables(palette: ShadcnColorPalette): string {
  return `@layer base {
  :root {
    --background: ${palette.background};
    --foreground: ${palette.foreground};
    --primary: ${palette.primary};
    --primary-foreground: 0 0% 100%;
    --muted: ${palette.muted};
    --border: ${palette.border};
    --radius: ${palette.radius};
  }
}`;
}
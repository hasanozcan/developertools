export function convertSvgToReactNative(svgXml: string, componentName: string = 'AppIcon'): string {
  let transformed = svgXml
    .replace(/<svg/gi, '<Svg')
    .replace(/<\/svg>/gi, '</Svg>')
    .replace(/<path/gi, '<Path')
    .replace(/<circle/gi, '<Circle')
    .replace(/<rect/gi, '<Rect')
    .replace(/<g/gi, '<G')
    .replace(/<\/g>/gi, '</G>')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=');

  return `import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const ${componentName} = ({ size = 24, color = 'currentColor', ...props }: { size?: number; color?: string }) => (
  ${transformed}
);
`;
}
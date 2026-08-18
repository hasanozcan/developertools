// SVG to JSX and SVG Minifier utilities

export interface SvgToJsxOptions {
  componentName: string;
  typescript: boolean;
  namedExport: boolean;
  forwardRef: boolean;
  spreadProps: boolean;
  iconMode: boolean; // 1em x 1em
}

const SVG_ATTR_MAP: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  'accent-height': 'accentHeight',
  'accept-charset': 'acceptCharset',
  'alignment-baseline': 'alignmentBaseline',
  'allow-reorder': 'allowReorder',
  'arabic-form': 'arabicForm',
  'baseline-shift': 'baselineShift',
  'cap-height': 'capHeight',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'color-profile': 'colorProfile',
  'color-rendering': 'colorRendering',
  'dominant-baseline': 'dominantBaseline',
  'enable-background': 'enableBackground',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-size-adjust': 'fontSizeAdjust',
  'font-stretch': 'fontStretch',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'font-weight': 'fontWeight',
  'glyph-name': 'glyphName',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  'horiz-adv-x': 'horizAdvX',
  'horiz-origin-x': 'horizOriginX',
  'image-rendering': 'imageRendering',
  'letter-spacing': 'letterSpacing',
  'lighting-color': 'lightingColor',
  'marker-end': 'markerEnd',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  'overline-position': 'overlinePosition',
  'overline-thickness': 'overlineThickness',
  'paint-order': 'paintOrder',
  'panose-1': 'panose1',
  'pointer-events': 'pointerEvents',
  'rendering-intent': 'renderingIntent',
  'shape-rendering': 'shapeRendering',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'strikethrough-position': 'strikethroughPosition',
  'strikethrough-thickness': 'strikethroughThickness',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'stroke-width': 'strokeWidth',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'text-rendering': 'textRendering',
  'underline-position': 'underlinePosition',
  'underline-thickness': 'underlineThickness',
  'unicode-bidi': 'unicodeBidi',
  'unicode-range': 'unicodeRange',
  'units-per-em': 'unitsPerEm',
  'v-alphabetic': 'vAlphabetic',
  'v-hanging': 'vHanging',
  'v-ideographic': 'vIdeographic',
  'v-mathematical': 'vMathematical',
  'vector-effect': 'vectorEffect',
  'vert-adv-y': 'vertAdvY',
  'vert-origin-x': 'vertOriginX',
  'vert-origin-y': 'vertOriginY',
  'word-spacing': 'wordSpacing',
  'writing-mode': 'writingMode',
  'x-height': 'xHeight',
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
};

// Convert inline CSS style string to React style object literal
function styleStringToJsx(styleStr: string): string {
  const rules = styleStr.split(';').filter((r) => r.trim());
  const entries: string[] = [];

  for (const rule of rules) {
    const colonIdx = rule.indexOf(':');
    if (colonIdx === -1) continue;
    const key = rule.slice(0, colonIdx).trim();
    const value = rule.slice(colonIdx + 1).trim();

    // camelCase the CSS property
    const camelKey = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    entries.push(`${camelKey}: '${value.replace(/'/g, "\\'")}'`);
  }

  return `{{ ${entries.join(', ')} }}`;
}

export function convertSvgToJsx(svgString: string, options: SvgToJsxOptions): string {
  let cleaned = svgString.trim();

  // Remove XML doctype and comments
  cleaned = cleaned.replace(/<\?xml.*?\?>/gi, '');
  cleaned = cleaned.replace(/<!DOCTYPE.*?>/gi, '');
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Extract <svg ...> tag
  const svgMatch = cleaned.match(/<svg([\s\S]*?)>([\s\S]*)<\/svg>/i);
  if (!svgMatch) {
    throw new Error('Invalid SVG: No <svg> root element found.');
  }

  let rootAttrs = svgMatch[1];
  let innerContent = svgMatch[2].trim();

  // Replace hyphenated and special HTML/SVG attributes in full string
  const replaceAttributes = (html: string) => {
    let result = html;

    // Convert style="..."
    result = result.replace(/style="([^"]*)"/gi, (_, styleVal) => {
      return `style=${styleStringToJsx(styleVal)}`;
    });

    // Convert all known hyphenated attributes
    for (const [kebab, camel] of Object.entries(SVG_ATTR_MAP)) {
      const regex = new RegExp(`\\b${kebab}=`, 'gi');
      result = result.replace(regex, `${camel}=`);
    }

    return result;
  };

  rootAttrs = replaceAttributes(rootAttrs);
  innerContent = replaceAttributes(innerContent);

  // If icon mode enabled, replace width/height with 1em or current
  if (options.iconMode) {
    rootAttrs = rootAttrs.replace(/\bwidth="[^"]*"/gi, 'width="1em"');
    rootAttrs = rootAttrs.replace(/\bheight="[^"]*"/gi, 'height="1em"');
  }

  // Build JSX tag
  const spread = options.spreadProps ? ' {...props}' : '';
  const refProp = options.forwardRef ? ' ref={ref}' : '';

  const jsxSvg = `<svg${rootAttrs}${refProp}${spread}>
    ${innerContent}
  </svg>`;

  const name = options.componentName.replace(/[^a-zA-Z0-9_$]/g, '') || 'SvgIcon';

  if (options.typescript) {
    if (options.forwardRef) {
      return `import React, { forwardRef, SVGProps } from 'react';

export interface ${name}Props extends SVGProps<SVGSVGElement> {}

export const ${name} = forwardRef<SVGSVGElement, ${name}Props>((props, ref) => {
  return (
    ${jsxSvg}
  );
});

${name}.displayName = '${name}';

${options.namedExport ? '' : `export default ${name};\n`}`.trim();
    } else {
      return `import React, { SVGProps } from 'react';

export interface ${name}Props extends SVGProps<SVGSVGElement> {}

export ${options.namedExport ? 'function' : 'default function'} ${name}(${options.spreadProps ? 'props: ' + name + 'Props' : ''}) {
  return (
    ${jsxSvg}
  );
}`.trim();
    }
  } else {
    if (options.forwardRef) {
      return `import React, { forwardRef } from 'react';

export const ${name} = forwardRef((props, ref) => {
  return (
    ${jsxSvg}
  );
});

${name}.displayName = '${name}';

${options.namedExport ? '' : `export default ${name};\n`}`.trim();
    } else {
      return `import React from 'react';

export ${options.namedExport ? 'function' : 'default function'} ${name}(${options.spreadProps ? 'props' : ''}) {
  return (
    ${jsxSvg}
  );
}`.trim();
    }
  }
}

export function minifySvg(svgString: string): { minified: string; originalSize: number; minifiedSize: number; savingsPercent: number } {
  const originalSize = new TextEncoder().encode(svgString).length;

  let minified = svgString;

  // 1. Remove XML declaration and DOCTYPE
  minified = minified.replace(/<\?xml[\s\S]*?\?>/gi, '');
  minified = minified.replace(/<!DOCTYPE[\s\S]*?>/gi, '');

  // 2. Remove comments
  minified = minified.replace(/<!--[\s\S]*?-->/g, '');

  // 3. Remove metadata, desc, title tags
  minified = minified.replace(/<(metadata|desc|title)[\s\S]*?<\/\1>/gi, '');

  // 4. Remove editor namespaces (inkscape, sodipodi, sketch, adobe)
  minified = minified.replace(/\s(xmlns:inkscape|xmlns:sodipodi|xmlns:sketch|xmlns:adobe|xmlns:illustrator)="[^"]*"/gi, '');
  minified = minified.replace(/\s(inkscape|sodipodi|sketch|adobe):[a-z0-9_-]+="[^"]*"/gi, '');

  // 5. Remove empty attributes and unnecessary ids/data attrs
  minified = minified.replace(/\s(id|class)=""/gi, '');

  // 6. Round path numbers with > 2 decimal places to 2 decimal places
  minified = minified.replace(/(\d+\.\d{3,})/g, (match) => {
    const num = parseFloat(match);
    return isNaN(num) ? match : String(Number(num.toFixed(2)));
  });

  // 7. Collapse multi-spaces & newline inside tags
  minified = minified.replace(/>\s+</g, '><');
  minified = minified.replace(/\s{2,}/g, ' ');
  minified = minified.trim();

  const minifiedSize = new TextEncoder().encode(minified).length;
  const savingsPercent = originalSize > 0 ? Number((((originalSize - minifiedSize) / originalSize) * 100).toFixed(1)) : 0;

  return {
    minified,
    originalSize,
    minifiedSize,
    savingsPercent: Math.max(0, savingsPercent),
  };
}
